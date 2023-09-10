import * as React from "react";
import Grid from "@mui/material/Grid";
import PetCard from "../pet-card";
import StickyHeadTable from "../sticky-head-table";
import AllPets from "../all-pets";

const UserPets = () => {
  return (
    <Grid container xs={12}>
      <AllPets isEditable />
      <Grid container item xs={12} s spacing={2}>
        <Grid item md={4} sm={12}></Grid>
        <Grid item md={8} sm={12}>
          <StickyHeadTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPets;
