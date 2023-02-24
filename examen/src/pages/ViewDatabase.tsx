import Overview, { overviewProps } from "../components/overview";
import { createDatabases } from "../controllers/createDatabase";

const tableProps : overviewProps = {
    buttonName: 'Database',
    tableData: [{name : 'test'},{name: 'test1'}],
    goBack: false,
    getDataHandler: () => {},
    createDataHandler: createDatabases
};

export default function ViewDatabase(){
    return <Overview 
        buttonName={tableProps.buttonName} 
        tableData={tableProps.tableData} 
        goBack ={tableProps.goBack} 
        getDataHandler={tableProps.getDataHandler} 
        createDataHandler={tableProps.createDataHandler}
        />
}