import React from 'react'
import "../css/start.css"
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../include/MainHeader';


const TypeForm = styled.div`
  display: flex; 
  width: 100%;
  max-width: 1200px;
  align-items: center;
  border-radius: 60px;
  margin: 50%;
  
`;

const TypeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 55px;

  span {
    color: white;
    font-size:40px;
  }
  &:hover {
    span {
      color: #4a9e5c;
      font-size:43px;
    }
  }
`;
const Start = () => {

  const navigate = useNavigate();

  return (
    <>


      {/* <div className="fullscreen-image"> */}

        <MainHeader />
      <div className="video-background">
  <div className="video-foreground">
    <video autoPlay loop muted playsInline>
      <source src="images/mainFlowerPerson.mp4" type="video/mp4" />
    </video>
  </div>
</div>
<div className ="start-comment"> 가족을 위한 프리미엄 KH요양원
<div className="other-content">


            <TypeDiv onClick={()=>{navigate('/login')}} >
              <img src="images/FamilyIcon2.png" style={{width: '60%', height:'30%'}}></img>
              <span className="span-button" >KH가족전용</span>
            </TypeDiv>
            <hr style={{width: '100px'}}/>
            <TypeDiv onClick={()=>{navigate('/home')}}  >
              <img src="images/HouseIcon2.png" style={{width: '60%', height:'30%'}}></img>
              <span className="span-button" >KH홈페이지</span>
            </TypeDiv>


</div>
</div>

    </>
  )
}

export default Start
