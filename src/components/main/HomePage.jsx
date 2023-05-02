import React, { useState } from 'react'
import MainBottom from '../include/MainBottom'
import MainHeader from '../include/MainHeader'
import "../css/main.css"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainChatbot from './MainChatbot'
import '../css/chatbot.css'



const HomePage = () => {

  const token = useSelector(state => state.token);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <MainHeader/>
        <div className="main_banner">
            <p className="move_txt01"><i>행복한 삶의</i> 새로운 시작을<br />함께하는<span>  KH 요양원</span></p>
            <p className="move_txt02">
                환자의 마음을 살피는 자세를 기본으로 시대에 발맞춘 고품질의 의료서비스를 제공합니다.
            </p>
        </div> 
        <div className="main_info_link">
          <div className="info">
            <i>진료예약 및 문의</i>
              <strong>02-1234-5678</strong>
              <span>일요일·공휴일은 휴진입니다.</span>
              <dl>
                <dt>평일</dt>
                  <dd>오전 09:00 - 오후 06:00</dd>
              </dl>
          </div>
          <div className="link">
            <p>Link Service</p>
              <ul>
                  <li><Link to="/notice?page=1">공지사항</Link></li>
                  <li><Link to="/calendar">월간일정표</Link></li>
                  <li><Link to="/qna?page=1">QNA</Link></li>
                  <li><Link to="/sponsor/from">후원하기</Link></li>
                  <li><Link to="/service/from">봉사신청</Link></li>
                  <li><Link onClick={handleOpenModal}>챗봇</Link></li>
              </ul>
          </div> 
        </div>
          {showModal && (
            <div className="chatbotdiv">
              <MainChatbot handleCloseModal={handleCloseModal} />
            </div>
          )}
          
        <img src="images/main2.png" 
        style={{
          top: "370px",
          width:"100%", 
          height: "700px",
          position: "absolute", 
          zIndex: "-1",
          margin: "0",
          padding: "0"}}/>
      <MainBottom/>
    </>
  )
}

export default HomePage
