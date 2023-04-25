import React from 'react'
import { Link } from 'react-router-dom'

const Noticebar = () => {
  return (
    <>
      <div>
        <img src="http://localhost:3000/images/sub2.png" 
        style={{width:"100%", height:"200px", 
        position: "relative", margin: "0"
        ,padding: "0"}}/>
      </div>
      <div id="co_aside" style={{fontFamily: "'Noto Sans KR', sans-serif"}}>
        <div className="co_aside_wrap">
          <div className="aside_tit">요양원소식</div>
          <ul className="l_menu">
            <li className={window.location.pathname.includes('/notice') ? 'on' : ''}>
              <Link to="/notice?page=1">공지사항</Link>
            </li>
            <li className={window.location.pathname.includes('/calendar') ? 'on' : ''}>
              <Link to="/calendar">월간일정표</Link>
            </li>
            <li className={window.location.pathname.includes('/meal') ? 'on' : ''}>
              <Link to="/meal">식단표</Link>
            </li>        
            <li className={window.location.pathname.includes('/qna') ? 'on' : ''}>
              <Link to="/qna?page=1">QNA</Link>
            </li>        
          </ul>
        </div>
      </div>
    </>
  )
}

export default Noticebar
