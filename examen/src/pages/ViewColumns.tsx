import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColumnComponent from "../components/columnComponent";
import { getColumns } from "../controllers/getColumns";
import { Columns } from "../types/Columns";


export default function ViewColumns(){
    const params = useParams();
    const [columnData, setColumnData] = useState<Columns[]>([]);


    useEffect(()=> {
        getColumns(params.databaseName as string, params.tableName as string)
        .then((data) =>{
            if(data) setColumnData(data)
        })
    },[])
    
    return (
        <ColumnComponent columns={columnData} tableName = {params.tableName as string} databaseName={params.databaseName as string}/>
    )
}

