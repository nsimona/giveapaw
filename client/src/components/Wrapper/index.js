import { Container } from "@mui/material";

function Wrapper({ children }) {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {children}
    </Container>
  );
}

export default Wrapper;
