import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function RoomDrug() {
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
        <h3> เลือกห้องบริการ </h3>
        <h1> ห้องยา </h1>

        {counterMR.map((data, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: '#ffaebc',
                width:300,
                padding: 20,
                fontSize: 20,
                cursor: "pointer",
                borderRadius: 5
              }}
              onClick={() => {
                navigate("/callq2/" + data.id);
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



export default RoomDrug;
