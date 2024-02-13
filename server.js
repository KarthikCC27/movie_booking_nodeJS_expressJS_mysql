const express = require("express");
const app = express();
const con = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("login.html", { root: __dirname });
});

app.get("/index", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/back.jpg", (req, res) => {
  res.sendFile("back.jpg", { root: __dirname });
});

app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: __dirname });
});

app.get("/logout", (req, res) => {
  res.sendFile("login.html", { root: __dirname });
});

app.get("/showMovies", (req, res) => {
  con.query("select movieName,tickets_available from current_movies", (err, result) => {
    if (err) throw err;
    else {
      const s = result
        .map(
          (row) => `<option value="${row.movieName}">${row.movieName} - ${row.tickets_available} Tickets</option>`
        )
        .join("");
      res.json(s);
    }
  });
});

app.get("/listBookings", (req, res) => {
  con.query("select movieName,noOfTickets from booked", (err, result) => {
    if (err) throw err;
    else {
      const s = result
        .map(
          (row) => `<li>${row.movieName} - ${row.noOfTickets} Tickets</li>`
        )
        .join("");
      res.json(s);
    }
  });
});

app.post("/dosignup", (req, res) => {
  const uname = req.body.signup_data["user"].toString();
  const pw = req.body.signup_data["pass"].toString();
  let checkquery = `select * from users where username='${uname}';`;
  let query = `insert into users values('${uname}','${pw}');`;
  con.query(checkquery, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      if (results.length == 0) {
        con.query(query, (err) => {
          if (err) console.log(err);
          else {
            console.log("ok");
            res.send({ resp: "ok" });
          }
        });
      } else {
        console.log("Exists");
        res.send({ resp: "exists" });
      }
    }
  });
});

app.post("/login", (req, res) => {
  const uname = req.body.login_data["user"].toString();
  const pw = req.body.login_data["pass"].toString();
  let query = `select * from users where username='${uname}'and pass='${pw}';`;
  con.query(query, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      if (results.length != 0) {
        res.send({ resp: "ok" });
      } else {
        res.send({ resp: "wrong_credentials" });
      }
    }
  });
});

app.post("/bookTicket", (req, res) => {
  const mname = req.body.movieticket["movie"].toString();
  const user = req.body.movieticket["uname"].toString();
  const temp = req.body.movieticket["num"];
  let mticket = parseInt(temp);

  let query = `insert into booked values('${mname}',${mticket},'${user}');`;
  let query1 = `update current_movies set tickets_available=tickets_available-${mticket} where movieName='${mname}';`;
  let query2 = `select tickets_available from current_movies where movieName='${mname}';`;
  let query3 = `select * from booked where user='${user}' and movieName='${mname}';`
  let query4 = `update booked set noOfTickets=noOfTickets+${mticket} where movieName='${mname}';`
  con.query(query2, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      let remaining = results[0].tickets_available;
      if (mticket <= remaining) {
        con.query(query3, (err, result) => {
          if (err) throw err;
          else {
            if (result.length == 0) {
              con.query(query, (err) => {
                if (err) {
                  console.log(err);
                }
                con.query(query1, (err) => {
                  res.send({ resp: "ok" });
                  console.log("ticket confirmed");
                });
              });
            }
            else {
              con.query(query4, (err) => {
                if (err) {
                  console.log(err);
                }
                con.query(query1, (err) => {
                  res.send({ resp: "ok" });
                  console.log("ticket confirmed");
                });
              });
            }
          }
        })
      }
    
  else {
    res.send({ resp: "tickets_unavailable" });
  }
    }
  });
});

app.listen(3000);
