import React, {  useEffect, useState } from 'react';
import '../css/visitwindow.css';
import { visitInsertDB } from '../../service/visitInsertDB';


const VisitWindow = ({ windowOpen, onClose, date }) => {
  document.body.style.overflow = "hidden";//스크롤 방지
  const [time,setTime]=useState('')
  const [volume,setVolume]=useState('')
  const [protector,setProtector]=useState('')
  const [reservationInfo,setReservationInfo]=useState([]);//예약시간담을 변수
  const [showWindow, setShowWindow] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlot,setTimeSlot]=useState('')
    // 로그인 한 사용자의 정보를 가져와서 변수에 할당
    const visit_no = "visit_no";
    const elder_id = "elder_id";
    const elder_no = "elder_no";
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
    const title =()=>{
      setSelectedTime(title);
    }
   
  const handleTimeSlotClick=(title)=>{
    setSelectedTime("");
    setSelectedTime(title);//내가 선택한 시간
    const selectedTime = new Date();//필요없는 값 잘라내기
    selectedTime.setHours(title.substring(0,2), 0, 0, 0);
    setTime(selectedTime.toLocaleDateString());
    console.log(title)
  }
  useEffect(() => {
    console.log(selectedTime);
  }, [selectedTime]);

  const handleWindowClick = (event) => {
    event.preventDefault();//버블링막기
      if (event.target.classList.contains('event')) {
        onClose();
      }  
  };
  const handleOutsideClick = () => {
  setShowWindow(false);
  };
 
     //연결부위
  const [visitInfo, setVisitInfo] = useState({})
  const visitInsert = async() => {
    const reservation={
    // 모달창에서 입력한 정보를 visitInfo 상태에 업데이트
      visit_no: visit_no,
      elder_no: elder_no,
      elder_id: elder_id,
      visit_date: time,
      visit_time: selectedTime,
      visit_volume: volume,
      protector_id: protector,
    }
    // 서버에 POST 요청을 보내어 visitInfo 정보를 DB에 저장
    const res = await visitInsertDB(reservation)
    onClose();
    window.location.reload();
  }

  
  return (
    
    <div className="window-container" style={{ display: windowOpen ? 'flex' : 'none' }}>
      <div className="window-overlay" >
        <div className="window-header">
          <h2 className='window-title'>원하시는 시간대를 고르세요.</h2>
          
      <button className='close-btn' onClick={onClose}>
        <i className="fas fa-times"></i></button>
        </div>
        <div className="window-content">
          <div className='selected-day-div'>
          <h2 className='selected-day'>{date && date.toLocaleDateString()}</h2>
          </div>
          <div className='selevted-time=-div'>
          <h3 className='selected-time'>선택한 시간:{selectedTime}</h3>
          </div>
          <ul className='window-timetable'>
          {timeSlots.map((timeSlot,index) => (
          <li 
            key={timeSlot.title} 
            onClick={() =>  handleTimeSlotClick(timeSlot.title) }
            className={`time-slot${index}`}>
            {timeSlot.title}
          </li>
        ))}
      </ul>  
        </div>
        </div>
        <div className="window-footer">
        
          <button className='btn-submit'onClick={() => visitInsert()}>면회신청</button>
        </div>
      </div>
   
  );
};

export default VisitWindow;
