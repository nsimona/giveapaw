import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/themes";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/router-config";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
