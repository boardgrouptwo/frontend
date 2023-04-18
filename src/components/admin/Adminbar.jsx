import React from 'react'
import { Link } from 'react-router-dom'

const Adminbar = () => {
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
          <div className="aside_tit">관리자</div>
          <ul className="l_menu">
            <li className={window.location.pathname.includes('/visit/management') ? 'on' : ''}>
              <Link to="/visit/management">면회관리</Link>
            </li>
            <li className={window.location.pathname.includes('/sponsor/management') ? 'on' : ''}>
              <Link to="/sponsor/management">후원관리</Link>
            </li>
            <li className={window.location.pathname.includes('/service/management') ? 'on' : ''}>
              <Link to="/service/management">자원봉사관리</Link>
            </li>        
            <li className={window.location.pathname.includes('/shopadd') ? 'on' : ''}>
              <Link to="/shopadd">상품등록</Link>
            </li>        
          </ul>
        </div>
      </div>
    </>
  )
}

export default Adminbar
