import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SignupPage from "./components/SignupPage/SignupPage";
import LoginPage from "./components/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import MainPage from "./components/MainPage/MainPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // if (!user) {
  //   return (<Redirect to="/" />)
  // }

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/main">
            <MainPage />
          </Route>

          <Route path="/signup">
            <SignupPage />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
