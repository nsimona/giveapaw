import * as React from "react";
import Grid from "@mui/material/Grid";
import PetCard from "../pet-card";
import StickyHeadTable from "../sticky-head-table";
import { getPetApplications, getPetQuery } from "../../services/api";
import { useSelector } from "react-redux";
import { Dialog, Divider, Typography } from "@mui/material";
import Loading from "../loading";
import ExisitingApplicationWrapper from "../../pages/application/existing-application-wrapper";
import StatusTag from "../sticky-head-table/status-tag";

const columns = [
  { id: "date", label: "Дата", minWidth: 80 },
  { id: "candidate", label: "Кандидат", minWidth: 80 },
  {
    id: "status",
    label: "Статус",
    minWidth: 80,
    align: "right",
  },
];

const UserPets = () => {
  const [pets, setPets] = React.useState([]);
  const [applications, setApplications] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentDialogApplicationId, setCurrentDialogApplicationId] =
    React.useState("");

  const userId = useSelector((state) => state.user.id);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchUserPets = async () => {
      try {
        const pets = await getPetQuery({ userId });
        setPets(pets);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchUserPets();
  }, [userId]);

  React.useEffect(() => {
    const fetchApplicationsForAllPets = async () => {
      setIsLoading(true);
      try {
        const applicationsData = await Promise.all(
          pets.map(async ({ id }) => {
            const fetchedApplications = await getPetApplications(id);
            return fetchedApplications.map((application) => ({
              date: new Date(application.createdAt).toLocaleDateString(),
              name: "test", // Replace with actual name if needed
              status: <StatusTag status={application.status} />,
              id: application.id,
            }));
          })
        );
        const applicationsMap = {};
        pets.forEach((pet, index) => {
          applicationsMap[pet.id] = applicationsData[index];
        });
        setApplications(applicationsMap);
      } catch (error) {
        console.error("Error fetching pet applications:", error);
        // TODO: Add alert or error handling as needed
      }
      setIsLoading(false);
    };
    fetchApplicationsForAllPets();
  }, [pets]);

  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onRowClick = (applicationId) => {
    setCurrentDialogApplicationId(applicationId);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Grid container spacing={3}>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isDialogOpen}
        onClose={onDialogClose}
      >
        <ExisitingApplicationWrapper
          applictionId={currentDialogApplicationId}
          ownerView
        />
      </Dialog>
      {pets.map((pet, index) => (
        <>
          <Grid container item sx={{ display: "flex", gap: 3, mb: 3 }}>
            <PetCard
              isEditable={pet.status === "active"}
              disableFavorites
              pet={pet}
              applications={
                applications[pet.id]?.filter((a) => a.status === "created")
                  .length
              }
            />
            <Grid md={8} sx={12} item>
              <Grid item>
                {applications[pet.id] ? (
                  <StickyHeadTable
                    columns={columns}
                    rows={applications[pet.id]}
                    onRowClick={onRowClick}
                  />
                ) : (
                  "Няма кандидатури :/"
                )}
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
        </>
      ))}
      {!pets.length && (
        <Typography
          variant="h4"
          color="primary"
          sx={{ display: "flex", mx: "auto", my: 8 }}
        >
          Няма добавени животни
        </Typography>
      )}
    </Grid>
  );
};

export default UserPets;
