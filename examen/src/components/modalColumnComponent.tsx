import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useState} from 'react';
import { Columns, CreateColumnData } from "../types/Columns";
import { SubmitHandler, useForm } from 'react-hook-form';
import { FloatingLabel, Form } from "react-bootstrap";


export type modalColumnProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    addColumn: React.Dispatch<React.SetStateAction<Columns[]>>;
    columns: Columns[];
}

export default function ModalColumnComponent(props : modalColumnProps){
    const { showModal, setShowModal, addColumn, columns } = props;
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateColumnData>();

    const handleChange = (event:any) => {
        setMessage(event.target.value);
    };

    const onSubmit: SubmitHandler<CreateColumnData> = data => {
       console.log(data)
       columns.push({columnName: data.name})
       addColumn([...columns])
       
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
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FloatingLabel controlId="floatingInput" label = "Name" className="mb-3">
                            <Form.Control placeholder="Name" type = "text" {...register("name")}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label = "Datatype" className="mb-3">
                            <Form.Select  {...register("datatype")}>
                                <option>select...</option>
                                <option value="VARCHAR(255)">Varchar (255)</option>
                                <option value="VARCHAR(100)">Varchar (100)</option>
                                <option value="VARCHAR(50)">Varchar (50)</option>
                                <option value="BOOLEAN">Boolean</option>
                                <option value="FLOAT">Float</option>
                                <option value="INT">Integer</option>
                                <option value="DATETIME">Date Time</option>
                                <option value="DATETIME DEFAULT CURRENT_TIMESTAMP">Date Time default to current time</option>
                            </Form.Select>
                        </FloatingLabel>
                        <Form.Group className="mb-3">
                            <Form.Check type = "checkbox">
                                <Form.Check.Input type= "checkbox" {...register("primaryKey")}/>
                             <Form.Check.Label>
                                PrimaryKey
                            </Form.Check.Label>
                            </Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="success">
                            Create
                        </Button>
                        <Button onClick = {()=>{setShowModal(false)}} variant="danger">
                          Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}