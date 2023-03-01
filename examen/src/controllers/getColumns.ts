import { Columns, GetColumnData } from "../types/Columns";

/**
 * function to get all columns from a specific table
 * @param databaseName specify the database
 * @param tableName specify the table
 * @returns Columns[]
 */
export async function getColumns(databaseName: string, tableName: string) {
  const response = await fetch(
    "http://localhost:3001/getColumns/" + databaseName + "/" + tableName,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    let json = await response.json();
    const fields: Columns[] = json.map((data: GetColumnData) => {
      return { columnName: data.Field };
    });
    return fields;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
