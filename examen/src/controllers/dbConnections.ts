
export const mySql = require('mysql') 

export const connection = mySql.createConnection({
    host: "localhost:3306",
    user: "examUser",
    password: "123123"
})