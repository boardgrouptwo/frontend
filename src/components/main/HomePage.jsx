import React from 'react'
import MainBottom from '../include/MainBottom'
import MainHeader from '../include/MainHeader'
import "../css/main.css"
import { useSelector } from 'react-redux'
const HomePage = () => {

  const token = useSelector(state => state.token);
  console.log(token);


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
            <li><a href="/home">요양원소개</a></li>
              <li><a href="/home">후원하기</a></li>
              <li><a href="/home">요양원 소식</a></li>
              <li><a href="/home">자료실</a></li>
              <li><a href="/home">자원봉사</a></li>
              <li><a href="/home">공지사항</a></li>
          </ul>
      </div> 
    </div>
{/*     <div style=
    {{width:"2000px", height: "500px"
      ,position: "absolute"
      ,top: "400px"
      ,left: "0px"
      ,margin: "0"
      ,padding: "0"
    }}> 
  </div> */}
      <img src="images/main.jpg" 
      style={{
        top: "370px",
        width:"100%", 
        height: "700px",
        position: "absolute", 
        zIndex: "-1",
        margin: "0",
        padding: "0"}}/>


{/*     <div>
      <img src="images/main.jpg" 
      style={{width:"100%", 
      position: "absolute", margin: "0"
      ,padding: "0"}}/>
    </div> */}
      <MainBottom/>
    </>
  )
}

export default HomePage
