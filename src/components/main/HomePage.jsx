import React, { useState } from 'react'
import MainBottom from '../include/MainBottom'
import MainHeader from '../include/MainHeader'
import "../css/main.css"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ChatbotButton from './ChatbotButton'
import config from './chatbot/config'
import ActionProvider from './chatbot/ActionProvider'
import MessageParser from './chatbot/MessageParser'
import Chatbot from 'react-chatbot-kit'
import "../css/chatbot.css"
const HomePage = () => {

  const token = useSelector(state => state.token);
  console.log(token);

  const [showChatbot, setShowChatbot] = useState(false);

  const handleClose = () => {
    setShowChatbot(false);
  };

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
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
                <li><Link to="/home">요양원소개</Link></li>
                  <li><Link to="/home">후원하기</Link></li>
                  <li><Link to="/home">요양원 소식</Link></li>
                  <li><Link to="/home">자료실</Link></li>
                  <li><Link to="/home">자원봉사</Link></li>
                  {showChatbot && (
                    <div className="chatbot-modal">
                      <div className="chatbot-modal-content">
                        <div className="chatbot-close-button" onClick={handleClose}>X</div>
                        <Chatbot
                          config={config}
                          actionProvider={ActionProvider}
                          messageParser={MessageParser}
                          handleNewUserMessage={handleNewUserMessage}
                          customStyles={{
                            botMessageBox: {
                              backgroundColor: '#fff', // 챗봇 말풍선의 배경색을 바꿉니다.
                              borderRadius: '10px', // 챗봇 말풍선의 모서리를 둥글게 만듭니다.
                            },
                            chatButton: {
                              backgroundColor: '#376B7E',
                            },
                            chatContainer: {
                              maxWidth: '400px', // 챗봇 모달 창의 최대 너비를 지정합니다.
                              padding: '20px',
                              borderRadius: '10px',
                              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // 챗봇 모달 창에 그림자 효과를 추가합니다.
                            },
                            userMessageBox: {
                              backgroundColor: '#376B7E',
                            },
                          }}
                          headerComponent={
                          <div className="chatbot-header">
                            <span>React Chatbot</span>
                          </div>}
                        />
                      </div>
                    </div>
                  )}
                  <li><ChatbotButton setShowChatbot={setShowChatbot}/></li>
              </ul>
          </div> 
        </div>
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
