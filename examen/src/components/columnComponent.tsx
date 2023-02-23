import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Columns } from "../types/Columns";
import { Link } from 'react-router-dom';
import ModalColumnComponent from "./modalColumnComponent";
import { useState } from "react";

export type columnProps = {
    columns: Columns[];
    tableName: string;
}

export default function ColumnComponent(props: columnProps){
    const {columns, tableName} = props;
    const [showModal, setShowModal] = useState(false)
    const [newColumns, addColumns] = useState([...columns]);
    const clickHandler = ()=>{setShowModal(true); console.log(showModal)}

    //useEffect here

    return (
        <div>
            <h1>{tableName}</h1>
            <Link to="/tables">
                <Button className="backButton">Back</Button>
            </Link>
            <Button className="createButton" onClick={clickHandler}>Create column</Button>
            <Link to="/">
                 <Button className="backToMain">Back to main</Button>
            </Link>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        {columns.map((data) => {
                            return (
                                <th>
                                    {data.columnName}
                                </th>
                            );
                        })}
                    </tr>
                </tbody>
            </Table>
        <ModalColumnComponent 
            showModal = {showModal} 
            setShowModal= {(showModal) => setShowModal(showModal)} 
            columns={newColumns} 
            addColumn={(newColumns) => addColumns(newColumns)}
        />

        </div>
       
    )
}

