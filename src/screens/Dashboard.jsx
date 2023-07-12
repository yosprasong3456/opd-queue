import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Qtable from "../components/Qtable";
import axios from "axios";
import ModalCallQ from "../components/ModalCallQ";
import { apiUrl } from "../constants";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useNavigate } from "react-router-dom";
import { readQueue } from "../components/fncCall";
import { btnFullScreen } from "../components/FullScreen";

function Dashboard() {
  const [time, setTime] = useState(getTime());
  const [modalShow, setModalShow] = React.useState(false);
  const [showQ, setShowQ] = useState(null);
  const [callQ, setCallQ] = useState(false);
  const [menu, setMenu] = useState(null);
  const [soundConfig, setSoundConfig] = useState(null);
  const [allQueue, setAllQueue] = useState(null);
  const [today, setToday] = useState(getToday());
  const navigate = useNavigate();
  useEffect(() => {
    let timer1 = setInterval(() => {
      setTime(getTime());
      setToday(getToday());
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, [time]);

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

  useEffect(() => {
    btnFullScreen()
    getMenu();
     
  }, []);

  useEffect(() => {
    const getAll = async () => {
      const { data } = await axios.get(`${apiUrl}opdQueue.php`);
      console.log(data);
      if (data.message === "success") {
        setAllQueue(data.data);
      }
    };
    const id = setInterval(() => {
      getAll(); // <-- (3) invoke in interval callback
    }, 10000);
    getAll();
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCalled();
      getSoundConfig();
    }, 2000);
    return () => clearInterval(interval);
  }, [soundConfig]);

  async function getSoundConfig() {
    const { data } = await axios.get(`${apiUrl}opdConfigMenu.php`);
    if (data.message === "success") {
      let result = data.data.filter((data) => data.id == 77);
      // console.log(data.data.filter((data) => data.id == 77));
      // console.log(soundConfig)
      if (soundConfig) {
        if (soundConfig.actived != result[0].actived) {
          // window.location.reload(false)
          console.log("if");
          setSoundConfig(result[0]);
        }
      } else {
        setSoundConfig(result[0]);
        console.log("else", soundConfig);
      }
    } else {
      return;
    }
  }

  async function getCalled() {
    const { data } = await axios.get(`${apiUrl}opdCallQ.php`);
    if (data.message === "success") {
      console.log(data);
      if (!callQ) {
        setCallQ(true);
        setShowQ(data.data);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    if (ModalCallQ) {
      // console.log('callQ')
      callQFnc(showQ);
      return;
    } else {
      throw new console.error();
    }
  }, [callQ]);

  async function callQFnc(params = 0, call = 0) {
    if (params) {
      setModalShow(true);
      console.log("params", params);
      if (soundConfig) {
        if (soundConfig.actived == 1) {
          let text4 = params.room;
          console.log("sound dashboard");
          console.log("sound counter");
          const audio = new Audio("https://opd-queue.udch.work/audio/call.mp3");
          const audio1 = new Audio(
            `https://opd-queue.udch.work/audio/${params.queue_no.charAt(0)}.mp3`
          );
          const audio2 = new Audio(
            `https://opd-queue.udch.work/audio/${params.queue_no.charAt(1)}.mp3`
          );
          const audio3 = new Audio(
            `https://opd-queue.udch.work/audio/${params.queue_no.charAt(2)}.mp3`
          );
          const audio4 = new Audio(
            `https://opd-queue.udch.work/audio/${params.queue_no.charAt(3)}.mp3`
          );
          const audio5 = new Audio(
            `https://opd-queue.udch.work/audio/${text4}.mp3`
          );
          const service = new Audio(
            `https://opd-queue.udch.work/audio/service.mp3`
          );
          const audioEnd = new Audio(
            `https://opd-queue.udch.work/audio/endcall.mp3`
          );

          audio.play();
          audio.addEventListener("ended", function () {
            audio1.play();
          });
          audio1.addEventListener("ended", function () {
            audio2.play();
          });
          audio2.addEventListener("ended", function () {
            audio3.play();
          });
          audio3.addEventListener("ended", function () {
            audio4.play();
          });
          audio4.addEventListener("ended", function () {
            service.play();
          });
          service.addEventListener("ended", function () {
            audio5.play();
          });
          audio5.addEventListener("ended", function () {
            audioEnd.play();
          });
          audioEnd.addEventListener("ended", function () {
            updateQ(params);
            // console.log("Hello world");
            // if (!call) {
            //   updateQ(params, 1);
            // } else {
            //   updateQ(params);
            // }
          });
        } else {
          setTimeout(() => {
            updateQ(params);
          }, 8000);
        }
      }
      // console.log("params", text1, text2, text3, text4, params.queue_type);

      // return;
    }
  }

  async function updateQ(params, call = 0) {
    console.log("updateQ");
    if (call) {
      callQFnc(params, 1);
    } else {
      const dataSet = {
        id: params.id,
        status: 1,
        room: params.room,
        count: "",
      };
      const { data } = await axios.put(`${apiUrl}opdQueue.php`, dataSet);
      console.log("update", data);
      setModalShow(false);
      setShowQ(null);
      setCallQ(false);
    }
  }

  return (
    <div className="App">
      {/* <Header /> */}
      <Row style={{ textAlign: "start", margin: 0 }}>
        <Col>
          <img
            onClick={() => navigate("/")}
            src="/fulludch.png"
            alt="logo"
            width={500}
          />
        </Col>
        <Col style={{ textAlign: "end" }}>
          <div className="clock-wrapper" style={{}}>
            <span>{time.slice(0, 2)}</span>
            <span>:</span>
            <span>{`${time.slice(3, 6)}`}</span>
            <h3 style={{ fontWeight: "bold", marginTop: -20 }}>
              {dayjs(today).locale("th").format("DD MMMM YYYY")}
            </h3>
          </div>
        </Col>
      </Row>
      {/* <h1 style={{ padding: 20 }}>Dashboard Queue</h1> */}

      <Row style={{ width: "100%", margin: "auto", marginTop: 20 }}>
        {menu &&
          allQueue &&
          menu.map((data, index) => {
            return (
              <Col key={index} xs={4}>
                <Qtable
                  color={data.color_btn}
                  title={data.name}
                  data={allQueue.filter((val) => val.queue_type == data.id)}
                />
              </Col>
            );
          })}
        {/* <Col>
          {qType1 && (
            <Qtable title="รับ - ส่งต่อ" data={qType1} reload={reload} />
          )}
        </Col>
        <Col>
          {qType2 && (
            <Qtable title="ตรวจสุขภาพมีนัดแล้ว" data={qType2} reload={reload} />
          )}
        </Col>
        <Col>
          {qType3 && (
            <Qtable title="ตรวจสุขภาพไม่มีนัด" data={qType3} reload={reload} />
          )}
        </Col>
        <Col>
          {qType4 && (
            <Qtable title="ตรวจรักษาโรค" data={qType4} reload={reload} />
          )}
        </Col> */}
      </Row>
      <ModalCallQ
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={showQ}
      />
    </div>
  );
}

function getTime() {
  const d = new Date();
  const hour = d.getHours();
  const min = d.getMinutes();
  let result_min;
  let result_hour;
  if (hour < 10) {
    result_hour = `0${hour}`;
  } else {
    result_hour = hour;
  }
  if (min < 10) {
    result_min = `0${min}`;
  } else {
    result_min = min;
  }
  return `${result_hour}:${result_min}`;
}
function getToday() {
  const d = new Date();
  const day = d.getDate();
  const mouth = parseInt(d.getMonth()) + 1;
  const year = parseInt(d.getFullYear()) + 543;
  // console.log(`year: ${year}-${mouth}-${day}`)
  return `${year}-${mouth}-${day}`;
}

export default Dashboard;
