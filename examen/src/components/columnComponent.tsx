import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { Columns } from "../types/Columns";
import { Link } from 'react-router-dom';

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
            <Link to="/tables">
                <Button className="backButton">Back</Button>
            </Link>
            <Button className="createButton">Create column</Button>
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
        </div>
       
    )
}

