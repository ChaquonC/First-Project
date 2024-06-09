import "./MainPage.css";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import GameSelector from "../GameSelector/GameSelector";
import ManageCharacters from "../ManageCharacters";
<<<<<<< HEAD
import CharacterSelect from "../GameModes/PlayerVsAi/CharacterSelect";
=======
import About from "../About"
>>>>>>> about

export default function MainPage() {
  const user = useSelector((state) => state.session.user);
  if (user) {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/main">
            <GameSelector />
          </Route>
          <Route path="/characters"></Route>
          <Route path="/main/gamemode1">
            <CharacterSelect />
          </Route>
          <Route path="/main/gamemode2"></Route>
          <Route path="/main/gamemode3"></Route>
          <Route path="/main/about">
            <About />
          </Route>
          <Route path="/main/manage-characters">
            <ManageCharacters />
          </Route>
          <Route>
            <Redirect to="/main" />
          </Route>
        </Switch>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
