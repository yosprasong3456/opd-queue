import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { apiUrl } from "../constants";
import { useNavigate } from "react-router-dom";
function QueueHome() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [counter, setCounter] = useState(null);
  const getAll = async () => {
    const { data } = await axios.get(`${apiUrl}opdConfigMenu.php`);
    if (data.message === "success") {
      console.log("set", data.data);
      setMenu(
        data.data.filter(
          (data) => data.actived == 1 && data.id != 77 && data.id != 3
        )
      );
      setCounter(
        data.data.find(
          (data) => data.actived == 1 && data.id != 77 && data.id == 3
        )
      );

      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const counterNurse = [
    { id: "c1", name: "ช่องบริการที่ 1" },
    { id: "c2", name: "ช่องบริการที่ 2" },
    { id: "c3", name: "ช่องบริการที่ 3" },
    { id: "c4", name: "ช่องบริการที่ 4" },
  ];

  return (
    <div>
      <Header />
      <div
        className="d-grid gap-2 App"
        style={{ padding: 20, justifyContent: "center" }}
      >
        <h1> เลือกห้องบริการ </h1>

        {menu &&
          menu.map((data, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: data.color_btn,
                  padding: 20,
                  fontSize: 20,
                  cursor: "pointer",
                }}
                size="lg"
                onClick={() => {
                  navigate("/callq/" + data.id);
                }}
              >
                {data.name}
              </div>
            );
          })}
        <hr />
        {counter && <p>เลิอก Counter : {counter.name}</p>}
        {counter &&
          counterNurse.map((data, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: counter.color_btn,
                  padding: 20,
                  fontSize: 20,
                  cursor: "pointer",
                }}
                size="lg"
                onClick={() => {
                  navigate("/callq/" + data.id);
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

export default QueueHome;
