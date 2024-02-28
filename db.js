const mysql = require('mysql')

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Your_Password",
    database:"Your_DB"
})

con.connect((err)=>{
    if(err){ throw err}

    else {console.log("connected to db")}
});

module.exports = con;
