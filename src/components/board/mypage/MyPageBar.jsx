import React from 'react'
import { Link } from 'react-router-dom'

const MyPageBar = () => {
  return (
    <>
      <div>
        <img src="http://localhost:3000/images/sub2.png" 
          style={{width:"100%", height:"200px", 
          position: "relative", margin: "0"
          ,padding: "0"}}/>
      </div>
      <div id="co_aside">
        <div className="co_aside_wrap">
          <div className="aside_tit">내정보</div>
          <ul className="l_menu">
            <li className={window.location.pathname.includes('/home') ? 'on' : ''}>
              {/* <Link to="/mypage">내정보</Link> */}
              <Link to="/home">내정보</Link>
            </li>
            <li className={window.location.pathname.includes('/home') ? 'on' : ''}>
              {/* <Link to="/basket">장바구니</Link> */}
              <Link to="/home">장바구니</Link>
            </li>
            <li className={window.location.pathname.includes('/paymentdetail') ? 'on' : ''}>
              <Link to="/paymentdetail?pay_type=전체">결제내역</Link>
            </li>         
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyPageBar
