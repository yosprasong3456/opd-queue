import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { apiUrl } from "../constants";
import { useNavigate } from "react-router-dom";
function RoomMR() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [counter, setCounter] = useState(null);
  // const getAll = async () => {
  //   const { data } = await axios.get(`${apiUrl}opdConfigMenu.php`);
  //   if (data.message === "success") {
  //     console.log("set", data.data);
  //     setMenu(
  //       data.data.filter(
  //         (data) => data.actived == 1 && data.id != 77 && data.id != 3
  //       )
  //     );
  //     setCounter(
  //       data.data.find(
  //         (data) => data.actived == 1 && data.id != 77 && data.id == 3
  //       )
  //     );

  //     return;
  //   } else {
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   getAll();
  // }, []);

  const counterMR = [
    { id: "1", name: "ช่องบริการที่ 1" },
    { id: "2", name: "ช่องบริการที่ 2" },
    { id: "3", name: "ช่องบริการที่ 3" },
    { id: "4", name: "ช่องบริการที่ 4" },
  ];

  return (
    <div>
      <Header />
      <div
        className="d-grid gap-2 App"
        style={{ padding: 20, justifyContent: "center" }}
      >
        <h1> เลือกห้องบริการ </h1>
        <h3> เวชระเบียน </h3>

        {counterMR.map((data, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: '#b4f8c8',
                padding: 20,
                fontSize: 20,
                cursor: "pointer",
                borderRadius: 5
              }}
              size="lg"
              onClick={() => {
                navigate("/callqMR/" + data.id);
              }}
            >
              {data.name}
            </div>
          );
        })}
        <hr />
      </div>
    </div>
  );
}



export default RoomMR;
