import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import "../App.css";
import ButtonQueue from "../components/ButtonQueue";
import axios from "axios";
import ModalPrint from "../components/ModalPrint";
import {
  FcSearch,
  FcShipped,
  FcSurvey,
  FcSmartphoneTablet,
  FcDeployment
} from "react-icons/fc";
import { apiUrl } from "../constants";
import { FcRefresh } from "react-icons/fc";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { useNavigate } from "react-router-dom";
import ModalPrint2 from "../components/ModalPrint2";

function PressQ2() {
  const [time, setTime] = useState(getTime());
  const [today, setToday] = useState(getToday())
  const [menu, setMenu] = useState(null);
  const [qData, setQData] = useState(null);
  const [type, setType] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [reload, setReload] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const getAll = async () => {
      const { data } = await axios.get(
        `${apiUrl}opdConfigMenu.php`
      );
      if (data.message === "success") {
        console.log("set", data.data);
        setMenu(data.data.filter((data) => data.id == 4 && data.id != 77));
        console.log(menu)
        return;
      } else {
        return;
      }
    };
    getAll();
  }, [reload]);

  const getQ = async (params = 0) => {
    setType(params);
    const { data } = await axios.post(
      `${apiUrl}opd2Queue.php`,
      { type: params }
    );
    console.log(data);
    if (data.status === "200") {
      setQData(data.data);
      setModalShow(true);
    } else {
      throw new console.error();
    }
  };
  const iconBtn = (params) => {
    switch (params) {
      case '1':
        return <FcShipped size={'1.6em'}/>
        case '2':
          return <FcSmartphoneTablet size={'1.6em'}/>
          case '3':
        return <FcSurvey size={'1.6em'}/>
      default:
        return <FcSearch size={'1.6em'}/>
    }
  }
 
  return (
    <div>
      {/* <Header /> */}
      <Container className="App">
        {/* <Row> */}
        <Row style={{textAlign: 'start', marginLeft : 20}}>
        <Col>
          <img onDoubleClick={()=> navigate('/')} src="/fulludch.png" alt="logo" width={300}/>

        </Col >
        <Col style={{textAlign: 'end'}}>
        <div className="clock-wrapper-queue">
          <span>{time.slice(0, 2)}</span>
          <span>:</span>
          <span>{`${time.slice(3, 6)}`}</span>
          <h5 style={{fontWeight : 'bold', marginTop: -20}}>{dayjs(today).locale('th').format('DD MMMM YYYY')}</h5>
        </div>
        
        </Col>
      </Row>
        <div className="centerDiv" style={{marginTop: '22%'}}>
        
          {menu &&
            menu.map((data, index) => {
              return (
                <ButtonQueue
                  key={index}
                  getQ={() => getQ(data.id)}
                  bgColor={data.color_btn}
                  title={`กดรับคิว ${data.name}`}
                  icon={<FcSurvey size={60}/>}
                />
              );
            })}
          {/* <FcRefresh size={70} onClick={() => setReload(!reload)} style={{cursor:'pointer'}}/> */}
          
          {qData && (
            <>
              <ModalPrint2
                show={modalShow}
                qData={qData}
                type={type}
                menu={menu}
                setType={() => setType()}
                setQData={() => setQData()}
                onHide={() => setModalShow(false)}
              />
            </>
          )}
        </div>
      </Container>
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
function getToday(){
  const d = new Date();
  const day = d.getDate();
  const mouth = parseInt(d.getMonth()) + 1;
  const year = parseInt(d.getFullYear()) + 543
  console.log(`year: ${year}-${mouth}-${day}`)
  return `${year}-${mouth}-${day}`
}


export default PressQ2