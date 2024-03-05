import "./LandingPage.css"
import kirby from "../../images/kirby.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export default function LandingPage() {
    const history = useHistory()
    const handleSignup = () => {history.push("/signup")};
    const handleLogin = () => {history.push("/login")};
    return (
        <div className="landing-page__div">
            <div className="landing-page__title-card">
                <h1 className="title">FAKEMON</h1>
                <div className="landing-page__description">
                    <p className="description">
                        FAKEMON is a simple browser game inspired by games like Pokemon and the Persona series. Enjoy simple battles between characters from a number of different series and even create your own!
                    </p>
                </div>
            </div>
            <div className="landing-page__images">
                <img src={kirby} alt="kirby"/>
            </div>
            <div className="landing-page__account-buttons">
                    <button className="landing-page__signup" onClick={handleSignup}>Sign Up</button>
                    <button className="landing-page__login" onClick={handleLogin}>Log In</button>
            </div>
            <div className="landing-page__demo-link">
                <p>
                    Demo Mode
                </p>
            </div>
        </div>
    );
}
