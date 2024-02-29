import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate, logout } from "./store/session"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SignupPage from "./components/SignupPage/SignupPage";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleLogout = async (e) => {
    dispatch(logout())
  }
  return (
    <>
      {isLoaded && (
        <Switch>

        <Route exact path="/">
          {/* <LandingPage /> */}
        </Route>

        <Route path="/main">
          {user && <button onClick={handleLogout}>temp logout</button>}
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
