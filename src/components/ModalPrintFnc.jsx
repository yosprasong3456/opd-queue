import React, { useEffect,useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { FcPrint } from "react-icons/fc";
import '../App.css'
import PrintQFnc from "./PrintQFnc";
function ModalPrintFnc(props) {
   
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='App'
    >
      <Modal.Header style={{justifyContent: 'center'}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontWeight:'bold'}}>
            รอปริ้นบัตรคิว <FcPrint size={50}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="https://icons8.com/preloaders/preloaders/15/No%20trespassing.gif" alt=""/>
        <PrintQFnc queue={props.qData} setQData={()=> props.setQData()} setType={()=> props.setType()} type={props.type} menu={props.menu}/>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
export default ModalPrintFnc;