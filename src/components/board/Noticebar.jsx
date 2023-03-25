import React from 'react'

const Noticebar = () => {
  return (
    <>
      <div>
        <img src="images/sub.jpg" 
        style={{width:"100%", height:"200px", 
        position: "relative", margin: "0"
        ,padding: "0"}}/>
      </div>
      <div id="co_aside">
        <div className="co_aside_wrap">
          <div className="aside_tit">요양원소개</div>
          <ul className="l_menu">
            <li class='on'>
              <a href="/home">공지사항</a>
            </li>
            <li ><a href="/home">시설안내</a></li>
            <li ><a href="/home">오시는길</a></li>        
          </ul>
        </div>
      </div>
    </>
  )
}

export default Noticebar
