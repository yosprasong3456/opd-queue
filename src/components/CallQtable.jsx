import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

function CallQtable(props) {
  return (
    <Col>
      <h3>{props.title}</h3>
      <Table striped bordered hover>
        <thead>
          <tr style={{backgroundColor: props.color}}>
            <th>เลขคิว</th>
            <th>เวลากดคิว</th>
            <th>วันที่</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.queue_no}</td>
                  <td>{data.check_in}</td>
                  <td>{data.date}</td>
                  <td>
                    {props.btnReCall ? (
                      <>
                        <Button
                          disabled={props.disabled ? props.disabled : data.count > "2" ? true : false}
                          onClick={() => props.btnReCall(data)}
                          variant="warning"
                          style={{ marginRight: 5 }}
                        >
                          {props.btnReCallTitle} {data.count}
                        </Button>
                        <Button
                          disabled={data.count > "2" ? true : false}
                          onClick={() => props.btnAction(data)}
                        >
                          {props.btnTitle}
                        </Button>
                      </>
                    ) : (
                      <Button
                        disabled={props.disabled}
                        onClick={() => props.btnAction(data)}
                      >
                        {props.btnTitle}
                      </Button>
                    )}
                  </td>
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
  console.log(JSON.stringify(date));
}
export default CallQtable;
