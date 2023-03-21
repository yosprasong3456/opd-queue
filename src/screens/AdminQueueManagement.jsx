import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { apiUrl } from "../constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Qmanagementtable from "../components/Qmanagementtable";
function AdminQueueManagement() {
  const [menu, setMenu] = useState(null);
  const [allQueue, setAllQueue] = useState([]);
  const [loading, setLoading] = useState(false)
  const getMenu = async () => {
    const { data } = await axios.get(`${apiUrl}opdConfigMenu.php`);
    if (data.message === "success") {
      console.log("set", data.data);
      setMenu(data.data.filter((data) => data.actived == 1 && data.id != 77));
      return;
    } else {
      return;
    }
  };

  const getAll = async () => {
    setLoading(true)
    const { data } = await axios.get(`${apiUrl}opdDeleteQueue.php`);
    console.log(data);
    if (data.message === "success") {
      setAllQueue(data.data);
      setLoading(false)
    }else{
        setLoading(false)
    }
  };

  useEffect(() => {
    getMenu();
    getAll();
  }, []);

  const deleteQueue = async (params) =>{
    const dataSet = {
        id : params.id,
        status : params.status == 0 ? '3' : '0'
    }
    
    const { data } = await axios.put(`${apiUrl}opdDeleteQueue.php`, dataSet);
    if (data.message === "success") {
        console.log("set", data.data);
        getAll();
        return;
      } else {
        alert('เกิดข้อผิดผลาด')
        return;
      }
  }

//   const checkType = (params) => {
//     const allQ = ;
//     return allQ
//   };
  return (
    <div className="App">
      {" "}
      <Header />
      <Row style={{ width: "100%", margin: "auto", marginTop: 20 }}>
        {menu &&
          menu.map((data, index) => {
            // const allQ = allQueue.filter((result)=> result.queue_type == data.id)
            return (
              <Col key={index}>
                <h4>{data.name}</h4>
                <Qmanagementtable
                  color={data.color_btn}
                  data={allQueue.filter((res) => res.queue_type == data.id)}
                  deleteFnc={deleteQueue}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default AdminQueueManagement;
