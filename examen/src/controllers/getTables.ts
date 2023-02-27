import { TableData } from "../types/TableData";
import { TableObject } from "../types/TableObject";

export async function getTables(databaseName: string) {
  const response = await fetch("http://localhost:3001/getTables/" + databaseName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    let json = await response.json();
    const tables: TableData[] = [];
    json.map((tableObject: TableObject) => {
        console.log(tableObject);
        const tableProperty: string = `Tables_in_${databaseName}`;
        const tableData: string = (tableObject as any)[tableProperty];
      tables.push({ name: tableData});
    });
    return tables;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
