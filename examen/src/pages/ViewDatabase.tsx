import { useEffect, useState } from "react";
import Overview, { overviewProps } from "../components/overview";
import { createDatabases } from "../controllers/createDatabase";
import { getDatabases } from "../controllers/getDatabases";
import { DatabaseObject } from "../types/DatabaseObject";
import { TableData } from "../types/TableData";

const tableProps : overviewProps = {
    buttonName: 'Database',
    tableData: [{name : 'test'},{name: 'test1'}],
    goBack: false,
    createDataHandler: createDatabases,
    getDataHandler: getDatabases
};

export default function ViewDatabase(){
    const [tableDataTest, setTableDataTest] = useState<TableData[]>([]);

    useEffect(()=> {
        getDatabases()
        .then((data) =>{
            if(data) setTableDataTest(data)
        })
    },[])

    console.log(tableDataTest)
    return <Overview 
        buttonName={tableProps.buttonName} 
        tableData={tableDataTest} 
        goBack ={tableProps.goBack}  
        createDataHandler={tableProps.createDataHandler}
        getDataHandler={tableProps.getDataHandler}
        />
}