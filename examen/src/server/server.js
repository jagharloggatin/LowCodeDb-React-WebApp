const mySql = require("mysql2");
var cors = require('cors')
const express = require("express");

const app = express();
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
}))

const port = 3001;

const connection = mySql.createConnection({
  host: "localhost",
  user: "examUser",
  password: "123123",
  port: port
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/getConnection", (req, res) => {
    connection.connect(function(err) {
        if (err) console.log(err);
        console.log("before connection")
        res.send({message: "Connected!"});
        console.log("after connection")
      });
  });

  app.post("/createDatabase", (req, res) => {
    console.log(req.body);
    let createQuery = `CREATE DATABASE ${req.body}`;

    // use the query to create a Database.
    connection.query(createQuery, (err) => {
        if(err) console.log(err);

        console.log("Database Created Successfully !");

        let useQuery = `USE ${req.body}`;
        connection.query(useQuery, (error) => {
            if(error) console.log(error);

            console.log("Using Database");

            return res.send(
                `Created and Using ${req.body} Database`);
        })
    });
});
