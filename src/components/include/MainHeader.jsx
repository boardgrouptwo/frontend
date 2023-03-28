import React, { useState } from 'react'
import "../css/header.css"
const MainHeader = () => {

  const [ style1, setStyle1 ] = useState({display: "none"})
  const [ style2, setStyle2 ] = useState({display: "none"})
  const [ style3, setStyle3 ] = useState({display: "none"})
  const [ style4, setStyle4 ] = useState({display: "none"})
  const [ style5, setStyle5 ] = useState({display: "none"})
  const [ style6, setStyle6 ] = useState({display: "none"})

  return (
    <>
      <div id="sh_hd_wrapper">
        <div id="topmenu_wrapper">
          <h1 id="top_logo">
            <a href="/home"><img src="../images/logo.png" /></a>
          </h1>
          
          <ul id="top_nav">  
            <li className="list01"                     
              onMouseEnter={e=>{setStyle1({display:"block"})}}
              onMouseLeave={e=>{setStyle1({display:"none"})}}>
              <a href="/home">요양원소개</a>
            </li>

            <li className="list02"
              onMouseEnter={e=>{setStyle2({display:"block"})}}
              onMouseLeave={e=>{setStyle2({display:"none"})}}>
              <a href="/home">사랑나눔</a>              
              <ul style={style2}>
                <li><a href="/home">후원</a> </li>
                <li><a href="/home">자원봉사신청</a> </li>
                <li><a href="/home">후원하기</a> </li>
              </ul>
            </li>

            <li className="list03"
              onMouseEnter={e=>{setStyle3({display:"block"})}}
              onMouseLeave={e=>{setStyle3({display:"none"})}}>
              <a href="/notice">요양원소식</a>
              <ul style={style3}>
                <li><a href="/notice">공지사항</a> </li>
                <li><a href="/home">월간일정표</a> </li>
                <li><a href="/home">식단표</a> </li>
                <li><a href="/home">QNA</a> </li>
              </ul>
            </li>

            <li className="list04"
              onMouseEnter={e=>{setStyle4({display:"block"})}}
              onMouseLeave={e=>{setStyle4({display:"none"})}}>
              <a href="/home">내정보</a>
              <ul style={style4}>
                <li><a href="/home">결제</a> </li>
                <li><a href="/home">결제내역</a> </li>
                <li><a href="/home">면회 신청</a> </li>
              </ul>
            </li>

            <li className="list03"
              onMouseEnter={e=>{setStyle5({display:"block"})}}
              onMouseLeave={e=>{setStyle5({display:"none"})}}>
            <a href="/home">로그인</a>
            <ul style={style5}>
              <li><a href="/home">회원가입</a> </li>
            </ul>
          </li>
          </ul> 
        </div>	
      </div>
    </>
  )
}

export default MainHeader
