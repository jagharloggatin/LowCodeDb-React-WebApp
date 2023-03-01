import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TableData } from "../types/TableData";
import { FloatingLabel, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { NameData } from "../types/NameData";
import { useParams } from "react-router-dom";

/** These are the properties for the ModalComponent */
export type modalProps = {
  nameTag: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addRows: React.Dispatch<React.SetStateAction<TableData[]>>;
  rows: TableData[];
  createDataHandler: Function;
  getDataHandler: Function;
};

/** The ModalComponent is a form to add a database in MySQl or to add a table on a database.
 *  It takes in a shared state with the parent component (overview) as well as a createDataHandler and a getDataHandler.
 */
export default function ModalComponent(props: modalProps) {
  //we deconstruct our properties
  const { nameTag, showModal, setShowModal, addRows, rows, createDataHandler, getDataHandler } =
    props;
  // we use useForm to register our data in an object
  const { register, handleSubmit } = useForm<NameData>();
  // we use useParams to retrieve the parameters from the url (databaseName and tableName)
  const params = useParams();

  // the onSubmit handler runs serveral checks on our registered data to secure our processes and to detect duplicate entries.
  // it also creates database entries on row 58 and updates our frontend table in row 59
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

  // we add serveral bootstrap tags to create the form
  // we add the onSubmit handler to the form on row 80
  // we register the database/table name on row 89
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
