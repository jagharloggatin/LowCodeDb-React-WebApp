import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Columns, CreateColumnData } from "../types/Columns";
import { SubmitHandler, useForm } from "react-hook-form";
import { FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { createColumn } from "../controllers/createColumn";
import { getColumns } from "../controllers/getColumns";

export type modalColumnProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addColumn: React.Dispatch<React.SetStateAction<Columns[]>>;
  columns: Columns[];
};

export default function ModalColumnComponent(props: modalColumnProps) {
  const { showModal, setShowModal, addColumn, columns } = props;
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateColumnData>();
  const params = useParams();

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  const onSubmit: SubmitHandler<CreateColumnData> = async (data) => {
    console.log(data);
    console.log(data.datatype);
    if (data.datatype === "select...") {
      alert("please select a datatype!");
      return;
    }
    const trimName: string = data.name
      .trim()
      .replace(";","semicolon")
      .replace(" ", "_")
      .replace(/(\s|-|_|~)+/g, "_")
      .toLowerCase();

    const columnNames: string[] = [];
    columns.map((column: Columns) => {
      columnNames.push(Object.values(column)[0]);
    });

    if(parseInt(data.name)){
        alert("No numbers allowed!")
        return;
    }

    if (columnNames.includes(data.name)) {
      alert("Column name taken!");
      return;
    }

    data.name = trimName;

    await createColumn(
      params.tableName as string,
      params.databaseName as string,
      data
    );
    const columnData: Columns[] = await getColumns(params.databaseName as string, params.tableName as string) as Columns[]

    addColumn([...columnData]);

    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Create column</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                placeholder="Name"
                type="text"
                {...register("name")}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Datatype"
              className="mb-3"
            >
              <Form.Select {...register("datatype")}>
                <option>select...</option>
                <option value="VARCHAR(255)">Varchar (255)</option>
                <option value="VARCHAR(100)">Varchar (100)</option>
                <option value="VARCHAR(50)">Varchar (50)</option>
                <option value="BOOLEAN">Boolean</option>
                <option value="FLOAT">Float</option>
                <option value="INT">Integer</option>
                <option value="DATETIME">Date Time</option>
                <option value="DATETIME DEFAULT CURRENT_TIMESTAMP">
                  Date Time default to current time
                </option>
              </Form.Select>
            </FloatingLabel>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox">
                <Form.Check.Input type="checkbox" {...register("primaryKey")} />
                <Form.Check.Label>PrimaryKey</Form.Check.Label>
              </Form.Check>
            </Form.Group>
            <Button type="submit" variant="success">
              Create
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
              }}
              variant="danger"
            >
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
