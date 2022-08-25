const express = require("express");
const db = require("./db.js");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // true for 465, false for other ports
  auth: {
    user: "kriova.infotech@gmail.com", // generated ethereal user
    pass: "aarhrihcgwiaskre", // generated ethereal password
  },
});

app.post("/api/signup", async (req, res) => {
  const { employeename, email, password, confirmpassword } = req.body;
  if (password == confirmpassword) {
    db.query(
      "INSERT INTO employee(employeename,email,password)  VALUES (?,?,?)",
      [employeename, email, password],
      (err, results) => {
        console.log(err);
        res.status(200).json(results);
      }
    );
  }
});

//
app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM employee WHERE email = ?", email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      if (password == results[0].password) {
        res.json({
          loggedIn: true,
          message: "logged In.....",
          username: results[0].employeename,
        });
      } else {
        res.json({ loggedIn: false, message: "Wrong username/password" });
      }
    } else {
      res.json({
        loggedIn: false,
        message: "User doesn't exist please signup",
      });
    }
  });
});

//profile page
app.get("/api/:username", (req, res) => {
  const username = req.params.username;
  const sql = "select * from employee where employeename=?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.log(err);
    }
    res.json({ info: results[0] });
  });
});

//sending otp
app.post("/api/sendotp", async (req, res) => {
  const emailid = req.body.email;
  let otpcode = Math.floor(Math.random() * 899999 + 100000);
  const query = "select * from employee where email= ?";
  db.query(query, [emailid], (err, results) => {
    console.log(err);
    if (results.length != 0) {
      res.status(200).json({ otp: otpcode });
      transporter.sendMail(
        {
          from: "kriova.infotech@gmail.com",
          to: `${emailid}`,
          subject: "KRIOVA for resetting your password",
          html: `<b>Hello there <p> Here's the OTP for resetting your password </p><p style={{color="blue"}}>${otpcode}</p></b>`, // html body
        },
        (err) => {
          if (err) {
            console.log("email not found");
          } else {
            console.log("otp sent");
          }
        }
      );
    } else {
      res.json({ message: "email doesn't exists" });
    }
  });
});

//forgot password
app.post("/api/forgot", (req, res) => {
  const { password, confirmpassword, email } = req.body;
  const sql = "update employee set password = ? where email = ?";
  if (password == confirmpassword) {
    db.query(sql, [password, email], (err, results) => {
      console.log(err);

      res.status(200).json({ message: "success" });
    });
  } else {
    res.status(404).json({ message: "wrong password" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
