import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useState} from 'react';
import { TableData } from "../types/TableData";
import { Columns } from "../types/Columns";
import {FloatingLabel, Form} from 'react-bootstrap'


export type modalProps = {
    nameTag: string;
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    addRows: React.Dispatch<React.SetStateAction<TableData[]>>;
    rows: TableData[];
}

export default function ModalComponent(props: modalProps){
    const { nameTag, showModal, setShowModal, addRows, rows } = props;
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
                 <Form>
                    <FloatingLabel controlId="floatingInput" label={nameTag + ' name'} className="mb-3">
                        <Form.Control placeholder={nameTag + ' name'} type="text"/>
                    </FloatingLabel>
                     <Button type="submit" variant="success" onClick={() => {
                        rows.push({name: message} as TableData)
                        addRows([...rows] as TableData[])
                        setShowModal(false);
                        }}>
                         Create
                    </Button>
                    <Button variant="danger" onClick={()=>setShowModal(false)}>
                        Cancel
                    </Button>
                 </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}