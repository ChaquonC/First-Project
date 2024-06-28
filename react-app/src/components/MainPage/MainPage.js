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
import CharacterSelect from "../GameModes/PlayerVsAi/CharacterSelect";
import PlayerCharacterSelect from "../GameModes/PlayerVPlayer/PlayerCharacterSelect";
import About from "../About";
import PVABattle from "../GameModes/PlayerVsAi/PVABattle";
import PVPBattle from "../GameModes/PlayerVPlayer/PVPBattle";
import LobbySelect from "../GameModes/OnlinePVP/LobbySelect";
import sleepy from "../../images/KirbySleep.png";

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
          <Route path="/main/gamemode1/select">
            <CharacterSelect />
          </Route>
          <Route path="/main/gamemode1/battle">
            <PVABattle />
          </Route>
          <Route path="/main/gamemode2/select">
            <PlayerCharacterSelect />
          </Route>
          <Route path="/main/gamemode2/battle">
            <PVPBattle />
          </Route>
          <Route path="/main/gamemode3/select">
            {/* Work in progress if we get back to it. */}
            {/* <LobbySelect /> */}
            <div className="WIP">
              <span>Feature Coming Soon</span>
              <img src={sleepy} />
            </div>
          </Route>
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
