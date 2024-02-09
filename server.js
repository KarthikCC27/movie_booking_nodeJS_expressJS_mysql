const express = require("express");
const app = express();
const con = require("./db")

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("login.html", { root: __dirname });
});

app.get("/index", (req, res) => {
  res.sendFile("index.html",{root:__dirname});
});

app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: __dirname });
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

app.post("/dosignup",(req,res)=>{
  const uname=req.body.signup_data["user"].toString()
  const pw=req.body.signup_data["pass"].toString()
  let checkquery = `select * from users where username='${uname}';`
  let query = `insert into users values('${uname}','${pw}');`
  con.query(checkquery,(err,results)=>{
      if (err) {
          console.log(err)
      }
      else{
          if(results.length==0){
            con.query(query,(err)=>{
              if(err) console.log(err);
              else{
                console.log("ok")
                res.send({resp:"ok"})
              }
            })
          }
          else{
            console.log("Exists")
            res.send({resp:"exists"})
          }
      }
  })
})

app.post("/login",(req,res)=>{
  const uname=req.body.login_data["user"].toString()
  const pw=req.body.login_data["pass"].toString()
  let query = `select * from users where username='${uname}'and pass='${pw}';`
  con.query(query,(err,results)=>{
      if (err) {
          console.log(err)
      }
      else{
          if(results.length!=0){
            res.send({resp:"ok"})
          }
          else{
            res.send({resp:"wrong_credentials"})
          }
      }
  })
})

app.post("/bookTicket",(req,res)=>{
    const mname=req.body.movieticket["movie"].toString()
    const user=req.body.movieticket["uname"].toString()
    const temp=req.body.movieticket["num"]
    let mticket=parseInt(temp);

    let query = `insert into booked values('${mname}',${mticket},'${user}');`
    con.query(query,(err)=>{
        if (err) {
            console.log(err)
        }
        else{
            console.log('ticket confirmed')
        }
    })
})

app.listen(3000);
