/**
 * Function to send data to our server to create a new database in MySQL
 * @param databaseName specify the name of the new database
 */
export async function createDatabases(databaseName: string) {
  //prepare the body for the http request
  const body = { name: databaseName };

  //send the request to our server
  const response = await fetch("http://localhost:3001/createDatabase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // log the response to check for errors
  if (response.ok) {
    let json = await response.json();
    console.log(json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
