import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Qtable(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const roomQueue = (params) => {
    let room;
    if (params == 1) {
      room = "A";
    } else if (params == 2) {
      room = "B";
    } else {
      room = "1,2,3";
    }
    return room;
  };
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <Col>
      <h3
        style={{
          width: windowWidth / 3.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {props.title}
      </h3>
      <Table striped bordered hover className="qTable">
        <thead>
          <tr style={{ backgroundColor: props.color }}>
            <th>ลำดับคิว</th>
            <th>ช่อง</th>
            {/* <th>วันที่</th> */}
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.queue_no}</td>
                  <td>{roomQueue(data.queue_type)}</td>
                  {/*  <td>{changeDate(data.date)}</td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Col>
  );
}

function changeDate(params) {
  let date = params.split("-");
  let year = parseInt(date[0]) + 543;
  return `${date[2]}/${date[1]}/${year}`;
  // console.log(JSON.stringify(date))
}
export default Qtable;
