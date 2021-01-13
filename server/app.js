const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");

const { MySqlConnection } = require("mysqlconnector");

const app = express();
const port = 8080;

const db = new MySqlConnection("localhost", "root", "1NF1N1T7_X", "authdb");

db.connectAsync().then(() => {
  console.log("connection successfull");
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.post("/register", (req, res, next) => {
  const { id, username, firstName, lastName, password } = req.body;

  db.connectAsync().then(() => {
    let sql = `INSERT INTO users (userId, firstname, lastname, username, password) VALUES ('${id}', '${firstName}', '${lastName}', '${username}','${password}')`;

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

app.post("/login", (req, res, next) => {
  const { password, username } = req.body;
  db.connectAsync().then(() => {
    let sql = `SELECT * FROM users  WHERE username='${username}' AND password='${password}'`;
    db.queryAsync(sql).then(
      (response) => {
        if (response.length) {
          console.log(response);
          res.json(response);
        } else {
          res.send({ message: "Wrong details" });
        }
        next();
      },
      (error) => {
        console.log(error);
        next(error);
      }
    );
  });
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
