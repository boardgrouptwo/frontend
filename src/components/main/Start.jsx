import React from 'react'
import "../css/start.css"
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TypeForm = styled.div`
  display: flex; 
  width: 80%;
  max-width: 1200px;
  height: 60vh;
  justify-content: center; 
  align-items: center;
  
  border-radius: 60px;
  margin: 150px 0px 150px 0px;
  
`;

const TypeDiv = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  width: 50%;
  height:100%;
  cursor: pointer;
  border-radius: 55px;
  &:hover { 
    background-color: lightgray;
  }
`;

const Start = () => {

  const navigate = useNavigate();

  return (
    <>
      {/* <div className="fullscreen-image"> */}
      <div style={{backgroundColor: "rgb(204,255,204)",
      backgroundSize: "cover",
      height: "100vh"}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <TypeForm>
            <TypeDiv onClick={()=>{navigate('/login')}}>
              <img src="images/FamilyIcon.png" style={{width: '50%', height:'60%'}}></img>
              <span style={{width: '50%', height:'20%', textAlign:'center', fontSize:'200%'}}>KH가족전용</span>
            </TypeDiv>
            <hr style={{height: '80%', width: '2px'}}/>
            <TypeDiv onClick={()=>{navigate('/home')}}>
              <img src="images/HouseIcon.png" style={{width: '50%', height:'60%'}}></img>
              <span style={{width: '50%', height:'20%', textAlign:'center', fontSize:'200%'}}>홈페이지</span>
            </TypeDiv>
          </TypeForm>
        </div>
      </div>
    </>
  )
}

export default Start
