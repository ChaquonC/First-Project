import "./MainPage.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import NavBar from "../NavBar/NavBar";

export default function MainPage() {
    const history = useHistory();
    const handlePVA = () => {history.push("/main/gamemodeOne")};
    const handlePVP = () => {history.push("/main/gamemodeTwo")};
    const handleOnline = () => {history.push("/main/gamemodeThree")};
    const handleProfile = () => {history.push("/main/createCharacter")};
    const user = useSelector(state => state.session.user)
    if (!user) {history.push("/")}
    return (
        <>
        <NavBar/>
        </>
    );
}
