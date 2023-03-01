import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Columns } from "../types/Columns";
import { Link } from "react-router-dom";
import ModalColumnComponent from "./modalColumnComponent";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

/** These are the properties we use to create a ColumnComponent */
export type columnProps = {
  columns: Columns[];
  tableName: string;
  databaseName: string;
};

/**The Columncomponent shows all columns from the specified table. It takes columnProps as properties.
 * Column props are: tableName: string, databaseName: string, columns: Columns[]
 */
export default function ColumnComponent(props: columnProps) {
  //we deconstruct our properties and use useState to handle intern component states
  const { columns, tableName, databaseName } = props;
  const [showModal, setShowModal] = useState(false);
  const [newColumns, addColumns] = useState([...columns]);
  
  //the clickHandler allows us to show the modal when the create column button is clicked
  const clickHandler = () => {
    setShowModal(true);
    console.log(showModal);
  };

  //useEffect renders the ColumnComponent when columns get an update
  useEffect(() => {
    if(columns) addColumns([...columns])
  }, [columns])

  //this is the bootstrap syntax of the component with css style 
  //on row 46 we add the clickHandler to our button
  //we itterate over our newColumns data to generate the table headers on row 56
  //we add a ModalColumComponent on row 64 that shows after clicking the createButton on row 46
  //the ModalColumnComponent shares a state with the ColumnComponent. 
  //This is to make sure that the data added in the ModalColumnComponent gets updated on the ColumnComponent.
  return (
    <Card style = {{width: '70%', margin: 'auto'}}>
      <Card.Header>
        <h1 style = {{margin: 'auto', width:"fit-content"}}>{tableName}</h1>
        <Link to={"/tables/" + databaseName}>
          <Button variant = 'danger' className="backButton">Back</Button>
        </Link>
        <Button variant = 'success' className="createButton" onClick={clickHandler}>
          Create column
        </Button>
        <Link to="/">
          <Button variant = 'warning' className="backToMain">Back to main</Button>
        </Link>
      </Card.Header>
      <Card.Body style={{overflowX: "scroll"}}>
        <Table striped bordered hover >
          <tbody>
            <tr >
              {newColumns.map((data) => {
                return <th>{data.columnName}</th>;
              })}
            </tr>
          </tbody>
        </Table>
        <ModalColumnComponent
          showModal={showModal}
          setShowModal={(showModal) => setShowModal(showModal)}
          columns={newColumns}
          addColumn={(newColumns) => addColumns(newColumns)}
        />
      </Card.Body>
    </Card>
  );
}
