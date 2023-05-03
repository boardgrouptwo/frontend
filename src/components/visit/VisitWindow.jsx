import React, {  useEffect, useRef, useState } from 'react';
import '../css/visitwindow.css';
import { visitInsertDB } from '../../service/VisitDBLogic';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';

import moment from 'moment';
import Swal from 'sweetalert2';


const VisitWindow = ({ windowOpen, onClose, date, handleDateClick }) => {
  const isLogin = useSelector((state) => state.isLogin); //로그인정보 가져오기
  const userid = useSelector((state) => state.userid); //userid가져오기
  const [time, setTime] = useState("");
  const [volume, setVolume] = useState(1); // 기본값 1로 설정
  const [protector, setProtector] = useState("");
  const [reservationInfo, setReservationInfo] = useState([]); //예약시간담을 변수
  const [showWindow, setShowWindow] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [elder_no, setElder_no] = useState(1); // 아이디
  const [elder_id, setEledr_id] = useState(""); // 이름
  const [visit_time, setVisit_time] = useState(""); // 방문날짜
  const [visit_date, setVisit_date] = useState(""); // 방문날짜
  const [visit_no, setVisit_no] = useState(""); // 신청목적 선택 라디오 버튼
  const [visit_volume, setVisit_volume] = useState(""); // 방문인원
  const [protector_id, setProtector_id] = useState(""); //메모

  const navigate = useNavigate();

  useEffect(() => {
    console.log("date" + date);
    //로그인 한 사용자는 home으로 이동
    if (isLogin === true) {
      navigate("/loginError");
    }
  }, [date]);

  // 로그인 한 사용자의 정보를 가져와서 변수에 할당

  const timeSlots = [
    { title: "10:00", className: "time-slot0" },
    { title: "11:00", className: "time-slot1" },
    { title: "12:00", className: "time-slot2" },
    { title: "13:00", className: "time-slot3" },
    { title: "14:00", className: "time-slot4" },
    { title: "15:00", className: "time-slot5" },
    { title: "16:00", className: "time-slot6" },
    { title: "17:00", className: "time-slot7" },
  ];

  const title = () => {
    setSelectedTime(title);
  };

  //인원수 설정
  const handleIncrease = () => {
    if (volume < 8) {
      setVolume(volume + 1);
    }
    else {
    Swal.fire({
      icon: "success",
      title: "인원수는 8명까지만 선택 가능합니다.",
      showCancelButton: false,
      confirmButtonText: "확인",
  
    })
  }
}
  const handleDecrease = () => {
    if (volume > 1) setVolume(volume - 1);
  };
 


  

  //time 현재시간
  //date 면회 선택 시간
  const handleTimeSlotClick = (selTime) => {
    console.log(date);

    setSelectedTime(selTime); // 내가 선택한 시간
    console.log(selectedTime);
  };
  const dateString = new Date(date);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const koreanDate = dateString.toLocaleDateString("ko-KR", options);
  console.log("koreanDate : " + koreanDate);
  const visittime = selectedTime;
  const handleWindowClick = (event) => {
    event.preventDefault(); //버블링막기
    if (event.target.classList.contains("event")) {
      onClose();
    }
  };
  const handleOutsideClick = () => {
    setShowWindow(false);
  };

  //연결부위
  const [visitInfo, setVisitInfo] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!visittime) {
      Swal.fire({
        icon: "success",
        title: "면회 시간을 확인해 주세요",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })
      return;
    }
    if (!volume) {
      Swal.fire({
        icon: "warning",
        title: "인원수를 선택해 주세요",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })
      return;
    }
    const reservation = {
      // 모달창에서 입력한 정보를 visitInfo 상태에 업데이트
      elder_no: elder_no,
      elder_id: elder_id,
      visit_date: koreanDate,
      visit_time: visittime,
      visit_volume: volume,
      user_id: userid,
    };
    // 서버에 POST 요청을 보내어 visitInfo 정보를 DB에 저장
    const res = await visitInsertDB(reservation);
    onClose();
    if (res.data === 1) {
      Swal.fire({
        icon: "success",
        title: "면회신청 완료",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button",
        },
      });
      navigate("/mypage");
    }
  };

  return (
    <>
      <div
        className="window-container"
        style={{ display: windowOpen ? "flex" : "none" }}
      >
        <div className="window-overlay">
          <div className="window-header">
            <h2 className="window-title">원하시는 시간대를 고르세요.</h2>
            <button className="close-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="window-subtitle">
            <div className="selected-day-div">
              <h2 className="selected-day">
                {date && date.toLocaleDateString()}
              </h2>
            </div>
            <div className="selevted-time=-div">
              <h3 className="selected-time">선택한 시간:{selectedTime}</h3>
            </div>

            <div className="window-content">
              <ul className="window-timetable" style={{ paddingLeft: 0 }}>
                {timeSlots.map((timeSlot, index) => (
                  <li
                    key={timeSlot.title}
                    onClick={() => handleTimeSlotClick(timeSlot.title)}
                    className={`time-slot${index}`}
                  >
                    {timeSlot.title}
                  </li>
                ))}
              </ul>
              
              <div>
                <button onClick={handleDecrease}>-</button>
                <input
                  type="text"
                  className="dd-peoples"
                  value={`${volume}명`}
                  readOnly
                />
                <button onClick={handleIncrease}>+</button>
              </div>
            </div>
          </div>
          <div className="window-footer">
            <button className="btn-submit" onClick={handleSubmit}>
              면회신청
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitWindow;
