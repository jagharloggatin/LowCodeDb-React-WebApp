import OverView from '../components/overview'

export default function ViewTables(){
    return <OverView buttonName={'Create'} goBack={true} tableData={[{name: 'table1'}, {name: 'table2'}]} />
}