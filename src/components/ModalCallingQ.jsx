import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalCallingQ(props) {
  const [reset, setReset] = useState(false);
  useEffect(() => {
      setReset(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setReset(true);
    }, 9000);
    console.log("1", reset);
  }, [props]);
  const resetDashboard = () => {
    setReset(false);
    props.reCall(props.data, 5);
  };

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div style={{ textAlign: "center" }} className="App">
          <span style={{ fontSize: "5vw", fontWeight: 800 }}>
            {props.title ? props.title : "เชิญหมายเลข"}
          </span>
          <p style={{ fontSize: "15vw", fontWeight: 800 }} className="qBlink">
            {props.data && props.data.queue_no}
          </p>
          <p style={{ fontSize: "5vw", fontWeight: 800 }}>
            ที่ช่องบริการ {props.data && props.data.room}{" "}
          </p>
          {props.reset && reset && (
            <Button onClick={() => resetDashboard()}>🔁 Reset</Button>
          )}
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}


export default ModalCallingQ
