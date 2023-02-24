export async function createDatabases(databaseName: string) {
  const body = { name: databaseName };

  const response = await fetch("http://localhost:3001/createDatabase", {
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
