import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { noticeHitDB, noticeListDB } from '../../../service/NoticeDBLogic'
import { ContainerDiv, FormDiv, HeaderDiv } from '../../css/FormStyle'
import Bottom from '../../include/Bottom'
import MainHeader from '../../include/MainHeader'
import Noticebar from './Noticebar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoticeDetail = () => {
  const navigate = useNavigate()
  const {notice_no} = useParams()
  const[pboard, setPBoard] = useState({
    notice_no,
  })
  const[board, setBoard] = useState({
    notice_no: 0,
    notice_title: "",
    notice_content: "",
    notice_date: "",
    notice_hit: 0,
  })
  useEffect(() => {

    const noticeHit = async() => {
      const res = await noticeHitDB(pboard)
      console.log("noticeHit")           
    }
    
    const noticeDetail = async() => {
      const res = await noticeListDB(pboard)
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      console.log("noticeDetail")
      setBoard({
        notice_no:jsonDoc[0].notice_no,
        notice_title:jsonDoc[0].notice_title,
        notice_content:jsonDoc[0].notice_content,
        notice_date:jsonDoc[0].notice_date,
        notice_hit:jsonDoc[0].notice_hit,
      })
    }
    const fetchData = async () => {
      await noticeHit()
      await noticeDetail()
    }
    fetchData()
  },[pboard])

  const noticeDelete = () => {
    console.log("삭제")
  }

  return (
    <>
      <MainHeader/>
      <Noticebar/>
      <div style={{paddingBottom: "80px"}}>
        <ContainerDiv>
          <HeaderDiv>
            <h3 style={{marginLeft:"10px"}}>공지사항 상세보기</h3>
          </HeaderDiv>
          <FormDiv>
          <div>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
              <div style={{display: 'flex', justifyContent:"space-between"}}>
                <div style={{overflow: "auto"}}>
                  <span style={{marginBottom:'15px', fontSize: "30px", display:"block"}}>
                    {board.notice_title}
                  </span>
                </div>
                {
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/board/update?bm_no=${board.bm_no}`)}}>
                      수정
                    </Button>
                    <Button style={{margin:'0px 10px 0px 10px'}} onClick={noticeDelete}>
                      삭제
                    </Button>
                    <Button style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/notice`)}}>
                      목록
                    </Button>

                  </div>
                }
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span>작성일 : {board.notice_date}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px'}}>
                  <div style={{display: 'flex'}}>
                    <span style={{marginRight:'5px',marginTop: "15px"}}>조회수 : {board.notice_hit}</span>
                    <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{board.BM_HIT}</div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{height: '2px'}}/>
            <div>
              {board.notice_content}
            </div>
          </div>
          <div style={{marginBottom:"300px"}}></div>
          
          <hr style={{height:"2px"}}/>
          <div><FontAwesomeIcon icon="fa-sharp fa-solid fa-caret-down" />이전글 : </div>
          <hr style={{height:"2px"}}/>
          <div>다음글 : </div>
          <hr style={{height:"2px"}}/>
          </FormDiv>
        </ContainerDiv>
      </div>
      <Bottom/>
    </>
  )
}

export default NoticeDetail
