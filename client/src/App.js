import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/themes";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/router-config";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/user/userSlice";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import { getCurrentUser } from "./redux/slices/user/userThunk";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isUserLoading = useSelector((state) => state.user.isLoading);

  const currentUser = async () => {
    dispatch(getCurrentUser());
    setIsLoading(isUserLoading);
  };

  useEffect(() => {
    currentUser();
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
