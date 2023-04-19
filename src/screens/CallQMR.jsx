import React, { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Qtable from "../components/Qtable";
import { Button } from "react-bootstrap";
import CallQtable from "../components/CallQtable";
import ModalCallingQ from "../components/ModalCallingQ";
import { apiUrl } from "../constants";
import ModalCallingQMR from "../components/ModalCallingQMR";
// import { callNewVoice } from "../components/fncCall";

function CallQMR() {
  const match = useMatch("/callqMR/:id");
  const [room, setRoom] = useState(null);
  const [count, setCount] = useState(0);
  const [calledQ, setCalledQ] = useState([]);
  const [callWait, setCallWait] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [showQ, setShowQ] = useState(null);
  const [callQ, setCallQ] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [soundConfig, setSoundConfig] = useState(null);
  const [menu, setMenu] = useState(null);
  const [callingQueue, setCallingQueue] = useState(null);
  const [openTable, setOpenTable] = useState(true);
  const [noQueue, setNoQueue] = useState(null);
  const [typeQueue, setTypeQueue] = useState(null)
  useEffect(() => {
    getAll();
    // getMenu();
  }, [match]);

  const getAll = async () => {
    let typeQ = match.params.id 
    
    if(match.params.id !='1' && match.params.id !='2' && match.params.id !='4'){
      typeQ = 3
      setTypeQueue(typeQ)
    }
    const { data } = await axios.get(
      `${apiUrl}opdmrQueue.php?room=2`
    );
    if (data.message === "success") {
      // let countRow = data.data.length;
      let result_called = data.data.filter(
        (data) => data.status == 1 || data.status == 2
      );
      let result_wait = data.data.filter((data) => data.status == 0);
      console.log(result_called)
      setCalledQ(
        result_called.sort(function (a, b) {
          return b.queue_no.substr(1, 3) - a.queue_no.substr(1, 3);
        })
      );
      setCallWait(result_wait);

      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getAll();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCalled();
      getSoundConfig();
    }, 2000);
    return () => clearInterval(interval);
  }, [soundConfig]);

//   async function getMenu() {
    // let typeQ = match.params.id 
    
    // if(match.params.id !='1' && match.params.id !='2' && match.params.id !='4'){
    //   typeQ = 3
    // }
    // const { data } = await axios.get(`${apiUrl}opdConfigMenu.php`);
    // if (data.message === "success") {
    //   let result = data.data.find((data) => data.id == typeQ);
    //   console.log("set", result);
    //   setMenu(result);
    //   return;
    // } else {
    //   return;
    // }
