import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../css/fullCalendarMain.css";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment/moment";
import MainHeader from "../include/MainHeader";
import VisitWindow from "./VisitWindow";

const FullCalendarMain = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [events, setEvents] = useState([]);
  const [windowOpen, setWindowOpen] = useState(false); // 모달 창 상태
  const [selectedDate, setSelectedDate] = useState(""); // 선택한 날짜
  const [selectedTime, setSelectedTime] = useState("");

  //지나간날짜 클릭 방지
  const yesterday = moment().subtract(1, "day");
  const valid = (currentDate) => {
    return currentDate.isAfter(yesterday);
  };

  
  const handleDateClick = (arg) => {
    const clickedDate = moment(arg.date);
    if (!valid(clickedDate)) {
      return;
    }
    console.log(clickedDate)
    const selectedDate = new Date(arg.dateStr);
    console.log()
    setSelectedDate(selectedDate);
    console.log("selectedDate"+arg.date)
    setWindowOpen(true);
  };

 //오늘 이전 날짜 투명도 조절
 const dayCellContent = (arg) => {
  let cellStyle = {};
  if (arg.date < yesterday) {
    cellStyle.opacity = 0.2; // 투명도
  }
  return (
    <div className="fc-daygrid-day" style={cellStyle}>
      {arg.dayNumberText}
    </div>
  );
};

  const handleCloseWindow = () => {
    setWindowOpen(false); // 모달 창 닫기
    setSelectedDate(null); // 선택한 날짜 초기화
  };
  
  const handleTimeClick = (timeSlot) => {
    //면회시간 선택 이벤트
    setSelectedTime(timeSlot);
    
  };
  const handleDateSelect = (selectInfo) => {
    const start = selectInfo.startStr;
    const end = selectInfo.endStr;
    console.log("start date: ", start);
    console.log("end date: ", end);
  };

  return (
    <>
    <MainHeader/>
    
    <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]} 
    dayCellContent={dayCellContent}
    initialView="dayGridMonth"
    weekends={true}
    events={[events]}
    height={"500px"}
    locale="ko" //월,일 한글화
    dateClick={handleDateClick} // 날짜 클릭 이벤트 handleDateClick 함수를 dateClick prop으로 전달
   
    
    />
  <VisitWindow windowOpen={windowOpen}
        onClose={handleCloseWindow}
        date={selectedDate}
        onTimeClick={handleTimeClick}
      >
      </VisitWindow>
    </>
  );
};

export default FullCalendarMain;
