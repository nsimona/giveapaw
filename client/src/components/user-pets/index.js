import * as React from "react";
import Grid from "@mui/material/Grid";
import PetCard from "../pet-card";
import StickyHeadTable from "../sticky-head-table";
import { getPetQuery } from "../../services/api";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Loading from "../loading";

const UserPets = () => {
  const [pets, setPets] = React.useState([]);
  const [applicationsTableOpen, setApplicationsTableOpen] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const userId = useSelector((state) => state.user.id);

  const toggleApplicationsTable = (e, petIndex) => {
    e.preventDefault();
    const isOpen = applicationsTableOpen[petIndex];
    if (isOpen) {
      setApplicationsTableOpen({
        ...applicationsTableOpen,
        [petIndex]: false,
      });
      return;
    }

    setApplicationsTableOpen({
      ...applicationsTableOpen,
      [petIndex]: true,
    });
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Grid container spacing={3}>
      {pets.map((pet, index) => (
        <>
          <Grid item sx={{ display: "flex", gap: 3 }}>
            <PetCard
              isEditable
              pet={pet}
              onApplicationsButtonClick={(e) =>
                toggleApplicationsTable(e, index)
              }
            />
            {applicationsTableOpen[index] && (
              <Grid item>
                {/* <Grid container item xs={12} spacing={2}> */}
                {/* <Grid item md={4} sm={12}></Grid> */}
                <Grid item sx={{ maxWidth: "100%" }}>
                  <StickyHeadTable />
                </Grid>
                {/* </Grid> */}
              </Grid>
            )}
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
