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
            <a href="/"><img src="http://care1001.shiningcorp.com/sh_img/hd/top_menu/logo.png" /></a>
          </h1>
          
          <ul id="top_nav">  
            <li className="list01"                     
              onMouseEnter={e=>{setStyle1({display:"block"})}}
              onMouseLeave={e=>{setStyle1({display:"none"})}}>
              <a href="/home">요양원소개</a>
              <ul style={style1}>
                <li><a href="/home">인사말</a> </li>
                <li><a href="/home">시설안내</a> </li>
                <li><a href="/home">오시는길</a> </li>
              </ul>
            </li>

            <li className="list02"
              onMouseEnter={e=>{setStyle2({display:"block"})}}
              onMouseLeave={e=>{setStyle2({display:"none"})}}>
              <a href="/home">서비스안내</a>              
              <ul style={style2}>
                <li><a href="/home">요양서비스</a> </li>
                <li><a href="/home">노인장기요양보험</a> </li>
              </ul>
            </li>

            <li className="list03"
              onMouseEnter={e=>{setStyle3({display:"block"})}}
              onMouseLeave={e=>{setStyle3({display:"none"})}}>
              <a href="/home">이용방법</a>
              <ul style={style3}>
                <li><a href="/home">이용방법</a> </li>
                <li><a href="/home">비용안내</a> </li>
              </ul>
            </li>

            <li className="list04"
              onMouseEnter={e=>{setStyle4({display:"block"})}}
              onMouseLeave={e=>{setStyle4({display:"none"})}}>
              <a href="/home">요양원소식</a>
              <ul style={style4}>
                <li><a href="/home">공지사항</a> </li>
                <li><a href="/home">자료실</a> </li>
                <li><a href="/home">가족 소통방</a> </li>
              </ul>
            </li>

            <li className="list03"
              onMouseEnter={e=>{setStyle5({display:"block"})}}
              onMouseLeave={e=>{setStyle5({display:"none"})}}>
            <a href="/home">사랑나눔</a>
            <ul style={style5}>
              <li><a href="/home">자원봉사</a> </li>
              <li><a href="/home">후원안내</a> </li>
            </ul>
          </li>
          </ul> 
        </div>	
      </div>
    </>
  )
}

export default MainHeader
