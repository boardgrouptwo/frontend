import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { noticebeforeAfterDB, noticeDeleteDB, noticeHitDB, noticeListDB, noticeUpdateDB } from '../../../service/NoticeDBLogic'
import { ContainerDiv, FormDiv, HeaderDiv, MyInput, MyLabel } from '../../css/FormStyle'
import Bottom from '../../include/Bottom'
import MainHeader from '../../include/MainHeader'
import Noticebar from './Noticebar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuillEditor from './QuillEditor'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const NoticeDetail = () => {

  const navigate = useNavigate()

  const [hovered, setHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);

  const user = useSelector(state => state.user_type); 
  const token = useSelector(state => state.token)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page_num = searchParams.get('page');
  const notice_num = searchParams.get('notice_no');

  //공지사항 번호
  const[pboard, setPBoard] = useState({
    notice_no: notice_num,
  })

  //공지사항 내용
  const[board, setBoard] = useState({
    notice_no: 0,
    notice_title: "",
    notice_content: "",
    notice_date: "",
    notice_hit: 0,
  })

  // 이전 이후 페이지 제목, 번호
  const[notice_board, setNoticeBoard] = useState({
    afterNotice: "",
    afterNo: "",
    beforeNotice: "",
    beforeNo: "",
  }) 

  //수정화면 모달 마운트(화면에 나타남) 여부 결정 -  false 안보임, true 보임
  const[show, setShow] = useState(false)  
  const handleShow = () => {
    setShow(true)
    setTitle(board.notice_title)
    setContent(board.notice_content)
  }

  const handleClose = () => setShow(false)

  //수정 후 useEffect가 되도록 설정
  const [rend, setRend] = useState(0)

  useEffect(() => {
    const noticeHit = async() => {
      await noticeHitDB(pboard)
    }
    
    const noticeDetail = async() => {
      const res = await noticeListDB(pboard)
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      setBoard({
        notice_no:jsonDoc[0].notice_no,
        notice_title:jsonDoc[0].notice_title,
        notice_content:jsonDoc[0].notice_content,
        notice_date:jsonDoc[0].notice_date,
        notice_hit:jsonDoc[0].notice_hit,
      })
    }

    const noticebeforeAfter = async() => {     
      const res = await noticebeforeAfterDB(pboard);
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result);
      
      setNoticeBoard({
        afterNotice: jsonDoc[0].afterNotice,
        afterNo: jsonDoc[0].afterNo,
        beforeNotice: jsonDoc[0].beforeNotice,
        beforeNo: jsonDoc[0].beforeNo
      })
    }
    const fetchData = async () => {
      await noticeHit()
      await noticeDetail()
      await noticebeforeAfter()
    }
    fetchData()    
  },[pboard, rend])

  //게시판 삭제
  const noticeDelete = async () => {
    const res = await noticeDeleteDB(pboard,token);
    if(res.data===1) {
      Swal.fire({
        icon: "success",
        title: "게시물 삭제 성공",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })
      navigate("/notice")
    }
  }

  // 이전글 이동
  const beforeNotice = () => {
    navigate(`/notice/detail?page=${page_num}&notice_no=${notice_board.beforeNo}`);
    setPBoard({notice_no: notice_board.beforeNo})
  }

  //다음글 이동
  const afterNotice = () => {
    navigate(`/notice/detail?page=${page_num}&notice_no=${notice_board.afterNo}`);
    setPBoard({notice_no: notice_board.afterNo})    
  }

  //공지사항 수정
  const[title,setTitle] = useState(board.notice_title) 
  const[content,setContent] = useState(board.notice_content)

  const handleTitle = useCallback((e) => {
    setTitle(e)
  },[])
  const handleContent = useCallback((e) => { //QuillEditor에서 담김 - 태그포함된 정보
    setContent(e)
  },[])

  const quillRef = useRef()

  // 공지사항 업데이트
  const noticeUpdate = async () => {
    const board = {
      notice_num,
      notice_title: title,
      notice_content: content
    }
    const res = await noticeUpdateDB(board, token)
    Swal.fire({
      icon: "success",
      title: "공지사항 수정 성공",
      showCancelButton: false,
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "my-confirm-button"
      }
    })
    setRend(rend+1)
    handleClose();
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
                    {
                      (user === "admin") ? (
                      <Button style={{margin:'0px 10px 0px 10px'}} onClick={handleShow}>
                        수정
                      </Button>
                      ) : (<div></div>)
                    }
                    {
                      (user === "admin") ? (
                      <Button style={{margin:'0px 10px 0px 10px'}} onClick={noticeDelete}>
                        삭제
                      </Button>
                      ) : (<div></div>)
                    }
                    <Button style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/notice?page=${page_num}`)}}>
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
              {/* {board.notice_content} */}
              <section style={{minHeight: '200px'}}>
                <div dangerouslySetInnerHTML={{__html:board.notice_content}}></div>
              </section>              
            </div>
          </div>
          <div style={{marginBottom:"300px"}}></div>
          
          <hr style={{height:"2px"}}/>

          {notice_board.beforeNotice ?
            (<div onClick={beforeNotice}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ 
                cursor: "pointer", 
                boxShadow: hovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none" // hovered 상태에 따라 그림자 생성
              }}
            >

                    <FontAwesomeIcon icon="arrow-up" /> 이전글 : {notice_board.beforeNotice}
                  </div>) : (<div>처음글</div>)
          }

          <hr style={{height:"2px"}}/>

          {notice_board.afterNotice ? 
          (<div onClick={afterNotice}
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
            style={{ 
              cursor: "pointer", 
              boxShadow: nextHovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none" // hovered 상태에 따라 그림자 생성
            }}
          >
            <FontAwesomeIcon icon="arrow-down" /> 다음글 : {notice_board.afterNotice}
          </div>
          ) : (<div>마지막글</div>)

          }





          <hr style={{height:"2px"}}/>
          </FormDiv>
        </ContainerDiv>
      </div>

      {/* =======================수정하기 modal=================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        
          <Modal.Header closeButton>
            <Modal.Title>공지사항 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{display: "flex", flexWrap: 'wrap', justifyContent: "center"}}>
            <div style={{display:"flex"}}>
                <MyLabel>
                  공지사항 제목
                  <MyInput type="text" name="title" 
                  defaultValue= {board.notice_title} onChange={(e)=>{handleTitle(e.target.value)}}/>                  
                </MyLabel>
            </div>
            <div style={{display:"flex"}}>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} />
            </div>  
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={noticeUpdate}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>    
      {/* =======================수정하기 modal=================== */}


      <Bottom/>
    </>
  )
}

export default NoticeDetail
