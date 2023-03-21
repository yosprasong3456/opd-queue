import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
function Qmanagementtable(props) {
  return (
    <Col>
      <Table striped bordered hover>
        <thead>
          <tr style={{backgroundColor: props.color}}>
            <th>ลำดับคิว</th>
            <th>สถานะคิว</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {props.data &&
            props.data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.queue_no}</td>
                  <td>{data.status == 0 ? 'รอคิว' : 'ยกเลิกคิว'}</td>
                  <td><Button onClick={()=> props.deleteFnc(data)} variant={data.status == 0 ? 'danger' : 'primary'}>{data.status == 0 ? 'ยกเลิกคิว' : 'รอคิว'}</Button></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Col>
  );
}

export default Qmanagementtable;
