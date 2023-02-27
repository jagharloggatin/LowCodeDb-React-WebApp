import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useState} from 'react';
import { TableData } from "../types/TableData";
import { Columns } from "../types/Columns";
import {FloatingLabel, Form} from 'react-bootstrap'
import { createDatabases } from "../controllers/createDatabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { NameData } from "../types/NameData";


export type modalProps = {
    nameTag: string;
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    addRows: React.Dispatch<React.SetStateAction<TableData[]>>;
    rows: TableData[];
    createDataHandler: Function;
}

export default function ModalComponent(props: modalProps){
    const { nameTag, showModal, setShowModal, addRows, rows, createDataHandler } = props;
    const { register, handleSubmit } = useForm<NameData>();

    const onSubmit: SubmitHandler<NameData> = async(data) => {
        console.log(data.name)
        if(data.name.length>0){
            await createDataHandler(data.name) 
            addRows([{name: data.name},...rows] as TableData[])  
        }else{
            alert("Your database name needs at least one character!")
        }
        setShowModal(false);
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
                 <Form onSubmit={handleSubmit(onSubmit)}>
                    <FloatingLabel controlId="floatingInput" label={nameTag + ' name'} className="mb-3">
                        <Form.Control placeholder={nameTag + ' name'} type="text" {...register("name")}/>
                    </FloatingLabel>
                     <Button type="submit" variant="success">
                         Create
                    </Button>
                    <Button variant="danger" onClick={()=>setShowModal(false)}>
                        Cancel
                    </Button>
                 </Form>
                </Modal.Body>
                <Modal.Footer>
 


                </Modal.Footer>
            </Modal>
        </div>
    )
}