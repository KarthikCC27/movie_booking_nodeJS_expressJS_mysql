const http = require("http");
const fs = require("fs");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"K@rthik27122003",
    database:"movies"
});

connection.connect(function(err){
    if (err){
        console.log("error: "+err);
    }
    else
        console.log("Connection successful");
});

http.createServer((req, res) => {
  const query = "select movieName from current_movies";

  
  if (req.url === "/") {
    connection.query(query,(err,result)=>{
        fs.readFile("./main.html", (err, html) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
            } else {
      
              const s = result.map((row)=>`<option>${row.movieName}</option>`)
              console.log(s);
              const updated_html = './main.html'.replace('<select id="movie_name"></select>',`<select id="movie_name">${s}hi</select>`)
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(html);
            }
          });
    })
    
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}).listen(3000, () => {
  console.log("connected to port 3000");
});
