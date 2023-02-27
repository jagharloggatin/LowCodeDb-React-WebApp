import { useParams } from "react-router-dom";
import ColumnComponent from "../components/columnComponent";

export default function ViewColumns(){

    const params = useParams();
    return (
        <ColumnComponent columns={[{columnName: 'column1'}, {columnName: 'column2'}]} tableName = {params.tableName as string} databaseName={params.databaseName as string}/>
    )
}