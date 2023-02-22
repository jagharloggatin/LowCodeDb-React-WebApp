import { type } from "os";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { TableData } from "../types/TableData";
import ModalComponent from "./modalComponent";
import {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";


export type overviewProps = {
  buttonName: string;
  tableData: TableData[];
  goBack: boolean;
}

export default function Overview(props: overviewProps) {
  const { buttonName, tableData, goBack } = props;

  const [showModal, setShowModal] = useState(false);

  //useEffect here
  useEffect( () => {
    console.log('render');
    console.log(showModal);
  }, [showModal])

   const clickHandler = () => {
    setShowModal(true);
    console.log('showing modal?')
   };

  if (goBack) {
    return (
      <div>
        <Button className="backButton">Back</Button>

      <Button onClick={clickHandler}>Create {buttonName}</Button>

        <Table striped bordered hover>
          <tbody>

          {tableData.map((data) => {
            return (
              <tr>
                <td>
                  <Button className="tableDataButton">{data.name}</Button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </Table>
        <div>

              <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>
                        Create {buttonName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <table>
                     <tr>
                        <td>{buttonName}:</td>
                        <td>
                            <input type="text"/>
                        </td>
                    </tr>
                </table>
                </Modal.Body>
                <Modal.Footer>
                     <Button onClick={()=>setShowModal(false)}>
                        Cancel
                    </Button>

                    <Button>
                         Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={clickHandler}>Create {buttonName}</Button>
      <Table striped bordered hover>
        <tbody>

        {tableData.map((data) => {
          return (
            <tr>
              <td>
                <Button className="tableDataButton">{data.name}</Button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
        <div>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>
                        Create {buttonName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <table>
                     <tr>
                        <td>{buttonName}:</td>
                        <td>
                            <input type="text"/>
                        </td>
                    </tr>
                </table>
                </Modal.Body>
                <Modal.Footer>
                     <Button onClick={()=>setShowModal(false)}>
                        Cancel
                    </Button>

                    <Button>
                         Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
  );
}
