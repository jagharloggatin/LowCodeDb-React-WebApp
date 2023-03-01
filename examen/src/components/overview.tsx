import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { TableData } from "../types/TableData";
import ModalComponent from "./modalOverviewComponent";
import {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../styles/overView.css"
import {makeConnection} from "../controllers/makeConnection";

/** These are the properties used in Overview */
export type overviewProps = {
  buttonName: string;
  tableData: TableData[];
  goBack?: boolean;
  createDataHandler: Function;
  getDataHandler: Function;

}

/** Overview is used to create a table for databases on ViewDatabase and a table for tables on ViewTables.
 * It accepts a createDataHandler and a getDataHandler to handle our dataflow depending on which kind of data it should show (database names or table names).
 * 
*/
export default function Overview(props: overviewProps) {
  // we deconstruct our properties and use useState to set the visibility of our modal and to monitor the rows on our table
  const { buttonName, tableData, goBack, createDataHandler, getDataHandler} = props;
  const [showModal, setShowModal] = useState(false);
  const [rows, addRows] = useState([...tableData]);

  // we use useNavigate to navigate from one page to another
  const navigate = useNavigate();

  // we use useParams to retrieve parameters from the url (databaseName or tableName or both)
  const params = useParams();

  // useEffect to rerender the component when tableData changes
  useEffect(() => {
    console.log("render")
    if(tableData) addRows([...tableData])
  }, [tableData])

  // clickHandler to make a connection to our database and to show our modal
   const clickHandler = async() => {
    await makeConnection()
    setShowModal(true);
   };

   // clickHandler to navigate to ViewTables
   const openTableView = (database: string) => {
      navigate(`/tables/${database}`)
   }

   // clickHandler to navigate to ViewColumns
   const openColumnView = (database: string, table: string) => {
      console.log(database, table)
      navigate(`/columns/${database}/${table}`)
   }

   // depending on the boolean goBack we render the component for databases (goBack=false) or tables (goBack=true)
   // The ModalComponents take in our createDataHandler and our getDataHandler to process the data we add on them.
   // They also share the same state as our overview component to update the table entries
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
                  <Button className="tableDataButton" onClick={() => openColumnView(params.databaseName as string, data.name)}>{data.name}</Button>
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
                        getDataHandler = {getDataHandler}
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
                <Button className="tableDataButton" onClick={() => openTableView(data.name)}>{data.name}</Button>
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
                        getDataHandler = {getDataHandler}
                        addRows={(rows) => addRows(rows)} />
        </Card.Body>
    </Card>
  );
}
