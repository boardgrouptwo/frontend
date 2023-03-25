import React from 'react'
import KakaoMap from '../kakao/KakaoMap'

const MainBottom = () => {
  return (
    <>
      <div style={{
        backgroundColor: "black", color: "white" 
        ,fontFamily: "Single Day"
        ,position: "absolute"
        ,width: "100%"
        ,bottom: "0"   
        ,position: "absolute"
        ,margin: "0"
        ,padding: "0"    
             
        }}>
        <div style={{float: "left", margin: "0px", padding: "20px"  }}>
          <h2 style={{textDecoration: "underline"}}>
            <img src="images/free-icon-pin-503082.png" style={{width:"40px"}}/> 찾아오시는길</h2>
          <br />
          <h3>주소:[06234]서울 강남구 테헤란로10길 9</h3>
          <br />
          <h4>TEL:02-1234-2345</h4>
          <br/>
          <h4>상담시간:09:00 ~ 18:00</h4>
        </div>
        <div style={{margin : "10px", padding: "20px"}}>
          <KakaoMap/>
        </div>
      </div>
    </>
  )
}

export default MainBottom
