import { Modal } from 'antd'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { VisitMDeleteDB } from '../../../service/VisitDBLogic'
import Swal from 'sweetalert2'

const ElderInfoDiv = styled.div`
  width: 45%;
  height: 200px;
  margin-right: 5%;
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
  margin-left: 2em;       // 이미지 앞쪽에 마진 주기
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


const ElderInfo = ({elderInfo, visitDate}) => {
  const userid = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 
  
  //면회취소
  const onDeletelVisit = (visit_no) => {
    Modal.confirm({
      title: '면회를 취소하시겠습니까?',
      onOk: async () => {
        // 확인 버튼 클릭 시, 면회 취소 요청
        await handlevisitDelete(visit_no);
        // 면회 취소 후, 화면 리로드
        window.location.reload();
      },
    });
  };
const handlevisitDelete = async (visit_no) =>{
  const res = await VisitMDeleteDB({visit_no:visit_no},token);
  if(res.data===1){
    Swal.fire({
      icon: "success",
      title: "삭제되었습니다.",
      showCancelButton: false,
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "my-confirm-button"
      }
    })
  }
}
  return (
    <>
      <ElderInfoDiv >
        {/* 제목 */}
        <div className="elderInfo" >
          <h2 style={{marginTop: "30px"}}>내원자 정보</h2>
        </div>
        {/* 카드 */}
        <div className="elderInfoCard" style={{marginLeft: "5%", height: "180px"}} >
          <CardLi class="card">
            <div style={{width: '40%'}}>
              <AvatarImg src="/images/free-icon-grandmother.png" alt="profile image" />
            </div>
            <div class="card-body" style={{width: '50%', paddingLeft: '3%'}}>
            {
              elderInfo.elder_name != null ?
                <div>
                  <NameH1>{elderInfo.elder_name}</NameH1>
                  {/* <CardP>내원자 정보</CardP> */}
                  <div style={{display: "flex"}}>
                    <CardP style={{marginRight: "20px"}}>면회 일정 : </CardP>
                    
                    {
                      visitDate.visit_date != null ? 
                      visitDate.visit_date ==1 ?
                      <InfoP>{visitDate.visit_date}</InfoP>
                      : <InfoP style={{color: "green"}}>{visitDate.visit_date} (대기 중..)
                        <br/>
                      <Button class="btn btn-primary" style={{borderColor: "white", background: "#2C786C", color: "white"}}onClick={()=>onDeletelVisit()}>면회 취소</Button>
                      </InfoP>
                      : <div>
                        <InfoP>없습니다</InfoP>
                        <Link to="/visit/sign" class="btn btn-primary" style={{borderColor: "white", background: "#2C786C", color: "white"}} >면회 신청</Link>
                        </div>
                    }
                  </div>
                </div>
                : <div>
                    <Link to="/elder" class="btn btn-primary" style={{borderColor: "white", background: "#2C786C", color: "white"}} >내원자 추가</Link>
                  </div>
            }
            </div>
          </CardLi>
        </div>
      </ElderInfoDiv>
    </>
  )
}

export default ElderInfo
