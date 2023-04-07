import React from 'react'

const Noticebar = () => {
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
          <div className="aside_tit">요양원소식</div>
          <ul className="l_menu">
            <li className={window.location.pathname.includes('/notice') ? 'on' : ''}>
              <a href="/notice?page=1">공지사항</a>
            </li>
            <li className={window.location.pathname.includes('/calendar') ? 'on' : ''}>
              <a href="/calendar">월간일정표</a>
            </li>
            <li className={window.location.pathname.includes('/meal') ? 'on' : ''}>
              <a href="/meal">식단표</a>
            </li>        
            <li className={window.location.pathname.includes('/qna') ? 'on' : ''}>
              <a href="/qna">QNA</a>
            </li>        
          </ul>
        </div>
      </div>
    </>
  )
}

export default Noticebar
