const express = require("express");
const { MySqlConnection } = require("mysqlconnector");

const app = express();
const port = 8080;

const connection = new MySqlConnection(
  "localhost",
  "root",
  "1NF1N1T7_X",
  "authdb"
);

connection.connectAsync().then(() => {
  console.log("connection successfull");
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
