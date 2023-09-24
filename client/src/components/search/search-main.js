import { Box, Button, Container, Grid } from "@mui/material";
import CustomSelect from "../pet-form-inputs/custom-select";
import { basicBreedsOptions, petTypeOptions } from "../../assets/pet-options";

const SearchMain = () => {
  return (
    <Box
      sx={{
        // height: "500px",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2587&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex",
        alignItems: "end",
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            background: " rgba( 255, 255, 255, 0.8 )",
            backdropFilter: " blur( 5px )",
            borderRadius: " 16px",
            border: " 1px solid rgba( 255, 255, 255, 0.18 )",
            width: "100%",
            p: 5,
          }}
        >
          <Grid container gap={2}>
            <Grid item md={3}>
              <CustomSelect
                id="search-type"
                options={petTypeOptions}
                label="Вид"
                value=""
                selectProps={{ size: "small" }}
                onChange={(e) => {}}
              />
            </Grid>

            <Grid item md={3}>
              <CustomSelect
                id="search-breed"
                options={basicBreedsOptions}
                label="Порода"
                value=""
                selectProps={{ size: "small" }}
                onChange={(e) => {}}
              />
            </Grid>

            <Grid item md={3}>
              <CustomSelect
                id="search-age"
                options={basicBreedsOptions}
                label="Възраст"
                value=""
                selectProps={{ size: "small" }}
                onChange={(e) => {}}
              />
            </Grid>

            <Grid item md={2}>
              <Button
                variant="contained"
                color="secondary"
                size="big"
                sx={{ px: 2 }}
              >
                Търсене
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default SearchMain;
