import * as React from "react";
import Grid from "@mui/material/Grid";
import PetCard from "../pet-card";
import StickyHeadTable from "../sticky-head-table";
import { getPetQuery } from "../../services/api";
import { useSelector } from "react-redux";

const UserPets = () => {
  const [pets, setPets] = React.useState([]);
  const [applicationsTableOpen, setApplicationsTableOpen] = React.useState({});
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

  const fetchUserPets = async () => {
    try {
      const pets = await getPetQuery({ userId });
      setPets(pets);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUserPets();
  }, [userId]);

  const onApplicationsButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <Grid container xs={12} spacing={3}>
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
            {applicationsTableOpen[index] ? (
              <Grid item>
                {/* <Grid container item xs={12} spacing={2}> */}
                {/* <Grid item md={4} sm={12}></Grid> */}
                <Grid item sx={{ maxWidth: "100%" }}>
                  <StickyHeadTable />
                </Grid>
                {/* </Grid> */}
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default UserPets;
