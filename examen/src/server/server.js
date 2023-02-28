const mySql = require("mysql2");
var cors = require('cors')
const express = require("express");
var bodyParser = require('body-parser')

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}))
app.use(bodyParser.json())

const port = 3001;

const connection = mySql.createConnection({
    host: "localhost",
    user: "examUser",
    password: "123123",
    //port: port
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get("/getConnection", (req, res) => {
    connection.connect(function (err) {
        if (err) console.log(err);
        res.send({message: "Connected!"});
    });
});

app.get("/getDatabases", (req, res) => {
    let showQuery = `SHOW DATABASES`;
    connection.query(showQuery, (err, result, fields) => {
        if (err) console.log(err)
        return res.send(JSON.stringify(result))
    })
});

app.post("/createDatabase", (req, res) => {
    console.log("body: " + req.body.name);
    let createQuery = `CREATE DATABASE ${req.body.name}`;

    // use the query to create a Database.
    connection.query(createQuery, (err) => {
        if (err) {
            console.log(err)
        }

        console.log("Database Created Successfully !");

        let useQuery = `USE ${req.body.name}`;
        connection.query(useQuery, (error) => {
            if (error) {
                console.log(error)
            }
            ;

            console.log("Using Database");

            return res.send(
                {message: `Created and Using ${req.body.name} Database`});
        })
    });
});


app.post("/createTable", (req, res) => {
    console.log("body: " + req.body.name);
    let createQuery = `CREATE TABLE ${req.body.name}(id int unique, primary key(id));`;
    let useQuery = `USE ${req.body.databaseName}`;

    connection.query(useQuery, (error) => {
        if (error) {
            console.log(error)
        }
        console.log("Using Database");

        connection.query(createQuery, (err) => {
            if (err) {
                console.log(err)
            }

            return res.send(
                {message: `Created table ${req.body.name} on ${req.body.databaseName}`});
        })
    });
});

app.get("/getTables/:databaseName", (req, res) => {
    let useQuery = `USE ${req.params.databaseName}`;
    let showQuery = `SHOW TABLES`;

    connection.query(useQuery, (err) => {
        if (err) console.log(err)
    })

    connection.query(showQuery, (err, result, fields) => {
        if (err) console.log(err)
        return res.send(JSON.stringify(result))
    })
})

app.get("/getColumns/:databaseName/:tableName", (req, res) => {
    let useQuery = `USE ${req.params.databaseName}`;
    let showQuery = `SHOW COLUMNS FROM ${req.params.tableName}`;

    connection.query(useQuery, (err) => {
        if (err) console.log(err)
    })

    connection.query(showQuery, (err, result, fields) => {
        if (err) console.log(err)
        return res.send(JSON.stringify(result))
    })
})
