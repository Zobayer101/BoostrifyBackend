const mysql = require("mysql");

const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "boostrify",
});

module.exports = DB;
