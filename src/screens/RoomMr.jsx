import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function RoomMR() {
  const navigate = useNavigate();

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
