import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SignupPage from "./components/SignupPage/SignupPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      {isLoaded && (
        <Switch>

        <Route exact path="/">
          {/* <LandingPage /> */}
        </Route>

        <Route path="/main">
          <h1>helloworld</h1>
        </Route>

        <Route path="/signup">
          <SignupPage />
        </Route>

        <Route path="/login">
          {/* <LoginPage /> */}
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
