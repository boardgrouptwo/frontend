import React from 'react'
import { Link } from 'react-router-dom'

const KhSponorServicebar = () => {
  return (
    <>
      <div>
        <img src="http://localhost:3000/images/sub_sponsor2.png" 
        style={{width:"100%", height:"200px", 
        position: "relative", margin: "0"
        ,padding: "0"}}/>
      </div>
      <div id="co_aside">
        <div className="co_aside_wrap">
          <div className="aside_tit">사랑나눔</div>
          <ul className="l_menu">
          <li className={window.location.pathname.includes('/sponsor/from') ? 'on' : ''}>
            <Link to="/sponsor/from">후원하기</Link></li>
          <li className={window.location.pathname.includes('/service/from') ? 'on' : ''}>
            <Link to="/service/from">자원봉사신청</Link></li> 
          <li className={window.location.pathname.includes('/sponsor/list') ? 'on' : ''}>     
            <Link to="/sponsor/list">후원현황</Link></li>        
          <li className={window.location.pathname.includes('/service/review') ? 'on' : ''}>
            <Link to="/service/review">자원봉사리뷰</Link></li>           
          </ul>
        </div>
      </div>
    </>
  )
}

export default KhSponorServicebar
