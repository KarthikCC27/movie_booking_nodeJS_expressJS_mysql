const con = require("C:\\comcast\\movie_app\\connect.js");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const html = fs.readFileSync("C:\\comcast\\movie_app\\main.html", "utf8");
const dom = new JSDOM(html);

const document = dom.window.document;

con.query("select movieName from current_movies",function(err,results,fields){
    if (err) throw err;

    const options = results.map((row)=>`<option>${row.movieName}</option>`).join('');
    console.log(options);
    const myselect = document.getElementById("movie_name");
    myselect.innerHTML=options;
})



