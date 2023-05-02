import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import interactionPlugin from "@fullcalendar/interaction";
import MainHeader from "../include/MainHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scheduleListDB } from "../../service/ScheduleDBLogic";
import ScheduleRow from "./ScheduleRow";

const SchedulePage = ( ) => {
const user = useSelector(state => state.user_type); 
  //월간일정 메인
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const [memoList, setMemoList] = useState([]);
  const navigate = useNavigate();
  const role = useState();
  const [cal_title, setCal_title] = useState(0);
  const [cal_writer, setCal_writer] = useState(0);
  const [cal_content, setCal_content] = useState("");
  const [cal_start, setCal_start] = useState("");
  const [cal_end, setCal_end] = useState("");
  const [cal_no, setCal_no] = useState("");
const [scheduleList, setScheduleList] =  useState([])
  //오늘 이전 날짜 비활성화
  const yesterday = moment().subtract(1, "day");
  const valid = (current) => {
    return current.isAfter(yesterday);
  };
  const dayCellContent = (arg) => {
    let cellStyle = {};
    if (arg.date < yesterday) {
      cellStyle.opacity = 0.2; //투명도
    }
    return (
      <div className="fc-daygrid-day" style={cellStyle}>
        {arg.dayNumberText}
      </div>
    );
  };
  const user_type = useSelector((state) => state.user_type);

  const handleDateClick = (arg) => {
    console.log(arg.dateStr);
    if (user_type === "admin") {
      navigate("/memo");
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleEnd = (date) => {
    console.log(date)
    const cal_end = moment(date).format("YYYY-MM-DD, a h:mm");
    console.log(date)
    setCal_end(cal_end);
  };
  const handleStart = (date) => {
    const cal_start = moment(date).format("YYYY-MM-DD, a h:mm");
    setCal_start(cal_start);
  };

  let [rawEvents,setRawEvents]=useState([]);
 
  const handleFetchScheduleList = async () => {
    try {
      const res = await scheduleListDB({ user }, token);
      console.log(res.data)
      //return res.data
      
     let events = res.data.map((item) => ({
      
        title: item.cal_title,
       date: item.cal_start,
        //end: item.cal_end,
        content:item.cal_content
      }));
      console.log(events) 
      setRawEvents(events);
      //console.log({events})
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    console.log(rawEvents)
  },[handleFetchScheduleList])
  
  const [events,setEvents]=useState([])
  
  useEffect(() => {
    handleFetchScheduleList();
  }, []);
  
  const handleEventMouseEnter = (info) => {
    const eventEl = info.el;
    const title = info.event.title;
    const start = info.event.start;
    const end = info.event.end;
    const content = info.event.extendedProps.content;
    const popupEl = document.createElement("div");
    popupEl.classList.add("event-popup");
    popupEl.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
    `;
    eventEl.appendChild(popupEl);
  };

 const handleEventClick =()=>{
  if (user_type === 'admin') {
    navigate('/memo');
  }
 }
  const handleEventMouseLeave = (info) => {
    const eventEl = info.el;
    const popupEl = eventEl.querySelector(".event-popup");
    eventEl.removeChild(popupEl);
  };
  return (
    <>
      <MainHeader />

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayCellContent={dayCellContent}
        weekends={true}
        locale="ko"
        events={rawEvents}
       
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        height={"700px"}
        eventClick={handleEventClick}
      />
    </>
  );
};

export default SchedulePage;
