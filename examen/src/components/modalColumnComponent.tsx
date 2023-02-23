import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useState} from 'react';
import { TableData } from "../types/TableData";


export type modalColumnProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    // addRows: React.Dispatch<React.SetStateAction<TableData[]>>;
    // rows: TableData[];
}

export default function ModalColumnComponent(props : modalColumnProps){
    const { showModal, setShowModal } = props;
    const [message, setMessage] = useState('');
      const handleChange = (event:any) => {
            setMessage(event.target.value);
        };
    return (
        <div>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>
                        Create column
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                 <input type="text"
                                        onChange={handleChange}/>
                            </td>
                            <td>Datatype:</td>
                            <td>
                                 <input type="text"
                                        onChange={handleChange}/>
                            </td>
                            <td>Primary Key:</td>
                            <td>
                                 <input type="checkbox"
                                        onChange={handleChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </Modal.Body>
                <Modal.Footer>
                     <Button onClick = {()=>{setShowModal(false)}}>
                        Cancel
                    </Button>

                    <Button>
                         Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}