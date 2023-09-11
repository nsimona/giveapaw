import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/themes";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/router-config";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/user/userSlice";
import { useEffect, useState } from "react";
import { currentUser } from "./services/api";
import Loading from "./components/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    const user = await currentUser();
    dispatch(setUser(user));
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <Loading />}
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
