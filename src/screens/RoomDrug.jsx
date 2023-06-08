import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function RoomDrug() {
  const navigate = useNavigate();

  const counterMR = [
    { id: "1", name: "การเงิน ช่องบริการที่ 1", color:'#FBE7C6' },
    { id: "2", name: "การเงิน ช่องบริการที่ 2", color:'#FBE7C6' },
    { id: "3", name: "ห้องยา ช่องบริการที่ 3", color: '#ffaebc' },
    { id: "4", name: "ห้องยา ช่องบริการที่ 4", color: '#ffaebc' },
  ];
  return (
    <div>
      <Header />
      <div
        className="d-grid gap-2 App"
        style={{ padding: 20, justifyContent: "center" }}
      >
        <h3> เลือกห้องบริการ </h3>
        <h1> การเงิน </h1>

        {counterMR.filter((val)=> val.id == 1 || val.id == 2).map((data, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: data.color,
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
        <h1> ห้องยา </h1>
        {counterMR.filter((val)=> val.id == 3 || val.id == 4).map((data, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: data.color,
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
      </div>
    </div>
  );
}



export default RoomDrug;
