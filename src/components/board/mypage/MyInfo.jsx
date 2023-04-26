import React from 'react'
import styled from 'styled-components'

const MyInfoDiv = styled.div`
  width: 40%;
  height: 200px;
  margin-right: 10%;
`
const CardLi = styled.li`
  display: flex;          // 이름 같은 것들 이미지 옆으로 보내기
  align-items: center;    // flex 속성일 때 사용할 수 있는 속성이다
  width: 100%;
  height: 160px;
  background-color: #FAF5E4;
  margin-bottom: 0.5em;
  border-radius: 1em;
  border: 1px solid gray;
  padding: 0.2em 0;
  box-shadow: 6px 6px 8px 0px rgba(217, 217, 217, 1)
  max-width: 30em;          // 너비가 넓어질 수 있는 제약을 준다
`
const AvatarImg = styled.img`
  width: 8em;
  height: 8em;
  margin-right: 1em;        // 이미지와 글자 사이에 마진
  margin-left: 3em;       // 이미지 앞쪽에 마진 주기
  padding: 0.2em;             // 이미지 안쪽 여백
  border-radius: 50%;
  border: 1px solid #2C786C;
  background-color: white;
`
const NameH1 = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 0.2em;
`
const CardP = styled.p`
  margin: 0;
  font-size: 1rem;
  margin-bottom: 1em;
`
const InfoP = styled.p`
  margin-left: 10px;
  color: #C88B00;
`


const MyInfo = ({userInfo, sponSum, servDate}) => {
  if (userInfo.user_profile_url  == null) {
    userInfo.user_profile_url = "/images/free-icon-daughter.png"
  }

  return (
    <>
      <MyInfoDiv >
        {/* 제목 */}
        <div className="myInfo">
          <h2 style={{marginTop: "30px"}}>내 정보</h2>
        </div>
        {/* 카드 */}
        <div className="myInfoCard" style={{marginLeft: "5%", height: "180px"}} >
          <CardLi class="card" >
            <div style={{width: '50%'}}>
              <AvatarImg src={userInfo.user_profile_url} alt="profile image" />
            </div>
            <div class="card-body" style={{width: '50%', paddingLeft: '3%'}}>
              <NameH1>{userInfo.user_name}</NameH1>
              <div style={{display: "flex"}}>
                <CardP>자원봉사 일정</CardP>
                <InfoP>
                  {
                    servDate != null ? {servDate}
                    : "없음"
                  }
                </InfoP>
                
              </div>
              <div style={{display: "flex"}}>
                <CardP>총 후원금액</CardP>
                <InfoP>{sponSum} 원</InfoP>    
              </div>
              <a href="/mypage/detail" class="btn btn-primary" style={{borderColor: "white", background: "#2C786C", color: "white"}}>회원정보 수정/탈퇴</a>
            </div>
          </CardLi>
        </div>
      </MyInfoDiv>
    </>
  )
}

export default MyInfo