//   }

  async function getSoundConfig() {
    const { data } = await axios.get(`${apiUrl}opdConfigMenu.php`);
    // console.log("sound", data);
    if (data.message === "success") {
      let result = data.data.filter((data) => data.id == 77);
      // console.log(data.data.filter((data) => data.id == 77));
      // console.log(soundConfig)
      if (soundConfig) {
        if (soundConfig.actived != result[0].actived) {
          // window.location.reload(false)
          // console.log("if");
          setSoundConfig(result[0]);
        }
      } else {
        setSoundConfig(result[0]);
        // console.log("else", soundConfig);
      }
    } else {
      return;
    }
  }

  async function getCalled() {
    const { data } = await axios.get(`${apiUrl}opdmrCallQ.php`);
    if (data.message === "success") {
      // console.log(data);
      if (!callQ) {
        setDisabled(true);
        setModalShow(true);
        setShowQ(data.data);
      }
    } else {
      setDisabled(false);
      setModalShow(false);
      setShowQ(null);
      return;
    }
  }

  const callQFnc = async (params) => {
    const count = parseInt(params.count) + 1;
    let room = match.params.id
    const dataSet = {
      id: params.id,
      status: 2,
      count: count,
      room: room
    };
    // params.room = room
    // setCount(dataSet)
    const { data } = await axios.put(`${apiUrl}opdmrQueue.php`, dataSet);
    console.log("callQfnc", data);
    getAll();
    callSound(params, 0 , room);
    console.log("data", data);
  };

  const callQBack = async (params) => {
    const dataSet = {
      id: params.id,
      status: 0,
    };
    const { data } = await axios.put(`${apiUrl}opdmrQueue.php`, dataSet);
    getAll();
    // callSound(params);
    // console.log("data", data);
  };

  const callNewVoice = (params, called = 0) => {
    const message = new SpeechSynthesisUtterance(params);
    message.lang = "th-TH";
    message.rate = 0.6;
    message.volume = 1;
    message.onend = function (e) {
      if (called) {
        callAgain(params);
      }
    };
    speechSynthesis.speak(message);
  };

  const callAgain = (params, room) => callSound(params , 1, room);

  function callSound(params = 0, call = 0, room) {
    console.log("callsound", params);

    if (params) {
      console.log('params',params);
      setModalShow(true);
      setShowQ(params);

      if (soundConfig.actived == 0) {
        console.log("sound counter");
        let text4 = room;
          console.log("sound dashboard");
          console.log("sound counter");
          const audio = new Audio("/audio/call.mp3");
          const audio1 = new Audio(`/audio/${params.queue_no.charAt(0)}.mp3`);
          const audio2 = new Audio(`/audio/${params.queue_no.charAt(1)}.mp3`);
          const audio3 = new Audio(`/audio/${params.queue_no.charAt(2)}.mp3`);
          const audio4 = new Audio(`/audio/${params.queue_no.charAt(3)}.mp3`);
          const audio5 = new Audio(`/audio/${text4}.mp3`);
          const service = new Audio(`/audio/service.mp3`);
          const audioEnd = new Audio(`/audio/endcall.mp3`);

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
            // callAgain(params)
            if (!call) {
              callAgain(params, room)
            }
          });
      } else {
        console.log("sound to dashboard");
      }

      return;
    }
  }


  const colorBtn = ["", "#FBE7C6", "#B4F8C8", "#A0E7E5", "#FFAEBC"];

  // const newVoice =()=>{
  //   callNewVoice()
  // }

  const newCallQueue = () => {
    console.log(callWait[0]);
    if (callWait.length) {
      setCallingQueue(callWait[0]);
      callQFnc(callWait[0]);
      console.log(count);
    } else {
      console.log("no queue");
      setNoQueue("ไม่มีคิว");
      setTimeout(() => {
        setNoQueue(null);
      }, 4000);
    }
  };

  const newCalledQueue = () => {
    console.log("call", callingQueue);
    const result = calledQ.find((val) => val.id == callingQueue.id);
    callQFnc(result);
  };

  const endCallQueue = () => {
    setCallingQueue(null);
  };

  function getCounter() {
    if (callingQueue) {
      const res = calledQ.find((val) => (val.id = callingQueue.id));
      console.log("res", res);
      // return res.count
      if (res) {
        return res.count;
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="App">
        <h1 style={{ paddingTop: 20 }}>เวชระเบียน ช่องบริการที่ {match.params.id}</h1>
        <hr />
        <h1>เรียกคิวอัตโนมัติ</h1>
        <h1 style={{ marginBottom: 20 }}>
          กำลังเรียกคิว :{" "}
          {callingQueue && (
            <span className="callingQueue">
              <b>{callingQueue.queue_no}</b>
            </span>
          )}
        </h1>

        {/* <Button style={{ margin: 5 }} onClick={() => newCallQueue()}>
          เรียกคิว
        </Button> */}

        {callingQueue ? (
          <>
            <Button
              variant="warning"
              style={{ margin: 5, padding: 20, fontSize: 30 }}
              // disabled={soundConfig ? false : true}
              // disabled={!soundConfig ? true : getCounter() > 2 ? true : false}
              onClick={() => newCalledQueue()}
            >
              เรียกซ้ำ
            </Button>
            <Button
              variant="success"
              style={{ margin: 5, padding: 20, fontSize: 30 }}
              onClick={() => endCallQueue()}
            >
              จบคิว
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ margin: 5, padding: 20, fontSize: 30 }}
              onClick={() => newCallQueue()}
              disabled={soundConfig ? false : true}
            >
              เรียกคิว
            </Button>
            {noQueue && (
              <h2 style={{ backgroundColor: "red", color: "white" }}>
                {noQueue}
              </h2>
            )}
          </>
        )}
        {callWait.length > 0 ? <p>จำนวนที่รอคิว : {callWait.length}</p> : <p>ไม่มีคิว</p>}
        <hr />
        <h1>
          เรียกคิวแบบตาราง{" "}
          <Button
            variant={openTable ? "danger" : "warning"}
            onClick={() => setOpenTable(!openTable)}
          >
            {openTable ? "ปิด" : "เปิด"}
          </Button>
        </h1>
        {openTable ? (
          <Row style={{ width: "100%", margin: "auto" }}>
            <Col>
              <CallQtable
                color={colorBtn[typeQueue]}
                data={callWait}
                title="รอคิว"
                btnAction={callQFnc}
                btnTitle="เรียกคิว"
                disabled={callingQueue ? true : soundConfig ? false : true}
              />
            </Col>
            <Col>
              <Col>
                <CallQtable
                  color={colorBtn[typeQueue]}
                  data={calledQ}
                  title="เรียกคิวแล้ว"
                  btnAction={callQBack}
                  btnTitle="รอคิว"
                  btnReCall={callQFnc}
                  btnReCallTitle="เรียกซ้ำ"
                  disabled={callingQueue ? true : soundConfig ? false : true}
                />
              </Col>
            </Col>
          </Row>
        ) : (
          "ปิดใช้งาน"
        )}
      </div>
      <ModalCallingQMR show={modalShow} data={showQ} title="กำลังเรียกคิว" />
    </div>
  );
}


export default CallQMR;
