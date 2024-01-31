const con = require("C:\\comcast\\movie_booking_nodeJS\\connect.js");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const html = fs.readFileSync("C:\\comcast\\movie_booking_nodeJS\\main.html", "utf8");
const dom = new JSDOM(html);

const document = dom.window.document;

con.query("select movieName from current_movies",function(err,results,fields){
    if (err) throw err;

    const myselect = document.getElementById("movie_name");
    for (let row of results) {
      let option = document.createElement("option");
      option.textContent = row.movieName;
      myselect.appendChild(option);
    }
})




