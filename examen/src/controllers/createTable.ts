/**
 * function to send the data to our backend to create a new table on chosen database
 * @param tableName specify the name of the new table
 * @param databaseName specify the name of the database
 */
export async function createTable(tableName: string, databaseName: string) {
  //set the body for our http request
  const body = { name: tableName, databaseName: databaseName };

  //send the http request
  const response = await fetch("http://localhost:3001/createTable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  //log the response to check for errors
  if (response.ok) {
    let json = await response.json();
    console.log(json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
