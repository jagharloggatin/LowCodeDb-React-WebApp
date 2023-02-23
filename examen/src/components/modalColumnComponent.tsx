import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useState} from 'react';
import { TableData } from "../types/TableData";
import { FloatingLabel, Form } from "react-bootstrap";


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
                    <Form>
                        <FloatingLabel controlId="floatingInput" label = "Name" className="mb-3">
                            <Form.Control type = "text"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label = "Datatype" className="mb-3">
                            <Form.Control type = "text"/>
                        </FloatingLabel>
                        <Form.Group className="mb-3">
                            <Form.Check type = "checkbox">
                                <Form.Check.Input type= "checkbox"/>
                             <Form.Check.Label>
                                PrimaryKey
                            </Form.Check.Label>
                            </Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="success">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                     <Button onClick = {()=>{setShowModal(false)}} variant="danger">
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}