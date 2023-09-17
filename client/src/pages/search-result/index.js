import { Container, Typography } from "@mui/material";
import SearchFilters from "../../components/search/search-filters";
import PetsWrapper from "../../components/pets-wrapper";
// import { useSelector } from "react-redux";

const Search = () => {
  // type, breed, age, color, size, gender
  // const query = useSelector(
  //   (state) => state.app.searchQuery
  // );

  // const

  return (
    <>
      <SearchFilters />
      <Container maxWidth="lg">
        <Typography variant="h4" color="secondary" sx={{ mb: 4 }}>
          136 резултата от търсенето
        </Typography>
        <PetsWrapper
          pets={[]}
          noResultsMessage="Няма намерени животни по зададените критерии"
        />
      </Container>
    </>
  );
};

export default Search;
