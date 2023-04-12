import React from 'react'

const KhServiceFrombar = () => {
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
          <li ><a href="/sponsor/from">후원하기</a></li>
            <li className='on'><a href="/service/from">자원봉사신청</a></li>        
            <li ><a href="/sponsor/list">후원현황</a></li>        
          </ul>
        </div>
      </div>
    </>
  )
}

export default KhServiceFrombar
