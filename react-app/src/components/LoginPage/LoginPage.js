import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../store/session";
import "./LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (user) return <Redirect to="/main" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

//   const handleDemoUser = (e) => {
//     e.preventDefault();
//     dispatch(login("Demo", "password"));
//   };

  return (
    <div className="login__div">
      <form onSubmit={handleSubmit} className="login__form">
        <h1>Login</h1>

        <label className="login__label">
          Email or Username{" "}
          <input
            className="login__input"
            type="text"
            value={credential}
            required
            onChange={(e) => setCredential(e.target.value)}
            maxLength={200}
          />
          {credential.length >= 200 && (
            <span className="login__error">
              Max Credential length has been reached
            </span>
          )}
          {errors.credential && (
            <span className="login__error">{errors.credential}</span>
          )}
        </label>

        <label className="login__label">
          Password{" "}
          <input
            className="login__input"
            type="password"
            value={password}
            required
            maxLength={40}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length >= 40 && (
            <span className="login__error">
              Max Length for password has been reached
            </span>
          )}
          {!errors.credential && errors.password && (
            <span className="login__error">{errors.password}</span>
          )}
        </label>

        <button className="login__submit">Login</button>
      </form>
    </div>
  );
}
