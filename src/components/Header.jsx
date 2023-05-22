import React from "react";
import Container from "react-bootstrap/Container";
import { Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" className="App">
      <Container>
        <Navbar.Brand className="App" onDoubleClick={() => navigate("/admin")}>
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
        <Navbar.Collapse className="justify-content-end" style={{marginRight: 30}}>
          <Navbar.Text
            // style={{ cursor: "pointer" }}
            // onClick={() => navigate("/queuehome")}
          >
            <NavDropdown title="ผู้ป่วยนอก">
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/queue")}
                style={{ color: "black" }}
              >
                กดคิว (OPD)
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/queuehome")}
                style={{ color: "black" }}
              >
                เลือกห้องบริการ (OPD)
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/dashboard")}
                style={{ color: "black" }}
              >
                Dashboard (OPD)
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Text>
          {/* <Navbar.Text
            style={{ cursor: "pointer", marginLeft: 6 }}
            onClick={() => navigate("/dashboard")}
          >
            | Dashboard |
          </Navbar.Text> */}
          <Navbar.Text
            style={{ marginLeft: 6 }}
            // onClick={() => navigate("/queue")}
          >
             <NavDropdown title="| เวชระเบียน ">
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/queueMR")}
                style={{ color: "black" }}
              >
                กดคิว (เวชระเบียน)
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/roomMR")}
                style={{ color: "black" }}
              >
                เลือกห้องบริการ (เวชระเบียน)
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/dashboardMR")}
                style={{ color: "black" }}
              >
                Dashboard (เวชระเบียน)
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Text>

          <Navbar.Text style={{ cursor: "pointer", marginLeft: 6 }}>
            <NavDropdown title="| ห้องยา ">
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/queue2")}
                style={{ color: "black" }}
              >
                กดคิว (D)
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/callq2")}
                style={{ color: "black" }}
              >
                เรียกคิว (D)
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#"
                onClick={() => navigate("/dashboard2")}
                style={{ color: "black" }}
              >
                Dashboard (D)
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
