import OverView from '../components/overview'
import { useState, useEffect } from 'react'
import { TableData } from '../types/TableData';
import { getTables } from '../controllers/getTables';
import { useParams } from "react-router-dom";
import {createTable} from "../controllers/createTable";

/**
 * Page to get and show all tables
 * @returns Overview
 */
export default function ViewTables(){
    const params = useParams();
    const [tableDataTest, setTableDataTest] = useState<TableData[]>([]);


    useEffect(()=> {
        getTables(params.databaseName as string)
        .then((data) =>{
            if(data) setTableDataTest(data)
        })
    },[])

    return <OverView 
        buttonName={'Table'} 
        goBack={true} 
        tableData={tableDataTest} 
        createDataHandler={createTable}
        getDataHandler={getTables}
    />
}