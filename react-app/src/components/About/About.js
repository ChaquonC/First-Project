import flaskIcon from "../../images/Flask-Logo.png";
import reactIcon from "../../images/React-Logo.svg";
import reduxIcon from "../../images/Redux-Logo.svg";
import awsIcon from "../../images/AWS-Logo.png";
import cssIcon from "../../images/CSS-Logo.svg";
import htmlIcon from "../../images/HTML-Logo.svg";
import javascriptIcon from "../../images/Javascript-Logo.svg";
import pythonIcon from "../../images/Python-Logo.svg";
import sqlAlchemyIcon from "../../images/SQLAlchemy-Logo.svg";
import githubIcon from "../../images/Github-icon.png";
import postgreSQLIcon from "../../images/PostgreSQL-Logo.svg";

import "./About.css";

export default function About() {
  return (
    <div className="about__div">
      <h1 id="about__tech-title">Technologies Used</h1>
      <ul className="about__tech-icons">
        <li className="about__li">
          <img
            className="about__li-img"
            src={javascriptIcon}
            alt="JavaScript Logo"
          />
          <span>JavaScript</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={htmlIcon} alt="HTML Logo" />
          <span>HTML</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={cssIcon} alt="CSS Logo" />
          <span>CSS</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={pythonIcon} alt="Python Logo" />
          <span>Python</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={reactIcon} alt="Reach Logo" />
          <span>React</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={reduxIcon} alt="Redux Logo" />
          <span>Redux</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={flaskIcon} alt="Flask Logo" />
          <span>Flask</span>
        </li>
        <li className="about__li">
          <img
            className="about__li-img"
            src={sqlAlchemyIcon}
            alt="SQLAlchemy Logo"
          />
          <span>SQLAlchemy</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={awsIcon} alt="AWS Logo" />
          <span>AWS</span>
        </li>

        <li className="about__li">
          <img className="about__li-img" src={githubIcon} alt="GitHub Logo" />
          <span>GitHub</span>
        </li>

        <li className="about__li">
          <img
            className="about__li-img"
            src={postgreSQLIcon}
            alt="PostgreSQL Logo"
          />
          <span>PostgreSQL</span>
        </li>
      </ul>

      <div className="about__us">
        <div className="about__github">
          <h2>Follow Us On Github</h2>
          <div className="about__github-main">
            <h3 className="about__info-section">
              Ruben:
              <a href="https://github.com/RubenRamirez12" target="_blank" rel="noreferrer">
                <i className="fab fa-github" />
              </a>
            </h3>

            <h3 className="about__info-section">
              Chaquon:
              <a href="https://github.com/ChaquonC" target="_blank" rel="noreferrer">
                <i className="fab fa-github" />
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
