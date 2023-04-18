import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from './Modal';
import '../css/FullCalendarMain.css'
import interactionPlugin from '@fullcalendar/interaction';
import MainHeader from '../include/MainHeader';



const FullCalendarMain = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // 모달 창 상태
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const timeSlots = [
      { title: '10:00', start: '2023-04-14T10:00:00', className: 'time-slot1' },
      { title: '11:00', start: '2023-04-14T11:00:00', className: 'time-slot2' },
      { title: '12:00', start: '2023-04-14T12:00:00', className: 'time-slot3' },
      { title: '13:00', start: '2023-04-14T13:00:00' , className: 'time-slot4'},
      { title: '14:00', start: '2023-04-14T14:00:00' , className: 'time-slot5'},
      { title: '15:00', start: '2023-04-14T15:00:00' , className: 'time-slot6'},
      { title: '16:00', start: '2023-04-14T16:00:00' , className: 'time-slot7'},
      { title: '17:00', start: '2023-04-14T17:00:00' , className: 'time-slot8'},
    ];
    setTimeSlots(timeSlots);
    console.log(timeSlots)
  }, []);


  const handleDateClick = (arg) => {//날짜 클릭 이벤트
    const clickedDate = new Date(arg.dateStr);
    setSelectedDate(clickedDate);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false); // 모달 창 닫기
    setSelectedDate(null); // 선택한 날짜 초기화
  };
  const handleTimeClick = (timeSlot) => {//면회시간 선택 이벤트
    setSelectedTime(timeSlot);
    handleCloseModal();
 
  };
  
  //timetable과 spring 연동 함수 만들기 axiosAn 
  //endpoint is a specific URL or web address that is used to access a specific resource or perform a specific action within a web application or API. In other words, an endpoint is the entry point or access point to an application or a specific part of an application that can be accessed by sending an HTTP request to a specific URL.

  return (
    <>
    <MainHeader/>
    
    <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]} 
    initialView="dayGridMonth"
    weekends={true}
    events={[events]}
    
    locale="ko" //월,일 한글화
    dateClick={handleDateClick} // 날짜 클릭 이벤트 handleDateClick 함수를 dateClick prop으로 전달
   
    
    />
  <Modal modalOpen={modalOpen}
        onClose={handleCloseModal}
        date={selectedDate}
        event={selectedTime}
        timeSlots={timeSlots}
        onTimeClick={handleTimeClick}>
        <div className="time-slots">
          <h3>시간 선택</h3>
          {timeSlots.map(slot => (
            <div key={slot} className="time-slot" onClick={() => handleTimeClick({ event:slot })}>
              {slot.title}
            </div>
          ))}
        </div>
      </Modal>
      </>
);
};

export default FullCalendarMain
