import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./NavBar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import fake_mon_home_icon from "../../images/fake_mon_home_icon.png";
import { actionClearUserCharacters } from "../../store/character";

export default function NavBar() {
  const [dropped, setDropped] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(actionClearUserCharacters());
    await dispatch(logout());
  };

  const handleDropdown = async () => {
    await setDropped(!dropped);
  };

  return (
    <div className="navbar__div">
      <Link to={"/main"} className="navbar__home">
        <img
          className="navbar__home-image"
          src={fake_mon_home_icon}
          alt="home icon"
        />
      </Link>
      <Link to={"/main/about"} className="navbar__about">
        About
      </Link>
      <Link to={"/main/manage-characters"} className="navbar__characters">
        Characters
      </Link>
      <button onClick={handleDropdown} className="navbar__profile">
        {user.username}
      </button>
      {dropped && (
        <ul className="navbar__dropdown-menu">
          <li>
            <button onClick={handleLogout} id="navbar__logout__button">
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
