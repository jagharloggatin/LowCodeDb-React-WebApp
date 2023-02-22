import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


interface overviewProps {
    buttonName: string,
    tableData: object[],
    goBack: boolean,
}

export default function Overview(props: overviewProps) {
    const {buttonName, tableData, goBack} = props;

    //useEffect here
    if(goBack){
        return(
            <div>
                <Button className='backButton'>
                    Back
                </Button>

                <Button className='createButton'>
                    {buttonName}
                </Button>

                <Table striped bordered hover>
                    
                </Table>
            </div>
        )  
    }

    return (
        <div> 
            <Button>
                {buttonName}
            </Button>
        </div>
    );
}