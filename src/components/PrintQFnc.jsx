import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import "dayjs/locale/th";
import axios from "axios";
import { apiUrl } from "../constants";

function PrintQFnc(props) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [callWait, setCallWait] = useState(null);
  const [rePrint, setrePrint] = useState(false);
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Queue",
    onAfterPrint: () => handleClosePrint(),
  });

  useEffect(() => {
    getAll();
    const date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour < 10) {
      hour = "0" + date.getHours();
    }
    if (minutes < 10) {
      minutes = "0" + date.getMinutes();
    }
    setTime(`${date.getHours()}:${date.getMinutes()}`);
    setDate(
      dayjs(
        `${date.getFullYear()}-${parseInt(
          date.getMonth() + 1
        )}-${date.getDate()}`
      )
        .locale("th")
        .add(543, "year")
        .format("DD MMMM YYYY")
    );
    setTimeout(() => {
      handlePrint();
    }, 1500);
  }, []);

  useEffect(() => {
    if (rePrint) {
      console.log("rePrint");
      handlePrint();
    }
  }, [rePrint, setrePrint]);

  const getAll = async () => {
    setCallWait(null);
    let typeQ = props.type;
    console.log(typeQ);
    const { data } = await axios.get(`${apiUrl}opdmrQueue.php`);
    console.log(data);
    if (data.message === "success") {
      let result_wait = data.data.filter((data) => data.status == 0);

      setCallWait(result_wait.length);

      return;
    } else {
      return;
    }
  };

  function handleClosePrint() {
    if (rePrint) {
      props.setType(null);
      props.setQData(null);
    } else {
      setrePrint(true);
    }
  }

  return (
    <div>
       <img
          src="/fulludch.png"
          alt="logo"
          width={200}
          style={{ paddingTop: 20 }}
        />
        <hr />
      <div
        ref={componentRef}
        style={{ textAlign: "center", paddingBottom: 20 }}
        className="App"
      >
        <h6>การเงินนอก</h6>
        <h1 style={{ fontSize: 40 }}>{props.queue}</h1>
      </div>
    </div>
  );
}

export default PrintQFnc;
