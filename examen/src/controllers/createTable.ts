export async function createTable(tableName: string, databaseName: string) {
    const body = { name: tableName, databaseName: databaseName};

    const response = await fetch("http://localhost:3001/createTable", {
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