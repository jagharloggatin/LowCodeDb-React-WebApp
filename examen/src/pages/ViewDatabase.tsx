import Overview, { overviewProps } from "../components/overview";
import { createDatabases } from "../controllers/createDatabase";
import { getDatabases } from "../controllers/getDatabases";

const tableProps : overviewProps = {
    buttonName: 'Database',
    tableData: [{name : 'test'},{name: 'test1'}],
    goBack: false,
    getDataHandler: () => {},
    createDataHandler: createDatabases
};

export default function ViewDatabase(){

    //Jonathan fixa det
    const databases = getDatabases().then();

    return <Overview 
        buttonName={tableProps.buttonName} 
        tableData={tableProps.tableData} 
        goBack ={tableProps.goBack} 
        getDataHandler={tableProps.getDataHandler} 
        createDataHandler={tableProps.createDataHandler}
        />
}