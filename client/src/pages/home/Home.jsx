import React from "react";
import { useState, useEffect } from "react";

import Axios from "axios";
import "./home.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
    const fetchUser = async () => {
      await Axios.get(`http://localhost:4000/api/${username}`).then(
        (response, err) => {
          if (err) console.log(err);
          setUser(response.data.info);
        }
      );
    };
    fetchUser();
  }, [username]);
  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div className="home">
      <div className="navbar-top" style={{ backgroundColor: "#1775ee" }}>
        {/* <span style={{ color: "white", float: "left" }}>Profile</span> */}
        <div className="title">
          <h1 style={{ display: "block", color: "white" }}>KRIOVA</h1>
        </div>
        {/* Navbar */}
        <ul>
          <li>
            <a href="https://www.accounts.google.com">
              <span className="icon-count">29</span>
              <i className="fa fa-envelope fa-2x" />
            </a>
          </li>
          <li>
            <a href="#notification">
              <span className="icon-count">59</span>
              <i className="fa fa-bell fa-2x" />
            </a>
          </li>
          <li>
            <button onClick={logout}>
              <i className="fa fa-sign-out-alt fa-2x" />
            </button>
          </li>
        </ul>
        {/* End */}
      </div>
      {/* End */}
      {/* Sidenav */}
      <div className="sidenav" style={{ backgroundColor: "#1775ee" }}>
        <div className="profile">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf2j71u2ipMbi4uUIcRaomOvJOSPkvvUPWFA&usqp=CAU"
            alt=""
            width={100}
            height={100}
          />
          <div className="name">ID:{user.EMPLOYEEID}</div>
          <div className="name">{user.employeename}</div>
          <div className="name">{user.Ph_no ? user.Ph_no : "N/A"}</div>
          <div className="job">Web Developer</div>
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#profile" className="active" style={{ color: "#1775ee" }}>
              Profile
            </a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" style={{ color: "white" }}>
              Settings
            </a>
            <hr align="center" />
          </div>
        </div>
      </div>
      {/* End */}
      {/* Main */}
      <div className="main">
        <h2>IDENTITY</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit" />
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{user.employeename}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{user.Email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>
                    {user.street ? user.street : "N/A"} {user.city} {user.state}
                    {user.pincode} {user.country}
                  </td>
                </tr>
                <tr>
                  <td>Hobbies</td>
                  <td>:</td>
                  <td>Diving, Reading Book</td>
                </tr>
                <tr>
                  <td>Job</td>
                  <td>:</td>
                  <td>Web Developer</td>
                </tr>
                <tr>
                  <td>Skill</td>
                  <td>:</td>
                  <td>PHP, HTML, CSS, Java</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h2>SOCIAL MEDIA</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit" />
            <div className="social-media">
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-facebook fa-stack-1x fa-inverse" />
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-twitter fa-stack-1x fa-inverse" />
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-instagram fa-stack-1x fa-inverse" />
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-invision fa-stack-1x fa-inverse" />
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-github fa-stack-1x fa-inverse" />
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-whatsapp fa-stack-1x fa-inverse" />
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-snapchat fa-stack-1x fa-inverse" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
