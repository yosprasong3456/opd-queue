import React from "react";
import { Col } from "react-bootstrap";
import "../App.css";
function ButtonQueue(props) {
  return (
    <Col
      className="buttonQueue"
      onClick={() => props.getQ()}
      style={{background: props.bgColor ? props.bgColor : '#ffffff'}}
    >
      {props.title} {props.icon}
    </Col>
  );
}

export default ButtonQueue;
