import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/themes";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/router-config";
import AlertNotification from "./components/alert-notification";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RouterConfig />
        <AlertNotification />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
