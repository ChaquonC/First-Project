import {Link} from "react-router-dom"
import "./LandingPage.css"
import kirby from "../../images/kirby.png"
export default function LandingPage() {
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
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
                <Link to ="/signin">
                    <button>Log In</button>
                </Link>
            </div>
            <div className="landing-page__demo-link">
                <p>
                    Demo Mode
                </p>
            </div>
        </div>
    );
}
