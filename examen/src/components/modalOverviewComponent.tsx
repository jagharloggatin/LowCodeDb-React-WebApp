import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { TableData } from "../types/TableData";
import { Columns } from "../types/Columns";
import { FloatingLabel, Form } from "react-bootstrap";
import { createDatabases } from "../controllers/createDatabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { NameData } from "../types/NameData";
import { useParams } from "react-router-dom";

export type modalProps = {
  nameTag: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addRows: React.Dispatch<React.SetStateAction<TableData[]>>;
  rows: TableData[];
  createDataHandler: Function;
  getDataHandler: Function;
};

export default function ModalComponent(props: modalProps) {
  const { nameTag, showModal, setShowModal, addRows, rows, createDataHandler, getDataHandler } =
    props;
  const { register, handleSubmit } = useForm<NameData>();
  const params = useParams();

  const onSubmit: SubmitHandler<NameData> = async (data) => {
    
    const trimName: string = data.name
      .trim()
      .replace(";","semicolon")
      .replace(" ", "_")
      .replace(/(\s|-|_|~)+/g, "_")
      .toLowerCase();

    if(parseInt(data.name)){
        alert("No numbers allowed!")
        return;
    }

    const dbOrTableNames: string[] = [];
    rows.map((row: TableData) => {
        dbOrTableNames.push(Object.values(row)[0]);
    });

    if(dbOrTableNames.includes(data.name)){
        alert('Name allready exists.')
        return
    }

    if (data.name.length > 0) {
      await createDataHandler(trimName, params.databaseName);
      const fetchedData = await getDataHandler(params.databaseName as string)
      addRows([...fetchedData] as TableData[]);
      alert(`${trimName} added in list!`)
    }
    else {
      alert("Your database name needs at least one character!");
    }

    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Create {nameTag}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel
              controlId="floatingInput"
              label={nameTag + " name"}
              className="mb-3"
            >
              <Form.Control
                placeholder={nameTag + " name"}
                type="text"
                {...register("name")}
              />
            </FloatingLabel>
            <Button type="submit" variant="success">
              Create
            </Button>
            <Button variant="danger" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
