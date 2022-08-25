const mysql = require("mysql");
const db = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6514828",
  password: "U8rSFQjgaA",
  database: "sql6514828",
});
db.connect((err) => {
  if (!err) console.log("db connected");
  else console.log(JSON.stringify(err, undefined, 2));
});

module.exports = db;
