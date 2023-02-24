import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { TableData } from "../types/TableData";
import ModalComponent from "./modalOverviewComponent";
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../styles/overView.css"
import {makeConnection} from "../controllers/makeConnection";

export type overviewProps = {
  buttonName: string;
  tableData: TableData[];
  goBack?: boolean;
  getDataHandler: Function;
  createDataHandler: Function;
}

export default function Overview(props: overviewProps) {
  const { buttonName, tableData, goBack , getDataHandler, createDataHandler} = props;
  const [showModal, setShowModal] = useState(false);
  const [rows, addRows] = useState([...tableData]);

  //useEffect here

   const clickHandler = async() => {
    await makeConnection()
    setShowModal(true);
   };

  if (goBack) {
    return (
      <Card style={{width : "50%", margin : "auto"}}>
        <Card.Header>
          <Button variant = "success" onClick={clickHandler}>Create {buttonName}</Button>
           <Link to="/">
           <Button variant = "danger" className="backButton">Back</Button>
        </Link>
        </Card.Header>
        <Card.Body>
        <Table striped bordered hover>
          <tbody>

          {rows.map((data) => {
            return (
              <tr>
                <td style={{justifyContent : "center", width : "100%"}}>
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
                        createDataHandler={createDataHandler}
                        getDataHandler={getDataHandler}
                        rows={rows}
                        addRows={(rows) => addRows(rows)} />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card style={{width : "50%", margin : "auto"}}>
      <Card.Header>
          <Button variant = "success" onClick={clickHandler}>Create {buttonName}</Button>
      </Card.Header>
      <Card.Body>    
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
                        createDataHandler={createDataHandler}
                        getDataHandler={getDataHandler}
                        addRows={(rows) => addRows(rows)} />
        </Card.Body>
    </Card>
  );
}
