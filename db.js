const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "K@rthik27122003",
    database: "movies",
  });
  
  connection.connect(function (err) {
    if (err) {
      console.log("error: " + err);
    } else console.log("Connection successful");
  });

module.exports = connection;