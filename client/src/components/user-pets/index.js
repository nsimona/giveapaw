import * as React from "react";
import Grid from "@mui/material/Grid";
import PetCard from "../pet-card";
import StickyHeadTable from "../sticky-head-table";
import { getPetQuery } from "../../services/api";
import { useSelector } from "react-redux";
import { Dialog, Typography } from "@mui/material";
import Loading from "../loading";
import ExisitingApplicationWrapper from "../../pages/application/existing-application-wrapper";

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
  const [applicationsTableOpen, setApplicationsTableOpen] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const userId = useSelector((state) => state.user.id);

  const toggleApplicationsTable = (e, petIndex) => {
    // e.preventDefault();
    // const isOpen = applicationsTableOpen[petIndex];
    // if (isOpen) {
    //   setApplicationsTableOpen({
    //     ...applicationsTableOpen,
    //     [petIndex]: false,
    //   });
    //   return;
    // }
    // setApplicationsTableOpen({
    //   ...applicationsTableOpen,
    //   [petIndex]: true,
    // });
  };

  React.useEffect(() => {
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

  // const onApplicationsButtonClick = (e) => {
  //   e.preventDefault();
  // };

  const onDialogClose = () => {
    setIsDialogOpen(false);
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
        <ExisitingApplicationWrapper applictionId={""} ownerView />
      </Dialog>
      {pets.map((pet, index) => (
        <>
          <Grid item sx={{ display: "flex", gap: 3 }}>
            <PetCard isEditable pet={pet} />
            <Grid item>
              <Grid item sx={{ width: "100%" }}>
                <StickyHeadTable columns={columns} rows={[]} />
              </Grid>
            </Grid>
          </Grid>
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
