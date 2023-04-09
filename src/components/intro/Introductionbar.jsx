import React from 'react'

const Introductionbar = () => {
  return (
    <>
      <div>
        <img src="images/sub_intro.png" 
        style={{width:"100%", height:"200px", 
        position: "relative", margin: "0"
        ,padding: "0"}}/>
      </div>
      <div id="co_aside">
        <div className="co_aside_wrap">
          <div className="aside_tit">요양원소개</div>
          <ul className="l_menu">
            <li className='on'>
              <a href="/intro">KH요양원</a>
            </li>
      
          </ul>
        </div>
      </div>
    </>
  )
}

export default Introductionbar
