import "./signup.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";
function Signup() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:4000/api/signup", {
        employeename: username.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmpassword: passwordAgain.current.value,
      }).then((response) => {
        console.log(response);
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const loginClick = () => {
    navigate("/");
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginleft">
          <h3 className="loginLogo">Kriova</h3>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
              pattern="[a-zA-Z@0-9]+"
            />
            <input
              placeholder="Email"
              ref={email}
              required
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              type="password"
              ref={password}
              className="loginInput"
              minLength={6}
            />
            <input
              placeholder="Re-enter Password"
              required
              type="password"
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton" onClick={handleClick}>
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={loginClick}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
