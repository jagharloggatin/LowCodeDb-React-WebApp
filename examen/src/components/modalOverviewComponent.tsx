import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useState} from 'react';
import { TableData } from "../types/TableData";


export type modalProps = {
    nameTag: string;
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    addRows: React.Dispatch<React.SetStateAction<TableData[]>>;
    rows: TableData[];
}

export default function ModalComponent(props: modalProps){
    const { nameTag, showModal, setShowModal, addRows: setContent, rows } = props;
    const [message, setMessage] = useState('');
      const handleChange = (event:any) => {
            setMessage(event.target.value);
        };
    return (
        <div>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>
                        Create {nameTag}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <table>
                    <tbody>
                        <tr>
                            <td>{nameTag}:</td>
                            <td>
                                 <input type="text"
                                        onChange={handleChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </Modal.Body>
                <Modal.Footer>
                     <Button onClick={()=>setShowModal(false)}>
                        Cancel
                    </Button>

                    <Button onClick={() => {
                        rows.push({name: message})
                        setContent([...rows])
                        setShowModal(false);
                        }}>
                         Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}