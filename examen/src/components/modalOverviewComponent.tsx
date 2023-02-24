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
}

export default function ModalComponent(props: modalProps){
    const { nameTag, showModal, setShowModal, addRows, rows } = props;
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NameData>();

    const onSubmit: SubmitHandler<NameData> = async(data) => {
        console.log(data.name)
        if(data.name.length>0){
            await createDatabases(data.name) 
        }else{
            alert("Your database name needs at least one character!")
        }
     };
     
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
                 <Form onSubmit={handleSubmit(onSubmit)}>
                    <FloatingLabel controlId="floatingInput" label={nameTag + ' name'} className="mb-3">
                        <Form.Control placeholder={nameTag + ' name'} type="text" {...register("name")}/>
                    </FloatingLabel>
                     <Button type="submit" variant="success" onClick={async() => {
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
                <Modal.Footer>
 


                </Modal.Footer>
            </Modal>
        </div>
    )
}