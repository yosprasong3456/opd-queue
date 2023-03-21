import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ModalCallingQ(props) {

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div style={{ textAlign: "center" }} className="App">
          <span style={{ fontSize: 100, fontWeight: 800 }}>{props.title ? props.title : 'เชิญหมายเลข'}</span>
          <p style={{ fontSize: 200, fontWeight: 800 }} className="qBlink">
            {props.data && props.data.queue_no}
          </p>
          <p style={{ fontSize: 50, fontWeight: 800 }}>ที่ช่องบริการ {props.data && props.data.room} </p>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default ModalCallingQ;
