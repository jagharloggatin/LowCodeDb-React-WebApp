import { CreateColumnData } from "../types/Columns";

export async function createColumn(tableName: string, databaseName: string, columnData: CreateColumnData) {
    const body = { tableName: tableName, databaseName: databaseName, columnData: columnData};

    const response = await fetch("http://localhost:3001/createColumn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (response.ok) {
        let json = await response.json();
        console.log(json);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}