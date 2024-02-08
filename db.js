const mysql = require('mysql')

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"K@rthik27122003",
    database:"movies"
})

con.connect((err)=>{
    if(err){ throw err}

    else {console.log("connected to db")}
});

module.exports = con;