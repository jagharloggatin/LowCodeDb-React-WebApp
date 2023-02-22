import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useState} from 'react';


export type modalProps = {
    nameTag: string;
    showModal: boolean
}

export default function ModalComponent(props: modalProps){
    const { nameTag, showModal } = props;

    const [show, setShow] = useState(showModal);

    return (
        <div>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>
                        Create {nameTag}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <table>
                     <tr>
                        <td>{nameTag}:</td>
                        <td>
                            <input type="text"/>
                        </td>
                    </tr>
                </table>
                </Modal.Body>
                <Modal.Footer>
                     <Button onClick={()=>setShow(false)}>
                        Cancel
                    </Button>

                    <Button>
                         Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}