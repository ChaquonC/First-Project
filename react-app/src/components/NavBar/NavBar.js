import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./NavBar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import fake_mon_home_icon from "../../images/fake_mon_home_icon.png"

export default function NavBar() {
  const [dropped, setDropped] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
  };

  const handleDropdown = async () => {
    await setDropped(!dropped);
  };

  return (
    <div className="navbar__div">
      <Link to={"/main"} className="navbar__home">
        <img className="navbar__home-image" src={fake_mon_home_icon} alt="home icon" />
      </Link>
      <Link to={"/about"} className="navbar__about">
        About
      </Link>
      <Link to={"/characters"} className="navbar__characters">
        Characters
      </Link>
      <button onClick={handleDropdown} className="navbar__profile">
        {user.username}
      </button>
      {dropped && (
        <ul className="navbar__dropdown-menu">
          <li>
            <Link
              to={"/main/manageCharactes"}
              className="dropdown-menu__characters"
            >
              Manage Characters
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
}
