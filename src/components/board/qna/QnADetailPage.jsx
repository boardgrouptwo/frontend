import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import Bottom from '../../include/Bottom'
import { qnaDeleteDB, qnaListDB,  qnaUpdateDB, qnabeforeAfterDB } from '../../../service/QnADBLogic'
import MainHeader from '../../include/MainHeader'
import Noticebar from '../notice/Noticebar'
import { ContainerDiv, FormDiv, HeaderDiv, MyInput, MyLabel } from '../../css/FormStyle'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QuillEditor from './QuillEditor'

const QnADetailPage = () => {
    const navigate = useNavigate()

    const [hovered, setHovered] = useState(false)

    const [nextHovered, setNextHovered] = useState(false)

    const user = useSelector(state => state.user_type);
    console.log(user)

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams)

    const page_num = searchParams.get('page');
    console.log(page_num)

    const qna_num = searchParams.get('qna_no');
    console.log(qna_num)


    //qna 번호
    const[pboard, setPBoard] = useState({
        qna_no : qna_num,
    })
    

    //qna 내용
    const[board, setBoard] = useState({
      qna_no: 0,
      qna_type:"",
      user_name: "",
      qna_title:"",
      qna_content:"",
      qna_date:"",
      qna_result:0,
    })

    
    //이전 이후 페이지 제목, 번호
    const[qna_board, setQnaBoard] = useState({
      afterQna:"",
      afterNo:"",
      beforeQna:"",
      beforeNo:"",
    })

    
  //수정화면 모달 마운트 여부 결정 - false(안보임), true(보임)
  const[show, setShow] = useState(false)

  const handleShow = () => {
      setShow(true)
      setTitle(board.qna_title)
      setContent(board.qna_content)
  }

  const handleClose = () => setShow(false)

  const [rend, setRend] = useState(0)

  useEffect(()=>{
      const qnaDetail = async() => {
        console.log(pboard);
          const res = await qnaListDB(pboard)
          const result = JSON.stringify(res.data)
          console.log(res.data)
          const jsonDoc = JSON.parse(result)
          setBoard({
              qna_no:jsonDoc[0].qna_no,
              user_name:jsonDoc[0].user_name,
              qna_title:jsonDoc[0].qna_title,
              qna_content:jsonDoc[0].qna_content,
              qna_date:jsonDoc[0].qna_date,
              qna_result:jsonDoc[0].qna_result,
          })
    }
    
    const qnabeforeAfter = async() => {
      const res = await qnabeforeAfterDB(pboard);
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      
      setQnaBoard({
        afterQna: jsonDoc[0].afterQna,
        afterNo:jsonDoc[0].afterNo,
        beforeQna:jsonDoc[0].beforeQna,
        beforeNo:jsonDoc[0].beforeNo
      })
    }
    const fetchData = async () => {      
        await qnaDetail()
        await qnabeforeAfter()
      }
      fetchData()
  },[pboard, rend])


  //게시판 삭제
  const qnaDelete = async() => {
      const res = await qnaDeleteDB(pboard);

      if(res.data === 1) {
          navigate("/qna")
      }
  }


  //이전글 이동
  const beforeQna = () => {
    navigate(`/qna/detail?page=${page_num}&qna_no=${qna_board.beforeNo}`);
    setPBoard({qna_no : qna_board.beforeNo})
  }

  //다음글 이동
  const afterQna = () => {
    navigate(`/qna/detail?page=${page_num}&qna_no=${qna_board.afterNo}`);
    setPBoard({qna_no : qna_board.afterNo})
  }


  //qna수정
  const[title, setTitle] = useState(board.qna_title)
  const[content, setContent] = useState(board.qna_content)

  const handleTitle = useCallback((e)=>{
      setTitle(e)
  },[])

  const handleContent = useCallback((e)=>{
      setContent(e)
  },[])

  const quillRef = useRef()


  //qna업데이트
  const qnaUpdate = async () => {
      const board = {
          qna_num,
          qna_title: title,
          qna_content: content
      }
      const res = await qnaUpdateDB(board)

      alert("수정이 완료되었습니다.")
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
            <h3 style={{marginLeft:"10px"}}>QnA 상세보기</h3>
          </HeaderDiv>
          <FormDiv>
          <div>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>

              <div style={{display: 'flex', justifyContent:"space-between"}}>

                <div style={{overflow: "auto"}}>
                  <span style={{marginBottom:'15px', fontSize: "30px", display:"block"}}>
                    {board.qna_title}
                  </span>
                </div>

                {
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {
                      (user === "admin" || "user") ? (
                      <Button style={{margin:'0px 10px 0px 10px'}} onClick={handleShow}>
                        수정
                      </Button>
                      ) : (<div></div>)
                    }
                    {
                      (user === "admin" || "user") ? (
                      <Button style={{margin:'0px 10px 0px 10px'}} onClick={qnaDelete}>
                        삭제
                      </Button>
                      ) : (<div></div>)
                    }
                    <Button style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/qna?page=${page_num}`)}}>
                      목록
                    </Button>
                  </div>
                }

              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <span>작성일 : {board.qna_date}</span>
                    </div>
              </div>

            </div>

            <hr style={{height: '2px'}}/>
            <div>
                <section style={{minHeight: '200px'}}>
                    <div dangerouslySetInnerHTML={{__html:board.qna_content}}></div>
                </section>              
            </div>
          </div>
          <div style={{marginBottom:"300px"}}></div>
          
          <hr style={{height:"2px"}}/>

          {qna_board.beforeQna ?
            (<div onClick={beforeQna}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ 
                cursor: "pointer", 
                boxShadow: hovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none" // hovered 상태에 따라 그림자 생성
              }}
            >

                    <FontAwesomeIcon icon="arrow-up" /> 이전글 : {qna_board.beforeQna}
                  </div>) : (<div>처음글</div>)
          }

          <hr style={{height:"2px"}}/>

          {qna_board.afterQna ? 
          (<div onClick={afterQna}
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
            style={{ 
              cursor: "pointer", 
              boxShadow: nextHovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none" // hovered 상태에 따라 그림자 생성
            }}
          >
            <FontAwesomeIcon icon="arrow-down" /> 다음글 : {qna_board.afterQna}
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
            <Modal.Title>QnA 수정</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <div style={{display: "flex", flexWrap: 'wrap', justifyContent: "center"}}>

            <div style={{display:"flex"}}>
                <MyLabel>
                  QnA 제목
                  <MyInput type="text" name="title" 
                  defaultValue= {board.qna_title} onChange={(e)=>{handleTitle(e.target.value)}}/>                  
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
            <Button variant="primary" onClick={qnaUpdate}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>    
      {/* =======================수정하기 modal=================== */}


      <Bottom/>
    </>
  )
}

export default QnADetailPage
