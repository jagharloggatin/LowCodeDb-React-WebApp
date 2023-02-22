import ColumnComponent from "../components/columnComponent";

export default function ViewColumns(){
    return (
        <ColumnComponent columns={[{columnName: 'column1'}, {columnName: 'column2'}]} tableName = 'TableName test'/>
    )
}