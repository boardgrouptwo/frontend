import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import Bottom from '../../include/Bottom'
import { qnaDeleteDB, qnaListDB,  qnaRepleDB,  qnaUpdateDB, qnabeforeAfterDB } from '../../../service/QnADBLogic'
import MainHeader from '../../include/MainHeader'
import Noticebar from '../notice/Noticebar'
import { ContainerDiv, FormDiv, HeaderDiv, MyInput, MyLabel } from '../../css/FormStyle'
import { Button, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QuillEditor from './QuillEditor'
import Swal from 'sweetalert2'

const QnADetailPage = () => {
    const navigate = useNavigate()

    const user = useSelector(state => state.user_type);
    const userid = useSelector(state => state.userid);
    console.log(userid)
    const [dbid, setDbid] = useState()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page_num = searchParams.get('page');
    const qna_num = searchParams.get('qna_no');

    //qna 번호
    const[pboard, setPBoard] = useState({
        qna_no : qna_num,
    })

    //qna 내용
    const[board, setBoard] = useState({
      qna_no: 0,
      qna_type:"",
      user_id: "",
      qna_title:"",
      qna_content:"",
      qna_date:"",
      qna_result:0,
      reple_content:""
    })

  //수정화면 모달 마운트 여부 결정 - false(안보임), true(보임)
  const[show, setShow] = useState(false)
  const[rshow, setRshow] = useState(false)


  const handleShow = () => {
      setShow(true)
      setTitle(board.qna_title)
  }

  const handleClose = () => setShow(false)

  //수정 후 useEffect가 되도록 설정
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
              user_id:jsonDoc[0].user_id,
              qna_title:jsonDoc[0].qna_title,
              qna_content:jsonDoc[0].qna_content,
              qna_date:jsonDoc[0].qna_date,
              qna_result:jsonDoc[0].qna_result,
              reple_content:jsonDoc[0].reple_content,
          })
          if(jsonDoc[0].qna_result == 1){
            setRshow(true)
          }
          if(jsonDoc[0].user_id != null){
            setDbid(jsonDoc[0].user_id)
            console.log("Dbid : ", jsonDoc[0].user_id)
          }
        }
        

    const fetchData = async () => {      
        await qnaDetail()
      }
      fetchData()

  },[rshow,pboard, rend])


  //게시판 삭제
  const qnaDelete = async() => {
      const res = await qnaDeleteDB(pboard);

      if(res.data === 1) {
          navigate("/qna?page=1")
      }
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
          qna_content: content,
      }
      const res = await qnaUpdateDB(board)
      console.log(res)
      console.log(res.data)

      Swal.fire({
        icon: "success",
        title: "수정이 완료되었습니다.",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })      

      setRend(rend+1)
      handleClose();
      navigate(`/qna/detail?page=${page_num}&qna_no=${qna_num}`)
  }

    /* 댓글달기 모달용 */
    //댓글 모달 보이는지 여부
    const [reple, setReple] = useState(false);

    //작성자 입력값 관리
    const[writer, setWriter] = useState("관리자");

    //내용 입력값 관리
    const[repleContent, setRepleContent] = useState("");
    
    /* 댓글 모달 열기 */
    const repleOpen = () => {
      console.log("댓글 달기 클릭")
      setReple(true);
    }

    /* 댓글 모달 닫기 */
    const repleClose = () => {
      setReple(false);
    }

    /* 댓글 내용 입력값관리 */
    const handleContentChange =(event)=> {
      setRepleContent(event.target.value)
    }


    


    /* 댓글 작성 완료 후 제출 */
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`내용 : ${repleContent}`)
      
      if(repleContent == ""){
        alert("댓글을 다시 작성하세요.")
        return
      }
    /* 화면에서 입력된 댓글내용을 DB로 보내기 위한 변수 */
    const obj ={
      qna_no: qna_num,
      qna_result:'1',
      reple_content : repleContent,
  }
  console.log(obj)
      const res = await qnaRepleDB(obj)
      console.log(res)
      setRshow(true)

      repleClose();
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
                    <Button variant="success" style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/qna?page=${page_num}`)}}>
                      목록
                    </Button>
                    {
                      (user === "admin" || userid === dbid) ? (
                      <Button variant="success" style={{margin:'0px 10px 0px 10px'}} onClick={handleShow}>
                        수정
                      </Button>
                      ) : (<div></div>)
                    }
                    {
                      (user === "admin" || userid === dbid) ? (
                      <Button variant="success" style={{margin:'0px 10px 0px 10px'}} onClick={qnaDelete}>
                        삭제
                      </Button>
                      ) : (<div></div>)
                    }
                    {
                      (user === "admin") ? (
                      <Button variant="warning" style={{margin:'0px 10px 0px 10px'}} onClick={repleOpen}>
                        댓글
                      </Button>
                      ) : (<div></div>)
                    }
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

              <hr/>
              {/* 댓글을 입력하면 입력한 댓글 값이 보이는 화면 */}
              {
              (rshow)?
              (
                <div >
                      <div style={{float:"left"}}>
                          <img src='/images/admin.gif' style={{width:"70px", borderRadius:"50px", marginTop:"10%", marginLeft:"2%", paddingLeft:"10%"}}/><p style={{display:"flex", marginTop:"2%", marginLeft:"26%"}}>관리자</p>
                      </div>
                      <div style={{border:"2px solid #024445", borderRadius:"50px", width:"90%", height:"90%", marginLeft:"8%", marginTop:"1%", marginBottom:"1%"}} >
                          <h5 style={{ marginTop:"2%", marginLeft:"30px"}}>답변</h5>
                          <p style={{ marginTop:"1%", marginLeft:"30px"}}>{board.reple_content}</p>
                      </div>
              </div>
                ): (<></>)
              }

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


      {/* ======================댓글 쓰기 modal============================= */}
          <Modal show={reple} onHide={repleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>댓글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                autoFocus value={writer}
                disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={repleContent} 
                onChange={handleContentChange}
              />
            </Form.Group>
            <Button variant="secondary" onClick={repleClose}>
            닫기
          </Button>
          <Button variant="primary" type="submit">
            등록
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* ======================댓글 쓰기 modal 끝============================= */}

      <Bottom/>
    </>
  )
}


export default QnADetailPage
