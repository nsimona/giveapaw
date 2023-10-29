import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          paddingTop: 8,
          paddingBottom: 8,
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#8ECDDD",
      main: "#01b0bc",
      dark: "#018b95",
      contrastText: "#fff",
    },
    primaryLight: {
      light: "#8ECDDD",
      main: "#8ECDDD",
      dark: "#22668D",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fdca7e",
      main: "#ffbd59",
      dark: "#ffac2e",
      contrastText: "#fff",
    },
    neutral: {
      grey: "#ECECEC",
      light: "#FFFFFF",
      dark: "#0000001f",
      darker: "#333",
      main: "#ECECEC",
      contrastText: "#444",
    },
    neutralText: {
      main: "#666",
    },
    red: {
      main: "#ef5350",
      light: "#e57373",
      dark: "#f44336",
      contrastText: "#fff",
    },
    green: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#2e7d32",
      contrastText: "#fff",
    },
    blue: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    yellow: {
      light: "#feda5a",
      main: "#fed039",
      dark: "#ffc825",
      contrastText: "#000",
    },
  },
});

export default theme;
