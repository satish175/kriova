import Axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:4000/api/login", {
        email: email.current.value,
        password: password.current.value,
      }).then((response) => {
        console.log(response);
        if (response.data.loggedIn) {
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("loggedIn", true);
          navigate("/" + response.data.username);
        } else {
          alert("Invalid email or password");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const signupClick = () => {
    navigate("/signup");
  };
  const forgot = () => {
    navigate("/forgetPassword");
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
              placeholder="Email"
              type="email"
              required
              pattern="[A-Za-z@0-9.]*"
              className="loginInput"
              ref={email}
              autoComplete="true"
              autoSave="true"
            />
            <input
              placeholder="Password"
              type="password"
              required
              className="loginInput"
              pattern="[A-Za-z0-9@!#$]*"
              minLength={6}
              ref={password}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <button className="loginForgot" onClick={forgot}>
              Forgot Password?
            </button>
            <button className="loginRegisterButton" onClick={signupClick}>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
