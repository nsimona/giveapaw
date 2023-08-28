import * as React from "react";
import Grid from "@mui/material/Grid";
import PetCard from "../pet-card";
import StickyHeadTable from "../sticky-head-table";

const UserPets = () => {
  return (
    <Grid container xs={12}>
      <Grid container item xs={12} s spacing={2}>
        <Grid item md={4} sm={12}>
          <PetCard
            isEditable
            name="Плутон"
            gender="мъжки"
            age="1 година"
            coverPhoto="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
            type="куче"
            breed="немска овчарка"
            size="среден размер"
          />
        </Grid>
        <Grid item md={8} sm={12}>
          <StickyHeadTable />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PetCard
          isEditable
          name="Плутон"
          gender="мъжки"
          age="1 година"
          coverPhoto="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
          type="куче"
          breed="немска овчарка"
          size="среден размер"
        />
      </Grid>
    </Grid>
  );
};

export default UserPets;
