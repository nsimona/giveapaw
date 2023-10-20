import { Container, Typography } from "@mui/material";
import SearchFilters from "../../components/search/search-filters";
import PetsWrapper from "../../components/pets-wrapper";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetQuery } from "../../services/api";

const Search = () => {
  const [pets, setPets] = useState([]);
  const [searchParams] = useSearchParams();

  // TODO fix loading
  useEffect(() => {
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    getPetQuery(params)
      .then((response) => {
        setPets(response);
      })
      .catch(() => {});
  }, [searchParams]);

  return (
    <>
      <SearchFilters />
      <Container maxWidth="lg">
        <Typography variant="h4" color="secondary" sx={{ mb: 4 }}>
          {pets.length} {pets.length === 1 ? "резултат" : "резултата"} от
          търсенето
        </Typography>
        <PetsWrapper
          pets={pets}
          noResultsMessage="Няма намерени животни по зададените критерии"
        />
      </Container>
    </>
  );
};

export default Search;
