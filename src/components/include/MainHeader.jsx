import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
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
  const auth = useSelector(state => state.user_type);

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("user_id");
    Cookies.remove("role");
    Cookies.remove("user_name");
    dispatch({
      type: "", 
      payload: "",
      user_id: "",
      user_type: "",
      user_name: ""
    })
    navigate("/login");
    
    Swal.fire({
      icon: "success",
      title: "로그아웃 성공",
      showCancelButton: false,
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "my-confirm-button"
      }
    })
    window.location.reload();
  }

  return (
    <>
      <div id="sh_hd_wrapper" style={{fontFamily: "'Noto Sans KR', sans-serif"}}>
        <div id="topmenu_wrapper">
          <h1 id="top_logo">
            <Link to="/home">
              <img src="http://localhost:3000/images/logo.png" />
            </Link>
          </h1>
          <div id="top_logo2" style={{marginTop: "27px", marginLeft: "10px"}}>
            <Link to="/shopmain?type=total">
              <img src="http://localhost:3000/images/logo_gift.png" 
                style={{width: "160px", height: "55px"}}
              />
            </Link>
          </div>
{/*           <div id="top_logo2">
            <a href="/shopmain?type=total"><img src="https://t1.daumcdn.net/gift/gnb/logo/PC/0/20230329_SEMBP.png" /></a>
          </div> */}
          
          <ul id="top_nav">  
            <li className="list01"                     
              onMouseEnter={e=>{setStyle1({display:"block"})}}
              onMouseLeave={e=>{setStyle1({display:"none"})}}>
              <Link  to="/intro">요양원소개</Link>
            </li>
            
            <li className="list02"
              onMouseEnter={e=>{setStyle2({display:"block"})}}
              onMouseLeave={e=>{setStyle2({display:"none"})}}>
              <Link style={{}} to="/sponsor/list">사랑나눔</Link>              
              <ul style={style2}>
                <li><Link to="/sponsor/from">후원하기</Link> </li>
                <li><Link to="/service/from">자원봉사신청</Link> </li>
                <li><Link to="/sponsor/list">후원현황</Link> </li>
              </ul>
            </li>

            <li className="list03"
              onMouseEnter={e=>{setStyle3({display:"block"})}}
              onMouseLeave={e=>{setStyle3({display:"none"})}}>
              <Link to="/notice?page=1">요양원소식</Link>
              <ul style={style3}>
                <li><Link to="/notice?page=1">공지사항</Link> </li>
                <li><Link to="/home">월간일정표</Link> </li>
                <li><Link to="/meal">식단표</Link> </li>
                <li><Link to="/qna">QNA</Link> </li>
              </ul>
            </li>

            {
              (auth==='user') ? (
                <li className="list04"
                onMouseEnter={e=>{setStyle4({display:"block"})}}
                onMouseLeave={e=>{setStyle4({display:"none"})}}>
                <Link to="/home">내정보</Link>
                <ul style={style4}>
                  <li><Link to="/home">장바구니</Link> </li>
                  <li><Link to="/paymentdetail">결제내역</Link> </li>
                  <li><Link to="/visit/sign">면회 신청</Link> </li>
                </ul>
              </li>
              ) : (<></>)
            }

            {
              (auth==='admin') ? (
                <li className="list06"
                onMouseEnter={e=>{setStyle6({display:"block"})}}
                onMouseLeave={e=>{setStyle6({display:"none"})}}>
                <Link to="/shopadd">관리자</Link>
                <ul style={style6}>
                  <li><Link to="/visit/management">면회관리</Link> </li>
                  <li><Link to="/sponsor/management">후원관리</Link> </li>
                  <li><Link to="/service/management">자원봉사관리</Link> </li>
                  <li><Link to="/shopadd">상품등록</Link> </li>
                </ul>
              </li>
              ) : (<></>)
            }


            {/* 
              로그인 확인하여 로그인이 필요시 로그인 버튼이
              로그인이 되어있을때는 회원가입 버튼을 활성화 해준다.
            */}
            {isLogin ? (
              <li className="list03"
              onMouseEnter={e=>{setStyle5({display:"block"})}}
              onMouseLeave={e=>{setStyle5({display:"none"})}}>
              <Link to="/login">로그인</Link>
              <ul style={style5}>
                <li><Link to="/join">회원가입</Link> </li>
              </ul> 
              </li> ): (

                <li className="list03"
                onMouseEnter={e=>{setStyle5({display:"block"})}}
                onMouseLeave={e=>{setStyle5({display:"none"})}}>
                <Link to="#" onClick={handleLogout}>로그아웃</Link>
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
