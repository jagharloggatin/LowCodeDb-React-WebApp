import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Columns } from "../types/Columns";

export type columnProps = {
    columns: Columns[];
    tableName: string;
}

export default function ColumnComponent(props: columnProps){
    const {columns, tableName} = props;

    //useEffect here

    return (
        <div>
            <h1>{tableName}</h1>
            <Button className="backButton">Back</Button>
            <Button className="createButton">Create column</Button>
            <Button className="backToMain">Back to main</Button>
            <Table striped bordered hover>
                <tbody>

                <tr>
                    {columns.map((data) => {
                        return (
                            <thead>
                                {data.columnName}
                            </thead>
                        );
                    })}
                </tr>
                    </tbody>
            </Table>
        </div>
       
    )
}

