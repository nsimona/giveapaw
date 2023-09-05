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
    tertiary: {
      light: "#bdeaf2",
      main: "#7ACEDF",
      dark: "#65bacf",
      contrastText: "#fff",
    },
    // secondary: {
    //   light: "#9d51b6",
    //   main: "#8c38a9",
    //   dark: "#7f34a2",
    //   contrastText: "#fff",
    // },
    secondary: {
      light: "#feda5a",
      main: "#fed039",
      dark: "#ffc825",
      contrastText: "#000",
    },
    primary: {
      light: "#9d51b6",
      main: "#8c38a9",
      dark: "#7f34a2",
      contrastText: "#fff",
    },
    // tertiary: {
    //   light: "#ff9aa3",
    //   main: "#ff6f7d",
    //   dark: "#ff445b",
    //   contrastText: "#fff",
    // },
    neutral: {
      grey: "#ECECEC",
      light: "#FFFFFF",
      dark: "#0000001f",
      main: "#ECECEC",
    },
    neutralText: {
      main: "#666",
    },
    red: {
      main: "#f44336",
      light: "#e57373",
      dark: "#b71c1c",
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
    },
  },
});

export default theme;
