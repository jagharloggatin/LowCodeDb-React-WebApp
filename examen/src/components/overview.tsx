import { type } from "os";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { TableData } from "../types/TableData";
import ModalComponent from "./modalOverviewComponent";
import {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";



export type overviewProps = {
  buttonName: string;
  tableData: TableData[];
  goBack?: boolean;
}

export default function Overview(props: overviewProps) {
  const { buttonName, tableData, goBack } = props;

  const [showModal, setShowModal] = useState(false);
  const [rows, addRows] = useState([...tableData]);

  //useEffect here

   const clickHandler = () => {
    setShowModal(true);
   };

  if (goBack) {
    return (
      <div>
        <Button className="backButton">Back</Button>

      <Button onClick={clickHandler}>Create {buttonName}</Button>

        <Table striped bordered hover>
          <tbody>

          {rows.map((data) => {
            return (
              <tr>
                <td>
                  <Button className="tableDataButton">{data.name}</Button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </Table>
        <ModalComponent showModal={showModal} 
                        setShowModal={(showModal) => setShowModal(showModal)} 
                        nameTag={buttonName}

                        rows={rows}
                        addRows={(rows) => addRows(rows)} />
      </div>
    );
  }

  return (
    <div>
      <Button onClick={clickHandler}>Create {buttonName}</Button>
      <Table striped bordered hover>
        <tbody>

        {rows.map((data) => {
          return (
            <tr>
              <td>
                <Button className="tableDataButton">{data.name}</Button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
        <ModalComponent showModal={showModal} 
                        setShowModal={(showModal) => setShowModal(showModal)} 
                        nameTag={buttonName} 
                        rows={rows}
                        addRows={(rows) => addRows(rows)} />
    </div>
  );
}
