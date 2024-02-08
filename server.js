const express = require("express");
const app = express();
const con = require("./db")

app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/showMovies", (req, res) => {
  con.query("select movieName from current_movies", (err, result) => {
    if (err) throw err;
    else {
      const s = result.map((row)=>`<option value="${row.movieName}">${row.movieName}</option>`).join('');
      res.json(s)
    }
  });
});

app.post("/bookTicket",(req,res)=>{
    const mname=req.body.movieticket["movie"].toString()
    const temp=req.body.movieticket["num"]
    let mticket=parseInt(temp);

    let query = `insert into booked values(${mname},${mticket});`
    con.query(query,(err)=>{
        if (err) {
            console.log(query)
            console.log(typeof mname + " "+typeof mticket)
        }
        else{
            console.log('ticket confirmed')
        }
    })
})

app.listen(3000);
