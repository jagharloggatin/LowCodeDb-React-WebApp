const mySql = require("mysql2");
var cors = require('cors')
const express = require("express");
var bodyParser = require('body-parser')

//create an express app to send requests, configure cors on the app and add a bodyparser vor post requests
const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}))
app.use(bodyParser.json())

const port = 3001;

//configure the connection to our mySQL host with user and password
const connection = mySql.createConnection({
    host: "localhost",
    user: "examUser",
    password: "123123",
});

//set the app to listen to our port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// endpoint to check for a connection
app.get("/getConnection", (req, res) => {
    connection.connect(function (err) {
        if (err) console.log(err);
        res.send({message: "Connected!"});
    });
});

//endpoint to get all databases 
app.get("/getDatabases", (req, res) => {
    let showQuery = `SHOW DATABASES`;
    connection.query(showQuery, (err, result, fields) => {
        if (err) console.log(err)
        return res.send(JSON.stringify(result))
    })
});

//endpoint to create a database on our connection
app.post("/createDatabase", (req, res) => {
    const createQuery = `CREATE DATABASE ${req.body.name}`;

    // use the query to create a Database.
    connection.query(createQuery, (err) => {
        if (err) {
            console.log(err)
        }

        console.log("Database Created Successfully !");

        // query to use the created database
        const useQuery = `USE ${req.body.name}`;
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

//endpoint to create a table
app.post("/createTable", (req, res) => {
    const createQuery = `CREATE TABLE ${req.body.name}(id int unique);`;
    const useQuery = `USE ${req.body.databaseName}`;

    //set the right database
    connection.query(useQuery, (error) => {
        if (error) {
            console.log(error)
        }
        console.log("Using Database");

        //create table on set database
        connection.query(createQuery, (err) => {
            if (err) {
                console.log(err)
            }

            return res.send(
                {message: `Created table ${req.body.name} on ${req.body.databaseName}`});
        })
    });
});

// endpoint to get all tables from a specific database
app.get("/getTables/:databaseName", (req, res) => {
    let useQuery = `USE ${req.params.databaseName}`;
    let showQuery = `SHOW TABLES`;

    connection.query(useQuery, (err) => {
        if (err) console.log(err)
    })

    //get all tables from database and return the result as a json
    connection.query(showQuery, (err, result, fields) => {
        if (err) console.log(err)
        return res.send(JSON.stringify(result))
    })
})

//endpoint to get all columns from a specific table
app.get("/getColumns/:databaseName/:tableName", (req, res) => {
    const useQuery = `USE ${req.params.databaseName}`;
    const showQuery = `SHOW COLUMNS FROM ${req.params.tableName}`;

    connection.query(useQuery, (err) => {
        if (err) console.log(err)
    })

    //get all tables and return the result as a json
    connection.query(showQuery, (err, result, fields) => {
        if (err) console.log(err)
        return res.send(JSON.stringify(result))
    })
})

//endpoint to create a column on a table
app.post("/createColumn", (req, res) => {   
    const createQuery = `ALTER TABLE ${req.body.tableName} ADD COLUMN ${req.body.columnData.name} ${req.body.columnData.datatype};`;
    const useQuery = `USE ${req.body.databaseName}`;
    
    connection.query(useQuery, (error) => {
        if (error) {
            console.log(error)
        }
        console.log("Using Database");
        
        //create a new column on the table
        connection.query(createQuery, (err) => {
            if (err) console.log(err)
            })

            //if the user wants to change the primary key on the database
            if(req.body.columnData.primaryKey){
                //find if there already is a primary key
                const findPrimaryKey = `SHOW KEYS FROM ${req.body.tableName} WHERE Key_name = 'PRIMARY';`
                connection.query(findPrimaryKey, (err, result, fields) => {
                    if(err) {console.log(err)}

                    //if there is a primary key drop it
                    if(result[0]){
                        const dropPrimaryKey = `ALTER TABLE ${req.body.tableName} DROP PRIMARY KEY;`
                        connection.query(dropPrimaryKey, (err) => {
                            if(err) console.log(err);
                        })
                    }
                   
                    //add a new primary key on the newly created column
                    const setPrimaryKey = `ALTER TABLE ${req.body.tableName} ADD PRIMARY KEY(${req.body.columnData.name})`
                    connection.query(setPrimaryKey, (err) => {
                        if(err) console.log(err)
                    })
                })

            }
        return res.send(
        {message: `Created column ${req.body.columnData.name} on Table ${req.body.tableName}`});
    });
});
