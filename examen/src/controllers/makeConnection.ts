/**
 * function to initialize and test the connection to our database
 */
export async function makeConnection() {
  const response = await fetch("http://localhost:3001/getConnection", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    let json = await response.json();
    console.log(json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
