/* global kakao */
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import {SectionsContainer, Section} from 'react-fullpage';
import Introductionbar from './Introductionbar';
import MainHeader from '../include/MainHeader';
import MainBottom from '../include/MainBottom';
import '../css/intro.css';

const Introduction = () => {
  /************ 화면분할 *****************/
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
  };


/************ 카카오맵 *****************/
  const kakaomap = useRef()
  const [map, setMap] = useState();
  const[positions, setPositions] = useState([
    {
      content: '<div>KH요양원</div>',
      latlng: new kakao.maps.LatLng(37.4989931, 127.0329085)
    }
  ])
  useEffect(()=> {
    const container = document.getElementById("map");
    const options = {
      center: positions[0].latlng,
      level: 2,
    };
    if(!map) {
      setMap(new kakao.maps.Map(container,options));
    } else {
      if(positions[1]){//자바스크립트에서는 0이 아닌건 모두 true
        map.setCenter(positions[1].latlng)
      }
    }
    //마커 표시하기
    for(let i=0; i<positions.length; i++) {
      //마커 생성하기
      const marker = new kakao.maps.Marker({
        map: map, //마커를 표시할 지도
        position: positions[i].latlng, //마커의 위치
      });
      // 마커에 표시할 인포윈도우 생성하기
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content
      });
      //마커에 이벤트를 등록하는 함수를 만들고 즉시 호출되도록 클로저 만듦
      //클로저를 추가하지 않으면 마커가 여러개 있을 때 마지막 에만 이벤트 적용
      (function(marker,infowindow){
        //마커에 mouse over이벤트 등록 마우스 오버시 인포윈도우를 표시함
        kakao.maps.event.addListener(marker,'mouseover',function(){
          infowindow.open(map,marker)
        });
        //마커에 mouseout 이벤트 등록 마우스 아웃시 인포윈도우 닫기처리함
        kakao.maps.event.addListener(marker,'mouseout',function(){
          infowindow.close()
        });
      })(marker,infowindow)
    } // end of for
  },[positions, map])
/************ 카카오맵 end*****************/

  return (
    <>
          <MainHeader />
      <Introductionbar />
    <SectionsContainer {...options}>
      <body style={{ overflow: 'hidden'}}>
      <div  style={{height: "35rem",  padding:"0px", textAlign: 'center'}}>
      <Section className="oneSecion">
   
      <img
          src='/images/intro/intro_image5.png'
          alt='intro_image'
          style={{ align: "center", width: '100%', height: '550px', opacity: 1, padding:"0%" }}
        />
        <font style={{zIndex:'99', textAlign: "center", position: "absolute", top: "7%", left:"40%", fontSize:"30px", fontWeight: 'bold'}}> 요양원의 새로운 기준 </font>
        <font style={{zIndex:'99', textAlign: "center", position: "absolute", top: "8%", left:"40%", fontSize:"100px", fontWeight: 'bold', color: '#004445'}}> KH요양원 </font>
     
            <img
              src='/images/intro/scroll.png'
              style={{align: "center", width: 'auto', opacity: 1, padding:"1%", cursor: "pointer", transition: "transform 0.3s ease" }}
              onMouseOver={(e) => {e.currentTarget.style.transform = "translateY(15px)";}}
              onMouseOut={(e) => {e.currentTarget.style.transform = "none";}}
              onClick={() => window.location.href = "http://localhost:3000/intro#sectionTwo"}
            />
        </Section>
        </div>



        <div style={{paddingTop: "0%", height: "55rem", textAlign: 'center', marginTop:"7%",overflow: "hidden", fontFamily:"Noto Sans KR"}}>  
  <Section className="twoSecion" >
    <img src='/images/intro/goldBorder.png'style={{width:"1000px", height:"20%", position:"relative", zIndex:"0"}}/>
    <div style={{margin:"-90px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", position:"relative", zIndex:"1"}}>
      <h1 style={{ color: '#595959', fontWeight: 'bold', fontSize: '2rem', marginTop: '2rem' }}>
        어르신이 머물고 싶은 집
        </h1>
        <h1 style={{ color: '#004445', fontWeight: 'bold', fontSize: '3rem', marginTop: '0rem' }}>
          KH요양원
        </h1>
        <br />
       

        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '1.5rem' }}>
          안녕하세요, 저희 요양원 사이트에 방문해 주셔서 감사합니다. <br /> 저희 요양원은 노인분들의 안락하고 행복한 노후생활을 위해 최선을 다하고 있습니다.
        </p>

        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '1rem' }}>
          저희 요양원은 첨단 시설과 전문 요양보호사들이 함께하는 환경에서 노인분들의 건강과 안녕을 지켜드리며, <br />다양한 프로그램과 활동을 통해 삶의 질을 높일 수 있도록 노력하고 있습니다.
        </p>

        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '1rem' }}>
          또한, 저희 요양원은 항상 노인분들의 의견에 귀 기울이며, <br />개인 맞춤형 요양서비스를 제공하기 위해 최선을 다하고 있습니다.
        </p>

        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '2rem' }}>
          다시 한번, 저희 요양원 사이트에 방문해 주셔서 감사합니다. <br />언제든지 궁금하신 점이 있으시면 언제든지 문의해 주시기 바랍니다.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#595959', marginTop: '2rem' }}>
        감사합니다
        </p>
        <hr />

        <img
              src='/images/intro/scroll.png'
              style={{ align: "center", width: 'auto', opacity: 1, padding:"1%", cursor: "pointer", transition: "transform 0.3s ease" }}
              onMouseOver={(e) => {e.currentTarget.style.transform = "translateY(15px)";}}
              onMouseOut={(e) => {e.currentTarget.style.transform = "none";}}
              onClick={() => window.location.href = "http://localhost:3000/intro#sectionThree"}
              />
              </div>
    
        </Section>
                </div>



                <div style={{paddingTop: "5%", height: "50rem", textAlign: 'center'}}>  
        <Section className="threeSecion">

        
          <h2 style={{ color: '#004445', fontWeight: 'bold', fontSize: '3rem', marginTop: '0rem', marginBottom: '30px'}}>오시는 길</h2>
          <div className="leftDiv">
            <ul className='leftSide'>
              <li>
                <p className="buslabel" style={{backgroundColor:"#5ab354", marginRight:"5px"}}>2</p>
                <p><span style={{color:"#5ab354", marginRight:"20px"}}>역삼역</span> ㅤㅤㅤ3번 출구에서 도보 6분</p>
              </li>
              <br />
              <li>
                <p className="buslabel" style={{backgroundColor:"#5ab354", marginLeft:"-31px", marginRight:"5px"}} >2</p> 
                <p className="buslabel2" style={{backgroundColor:"#8B0000" , marginRight:"5px"}}>신분당</p>
                <p><span style={{color:"#8B0000", marginRight:"20px"}}>강남역</span>1번 출구 도보 7분</p>
              </li>
            </ul>
          </div>
            <div id="" style={{display: "flex", alignItems:"center", justifyContent:"space-around", flexDirection:"column"}}>
              <div id="map" ref={kakaomap} style={{width: "1000px", height: "500px", marginBottom: "20px", border:"2px solid lightgray", borderRadius: "20px"}}></div>
            </div>
        </Section>
        </div>
      </body>
    </SectionsContainer>
    <MainBottom />
    </>
  );
}
export default Introduction;