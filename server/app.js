const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  bcrypt = require("bcrypt"),
  cookieParser = require("cookie-parser"),
  session = require("express-session");

const { MySqlConnection } = require("mysqlconnector");

const app = express(),
  port = 8080,
  saltRounds = 10,
  db = new MySqlConnection("localhost", "root", "1NF1N1T7_X", "authdb");

db.connectAsync().then(
  () => {
    console.log("connection successfull");
  },
  (error) => {
    console.log(error);
  }
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire: 60 * 60 * 24,
    },
  })
);

app.post("/register", (req, res, next) => {
  const { id, username, firstName, lastName, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.connectAsync().then(() => {
      let sql = `INSERT INTO users (userId, firstname, lastname, username, password) VALUES ('${id}', '${firstName}', '${lastName}', '${username}','${hash}')`;

      db.queryAsync(sql)
        .then(() => {
          console.log("send to db successfull");
        })
        .catch((e) => {
          res.send({ err: e });
          next(e);
        });
    });
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res, next) => {
  const { password, username } = req.body;
  db.connectAsync().then(() => {
    let sql = `SELECT * FROM users  WHERE username='${username}'`;
    db.queryAsync(sql).then(
      (response) => {
        if (response.length > 0) {
          bcrypt.compare(password, response[0].password, (err, result) => {
            if (result) {
              req.session.user = response;
              console.log(req.session.user);
              res.json(response);
            } else {
              res.send({ message: "Wrong details" });
            }
          });
        } else {
          res.send({ message: "user doesn't exist" });
        }
      },
      (error) => {
        console.log(error);
        next(error);
      }
    );
  });
});

app.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.send({ loggedIn: false });
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
