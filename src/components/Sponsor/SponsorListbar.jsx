import React from 'react'

const SponsorListbar = () => {
  return (
    <>
      <div>
        <img src="images/sub3.png" 
        style={{width:"100%", height:"200px", 
        position: "relative", margin: "0"
        ,padding: "0"}}/>
      </div>
      <div id="co_aside">
        <div className="co_aside_wrap">
          <div className="aside_tit">사랑나눔</div>
          <ul className="l_menu">
          <li><a href="/sponser/from">후원하기</a></li>
          <li><a href="/service/from">자원봉사신청</a></li>        
          <li className='on'><a href="/sponser/list">후원현황</a></li>        
          </ul>
        </div>
      </div>
    </>
  )
}

export default SponsorListbar
