import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import "../css/header.css"

const MainHeader = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ style1, setStyle1 ] = useState({display: "none"})
  const [ style2, setStyle2 ] = useState({display: "none"})
  const [ style3, setStyle3 ] = useState({display: "none"})
  const [ style4, setStyle4 ] = useState({display: "none"})
  const [ style5, setStyle5 ] = useState({display: "none"})
  const [ style6, setStyle6 ] = useState({display: "none"})

  // 로그인 체크용
  const isLogin = useSelector(state => state.isLogin);

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("role");
    Cookies.remove("user_name");
    dispatch({
      type: "", 
      payload: "",
      user_type: "",
      user_name: ""
    })
    navigate("/login");
    window.location.reload();
  }

  return (
    <>
      <div id="sh_hd_wrapper">
        <div id="topmenu_wrapper">
          <h1 id="top_logo">
            <a href="/home"><img src="http://localhost:3000/images/logo.png" /></a>
          </h1>
          <div id="top_logo2" style={{marginTop: "27px", marginLeft: "10px"}}>
            <a href="/shopmain?type=total">
              <img src="http://localhost:3000/images/logo_gift.png" 
                style={{width: "160px", height: "55px"}}
              />
            </a>
          </div>
{/*           <div id="top_logo2">
            <a href="/shopmain?type=total"><img src="https://t1.daumcdn.net/gift/gnb/logo/PC/0/20230329_SEMBP.png" /></a>
          </div> */}
          
          <ul id="top_nav">  
            <li className="list01"                     
              onMouseEnter={e=>{setStyle1({display:"block"})}}
              onMouseLeave={e=>{setStyle1({display:"none"})}}>
              <a href="/intro">요양원소개</a>
            </li>

            <li className="list02"
              onMouseEnter={e=>{setStyle2({display:"block"})}}
              onMouseLeave={e=>{setStyle2({display:"none"})}}>
              <a href="/sponsor/list">사랑나눔</a>              
              <ul style={style2}>
                <li><a href="/sponsor/from">후원하기</a> </li>
                <li><a href="/service/from">자원봉사신청</a> </li>
                <li><a href="/sponsor/list">후원현황</a> </li>
              </ul>
            </li>

            <li className="list03"
              onMouseEnter={e=>{setStyle3({display:"block"})}}
              onMouseLeave={e=>{setStyle3({display:"none"})}}>
              <a href="/notice?page=1">요양원소식</a>
              <ul style={style3}>
                <li><a href="/notice?page=1">공지사항</a> </li>
                <li><a href="/home">월간일정표</a> </li>
                <li><a href="/meal">식단표</a> </li>
                <li><a href="/qna">QNA</a> </li>
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


            <li className="list06"
              onMouseEnter={e=>{setStyle6({display:"block"})}}
              onMouseLeave={e=>{setStyle6({display:"none"})}}>
              <a href="/home">관리자</a>
              <ul style={style6}>
                <li><a href="/shopadd">상품등록</a> </li>
              </ul>
            </li>

            {/* 
              로그인 확인하여 로그인이 필요시 로그인 버튼이
              로그인이 되어있을때는 회원가입 버튼을 활성화 해준다.
            */}
            {isLogin ? (
              <li className="list03"
              onMouseEnter={e=>{setStyle5({display:"block"})}}
              onMouseLeave={e=>{setStyle5({display:"none"})}}>
              <a href="/login">로그인</a>
              <ul style={style5}>
                <li><a href="/home">회원가입</a> </li>
              </ul> 
              </li> ): (

                <li className="list03"
                onMouseEnter={e=>{setStyle5({display:"block"})}}
                onMouseLeave={e=>{setStyle5({display:"none"})}}>
                <a href="#" onClick={handleLogout}>로그아웃</a>
                </li>
               )
            }
          </ul> 
        </div>	
      </div>
    </>
  )
}

export default MainHeader
