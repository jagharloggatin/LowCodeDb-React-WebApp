import { DatabaseObject } from "../types/DatabaseObject";
import { TableData } from "../types/TableData";

export async function getDatabases() {
  const response = await fetch("http://localhost:3001/getDatabases", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    let json = await response.json();
    const test: TableData[] = [];
    json.map((thingy: DatabaseObject) => {
      test.push({ name: thingy.Database });
    });
    return test;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
