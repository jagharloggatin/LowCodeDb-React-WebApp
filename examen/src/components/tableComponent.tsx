import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Columns } from "../types/Columns";
import ModalColumnComponent from "./modalColumnComponent";

export type columnProps = {
    columns: Columns[];
    tableName: string;
}

export default function tableComponent(props: columnProps){
    const {columns, tableName} = props;
    const [showModal, setShowModal] = useState(false)
    //useEffect here
    const clickHandler = ()=>{setShowModal(true); console.log(showModal)}

    return (
        <div>
            <Button className="backButton">Back</Button>
            <Button className="createButton" onClick={clickHandler}>Create column</Button>
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
           <ModalColumnComponent showModal = {showModal} setShowModal= {(showModal) => setShowModal(showModal)}/>
        </div>
       
    )


}

