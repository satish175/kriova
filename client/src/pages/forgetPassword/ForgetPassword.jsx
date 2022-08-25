import "../signup/signup.css";
import React, { useRef } from "react";

import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const email = useRef();
  const password = useRef();
  const otp = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:4000/api/sendotp", {
        email: email.current.value,

        // password: password.current.value,
        // confirmpassword: passwordAgain.current.value,
      }).then((response) => {
        console.log(response);
        if (response.data.message === "email doesn't exists") {
          alert("email doesn't exists");
        } else {
          console.log(response.data.otp);
          localStorage.setItem("otp", response.data.otp);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp.current.value === localStorage.getItem("otp")) {
      alert("OTP verified");
      try {
        if (password.current.value === passwordAgain.current.value) {
          await Axios.post("http://localhost:4000/api/forgot", {
            password: password.current.value,
            confirmpassword: passwordAgain.current.value,
          }).then((response) => {
            if (response.data.message === "success") {
              alert("password changed");
              localStorage.removeItem("otp");
              navigate("/");
            } else if (response.data.message === "wrong password") {
              alert("email doesn't exists");
            }
          });
        } else {
          alert("wrong password");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("wrong otp try again  ");
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginleft">
          <h3 className="loginLogo">Kriova</h3>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Email"
              ref={email}
              required
              type={email}
              className="loginInput"
            />

            <button className="loginButton" onClick={handleClick}>
              send otp
            </button>

            <input
              placeholder="Enter OTP"
              required
              ref={otp}
              pattern="[0-9]{1,6}"
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              type={password}
              ref={password}
              className="loginInput"
              minLength={6}
            />
            <input
              placeholder="Re-enter Password"
              required
              type={password}
              ref={passwordAgain}
              className="loginInput"
            />

            <button className="loginRegisterButton" onClick={verifyOtp}>
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
