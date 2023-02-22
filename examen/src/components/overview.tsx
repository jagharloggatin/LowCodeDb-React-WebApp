import { type } from "os";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { TableData } from "../types/TableData";

export type overviewProps = {
  buttonName: string;
  tableData: TableData[];
  goBack: boolean;
}

export default function Overview(props: overviewProps) {
  const { buttonName, tableData, goBack } = props;

  //useEffect here
  if (goBack) {
    return (
      <div>
        <Button className="backButton">Back</Button>

        <Button className="createButton">{buttonName}</Button>

        <Table striped bordered hover>
          {tableData.map((data) => {
            return (
              <tr>
                <td>
                  <Button className="tableDataButton">{data.name}</Button>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    );
  }

  return (
    <div>
      <Button>{buttonName}</Button>
      <Table striped bordered hover>
        {tableData.map((data) => {
          return (
            <tr>
              <td>
                <Button className="tableDataButton">{data.name}</Button>
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
