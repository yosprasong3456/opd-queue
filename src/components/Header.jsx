import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" className="App">
      <Container>
        <Navbar.Brand
          className="App"
          onDoubleClick={()=> navigate("/admin")} 
        >
          {/* <img
            alt=""
            src="udch.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "} */}
          โรงพยาบาลมะเร็งอุดรธานี
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/queuehome")}
          >
            เลือกห้องบริการ |
          </Navbar.Text>
          <Navbar.Text
            style={{ cursor: "pointer", marginLeft: 6 }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard |
          </Navbar.Text>
          <Navbar.Text
            style={{ cursor: "pointer", marginLeft: 6 }}
            onClick={() => navigate("/queue")}
          >
            กดคิว
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
