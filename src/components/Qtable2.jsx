import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Qtable2(props) {
  return (
    <Col>
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
                  <td>D</td>
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
export default Qtable2;
