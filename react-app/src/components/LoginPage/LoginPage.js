import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../store/session";

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

  const handleDemoUser = (e) => {
    e.preventDefault();
    dispatch(login("Demo", "password"));
  };

  return (
    <div className="login__div">
      <form onSubmit={handleSubmit} className="login__form">
        <label className="login__label">
          Email or Username{" "}
          <input
            className="login__input"
            type="text"
            value={credential}
            required
            onChange={(e) => setCredential(e.target.value)}
          />
        </label>

        <label className="login__label">
          Password{" "}
          <input
            className="login__input"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="login__submit"></button>
      </form>
    </div>
  );
}
