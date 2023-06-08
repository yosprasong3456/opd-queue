import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function Error() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Header />
      <h1 style={{ marginTop: 270 }}>ไม่พบหน้า</h1>
      <p>( last update : 2023.06.07 )</p>
      <a
        onClick={() => navigate("/queue")}
        style={{
          color: "blueviolet",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        กลับสู่หน้าหลัก
      </a>
    </div>
  );
}

export default Error;
