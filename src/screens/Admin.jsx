import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { SketchPicker, BlockPicker } from 'react-color'
import { apiUrl } from "../constants";
import { useNavigate } from "react-router-dom";
export default function Admin() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [show, setShow] = useState(false);
  const [menuPopup, setMenuPopup] = useState(null);
  const [menuInput, setMenuInput] = useState(null);
  const [defaultColor, setDefaultColor] = useState(null)
  const [btnShowColor, setBtnShowColor] = useState(false)
  const getAll = async () => {
    const { data } = await axios.get(
      `${apiUrl}opdConfigMenu.php`
    );
    if (data.message === "success") {
      console.log("set", data.data);
      setMenu(data.data);
      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const btnDeleteQueue =()=>{
    return (
      <Button variant="danger" style={{fontSize:25}} onClick={()=> navigate('/admin/queuemanagement')}>
        ลบคิว
      </Button>
    )
  }

  const updateActive = async (params) => {
    let dataSet = {
      id: params.id,
      inactive: params.actived == 1 ? 0 : 1,
    };
    const { data } = await axios.put(
      `${apiUrl}opdConfigMenu.php`,
      dataSet
    );
    if (data.message === "success") {
      console.log("set", data.data);
      getAll();
      return;
    } else {
      return;
    }
  };

  const updateMenu = (params) => {
    setMenuInput(params.name);
    setMenuPopup(params.id);
    setDefaultColor(params.color_btn)
    setShow(true);
    // alert(JSON.stringify(params))
  };

  const handleClose = () => {
    setMenuPopup(null);
    setMenuInput(null);
    setShow(false);
    setDefaultColor(null)
    setBtnShowColor(false)
  };

  const submitMenuName = async()=>{
    let dataSet = {
      id: menuPopup,
      menu: menuInput,
      color: defaultColor
    };
    console.log(dataSet)
    const { data } = await axios.post(
      `${apiUrl}opdConfigMenu.php`,
      dataSet
    );
    console.log(data)
    if (data.message === "success") {
      setMenuPopup(null)
      setMenuInput(null);
      setShow(false);
      setDefaultColor(null)
      setBtnShowColor(false)
      getAll();
      return;
    } else {
      return;
    }
  }

  const handleSelectColor = (color) => {
    setDefaultColor(color.hex)
  }
  const colors = ['#FBE7C6','#B4F8C8','#A0E7E5','#FFAEBC','#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8','#dddddd']
  return (
    <div className="App">
      <Header />
      <div style={{ width: "50%", margin: "auto", marginTop: 30 }}>
        <h1 style={{ padding: 20, fontWeight: "bold" }}>ตั้งค่า / {btnDeleteQueue()}</h1>
        
        <ListGroup as="ol">
          {menu &&
            menu.map((data, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  style={{backgroundColor : data.color_btn}}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold" style={{ fontSize: 30 }}>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => updateMenu(data)}
                      >
                        {data.name}
                      </span>
                      <span style={{ fontSize: 15 }}>
                        {" "}
                        {data.actived == 1 ? (
                          <span
                            style={{
                              padding: 2,
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: 5,
                            }}
                          >
                            เปิดใช้งานอยู่
                          </span>
                        ) : (
                          <span
                            style={{
                              padding: 2,
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: 5,
                            }}
                          >
                            ปิดใช้งานอยู่
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => updateActive(data)}
                    variant={data.actived == 1 ? "danger" : "success"}
                  >
                    {data.actived == 1 ? "ปิด" : "เปิด"}
                    {data.id == 77 ? "เสียง Dashboard" : null}
                  </Button>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        
      </div>
      {menuPopup && (
        <Modal show={show} onHide={handleClose} backdrop="static" className="App">
          <Modal.Header >
            <Modal.Title>แก้ไขชื่อเมนู</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="ชื่อเมนู"  value={menuInput} onChange={(e)=> setMenuInput(e.target.value)}/>
                {/* <Form.Text className="text-muted">
                  สามารถแก้ไขแล้วกดบันทึกได้เลย.
                </Form.Text> */}
              </Form.Group>
            </Form>
            <div onClick={()=> setBtnShowColor(!btnShowColor)} style={{backgroundColor: defaultColor, padding:10, width: 200, margin:'auto', borderRadius:5, cursor: 'pointer'}}>
              {btnShowColor ? "ปิดเลือกสี" : "เลือกสี Background"}
            </div>
            <div style={{margin:13}}/>
            {btnShowColor && <BlockPicker colors={colors} width="100%" color={defaultColor} onChangeComplete={(color)=> handleSelectColor(color)}/>}
            {/* {btnShowColor && <SketchPicker color={defaultColor} onChangeComplete={(color)=> handleSelectColor(color)}/>} */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              ปิด
            </Button>
            <Button variant="primary" onClick={submitMenuName}>
              บันทึก
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
