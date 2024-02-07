const express = require("express");
const path = require("path");
const app = express();
const connection = require("../movie_booking_nodeJS/db.js");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname)));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const query = "select movieName from current_movies";
  connection.query(query, (err, result) => {
    let s=[]
    for(let i=0;i<result.length;i++){
        s.push(result[i].movieName);
    }
    res.render("index", { s: s });
  });
});

app.post("/",(req,res)=>{
    const data = req.params;
    console.log(data);
    res.end('booked');
})

app.listen(3000, () => {
  console.log("connected to port 3000");
});
