import { CreateColumnData } from "../types/Columns";

/**
 * Function to send data to our server to create a column on a table of a database
 * @param tableName specify the table name
 * @param databaseName specify the database name
 * @param columnData column name, datatype and primary key boolean
 */
export async function createColumn(tableName: string, databaseName: string, columnData: CreateColumnData) {
    //create body of the http request 
    const body = { tableName: tableName, databaseName: databaseName, columnData: columnData};

    //send the request to backend
    const response = await fetch("http://localhost:3001/createColumn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    //log response to check for errors
    if (response.ok) {
        let json = await response.json();
        console.log(json);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}