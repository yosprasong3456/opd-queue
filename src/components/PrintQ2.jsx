import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import "dayjs/locale/th";
import axios from "axios";
import { apiUrl } from "../constants";

function PrintQ2(props) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  // const [callWait, setCallWait] = useState(null);
  const [rePrint, setrePrint] = useState(false);
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Queue",
    onAfterPrint: () => handleClosePrint(),
  });

  useEffect(() => {
    // getAll();
    setrePrint(false);
    const date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour < 10) {
      hour = "0" + date.getHours();
    }
    if (minutes < 10) {
      minutes = "0" + date.getMinutes();
    }
    setTime(`${hour}:${minutes}`);
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

  // const getAll = async () => {
  //   setCallWait(null);
  //   let typeQ = props.type;
  //   console.log(typeQ);
  //   const { data } = await axios.get(`${apiUrl}opd2Queue.php`);
  //   console.log(data);
  //   if (data.message === "success") {
  //     let result_wait = data.data.filter((data) => data.status == 0);

  //     setCallWait(result_wait.length);

  //     return;
  //   } else {
  //     return;
  //   }
  // };

  function handleClosePrint() {
    if (rePrint) {
      props.setType(null);
      props.setQData(null);
    } else {
      setrePrint(true);
    }
  }

  const typeCheck = (params) => {
    const menu = props.menu.filter((data) => data.id == params);
    console.log(menu);
    let room = "D";
    return `${room} : ${menu[0].name}`;
  };

  return (
    <div
      ref={componentRef}
      style={{ textAlign: "center", paddingBottom: 20 }}
      className="App"
    >
      <h6>ห้องยานอกและการเงิน</h6>
      <h1 style={{ fontSize: 30, paddingTop: 1 }}>{props.queue}</h1>
    </div>
  );
}

export default PrintQ2;
