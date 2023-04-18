import React, { useEffect, useState } from 'react';
import '../css/Modal.css';

const Modal = ({ modalOpen, onClose, date, timeSlots, onTimeClick }) => {
  document.body.style.overflow = "hidden";

  const [showModal, setShowModal] = useState(false);
  if (!timeSlots) {
    return null; // timeSlots가 없으면 화면에 아무것도 보여주지 않음
  }
  const handleModalClick = (event) => {//모달창 클릭해도 안닫게하기
  event.preventDefault();//이벤트버블링 막기
    if (event.target.classList.contains('modal')) {
      onClose();
      
    }
  };
 
  const handleOutsideClick = () => {
    setShowModal(false);
  };
  return (
    <div className="modal-container" style={{ display: modalOpen ? 'block' : 'none' }}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <h2>원하시는 시간대를 고르세요.</h2>
        </div>
        <div className="modal-content">
          <h2>{date && date.toLocaleDateString()}</h2>
          <ul className='modal-timetable'>
        {timeSlots.map((timeSlot,index) => (
          <li key={timeSlot.start} onClick={() => onTimeClick(timeSlot)} className={`time-slot${index}`}>
            {timeSlot.title}
          </li>
        ))}
      </ul>
      {showModal && <div className="modal-overlay" onClick={handleOutsideClick}></div>}
        </div>
        <div className="modal-footer">
          
          <button className='close-btn' onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
