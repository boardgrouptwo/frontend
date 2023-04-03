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
            <li className='on'>
              <a href="/notice">공지사항</a>
            </li>
            <li ><a href="/calendar">월간일정표</a></li>
            <li ><a href="/meal">식단표</a></li>        
            <li ><a href="/qna">QNA</a></li>        
          </ul>
        </div>
      </div>
    </>
  )
}

export default Noticebar
