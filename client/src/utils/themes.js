import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
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
      main: "#22668D",
      dark: "#7f34a2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FFCC70",
      main: "#FFCC70",
      dark: "#65bacf",
      contrastText: "#fff",
    },
    tertiary: {
      light: "#feda5a",
      main: "#fed039",
      dark: "#ffc825",
      contrastText: "#000",
    },
    neutral: {
      grey: "#ECECEC",
      light: "#FFFFFF",
      dark: "#0000001f",
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
