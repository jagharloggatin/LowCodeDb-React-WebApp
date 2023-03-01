import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Columns, CreateColumnData } from "../types/Columns";
import { SubmitHandler, useForm } from "react-hook-form";
import { FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { createColumn } from "../controllers/createColumn";
import { getColumns } from "../controllers/getColumns";

/**These are the properties for the ModalColumnComponent */
export type modalColumnProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addColumn: React.Dispatch<React.SetStateAction<Columns[]>>;
  columns: Columns[];
};

/** The ModalColumnComponent is a form that is linked directly to our database. 
 * It's purpose is to create a new column on the specified table in the specified database.
 * It takes modalColumnProps as properties. */
export default function ModalColumnComponent(props: modalColumnProps) {

  // we deconstruct our properties and use the useForm hook to register our data in an object
  const { showModal, setShowModal, addColumn, columns } = props;
  const {
    register,
    handleSubmit,
  } = useForm<CreateColumnData>();

  // we use the useParams hook to retrieve the parameters from the url (databaseName and tableName)
  const params = useParams();

  // The onSubmit handler is used to submit data from the form to our database (row 67). 
  // It also updates the rows on the ColumnComponent in row 74.
  // We run serveral checks on the data to secure our processes and to detect duplicate entries.
  const onSubmit: SubmitHandler<CreateColumnData> = async (data) => {

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

  // These are all bootstrap tags with the onSubmit handler on row 88.
  // on the rows 97, 105 and 121 we register our data with help of the useForm hook
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
