import { useDispatch, useSelector } from "react-redux";
import "./SignupPage.css";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { signUp } from "../../store/session";

export default function SignupPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  if (user) return <Redirect to="/main" />;

  return (
    <div className="signup__div">
      <form onSubmit={handleSubmit} className="signup__form">
        <h1>Create An Account</h1>

        <label className="signup__label">
          Username
          <input
            type="text"
            className="signup__input"
            value={username}
            required
            maxLength={100}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.length >= 100 && (
            <span className="signup__error">
              Max Username length of 100 has been reached
            </span>
          )}
          {errors.username && (
            <span className="signup__error">{errors.username}</span>
          )}
        </label>

        <label className="signup__label">
          Email
          <input
            type="email"
            className="signup__input"
            value={email}
            maxLength={200}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {email.length >= 200 && (
            <span className="signup__error">
              Max Email length of 200 has been reached
            </span>
          )}
          {errors.email && (
            <span className="signup__error">{errors.email}</span>
          )}
        </label>

        <label className="signup__label">
          Password
          <input
            type="text"
            className="signup__input"
            value={password}
            required
            maxLength={40}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length >= 40 && (
            <span className="signup__error">
              Max Password length of 40 has been reached
            </span>
          )}
          {errors.password && (
            <span className="signup__error">{errors.password}</span>
          )}
        </label>

        <label className="signup__label">
          Confirm Password
          <input
            type="text"
            className="signup__input"
            value={confirmPassword}
            required
            maxLength={40}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword.length >= 40 && (
            <span className="signup__error">
              Max Password length of 40 has been reached
            </span>
          )}
          {errors.confirmPassword && (
            <span className="signup__error">{errors.confirmPassword}</span>
          )}
        </label>

        <button type="submit" className="signup__submit">
          Submit
        </button>
      </form>
    </div>
  );
}
