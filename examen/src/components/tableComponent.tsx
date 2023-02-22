import React from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Columns } from "../types/Columns";

export type columnProps = {
    columns: Columns[];
    tableName: string;
}

export default function tableComponent(props: columnProps){
    const {columns, tableName} = props;

    //useEffect here

    return (
        <div>
            <Button className="backButton">Back</Button>
            <Button className="createButton">Create column</Button>
            <Table striped bordered hover>
                <tr>
                    {columns.map((data) => {
                        return (
                            <th>
                                {data.columnName}
                            </th>
                        );
                    })}
                </tr>
            </Table>
        </div>
       
    )


}

