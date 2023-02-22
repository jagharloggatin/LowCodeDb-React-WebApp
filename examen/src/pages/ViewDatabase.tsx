import Overview, { overviewProps } from "../components/overview";

const tableProps : overviewProps = {
    buttonName: 'Database',
    tableData: [{name : 'test'},{name: 'test1'}],
    goBack: false  
};

export default function ViewDatabase(){
    return <Overview buttonName={tableProps.buttonName} tableData={tableProps.tableData} goBack ={tableProps.goBack}/>
}