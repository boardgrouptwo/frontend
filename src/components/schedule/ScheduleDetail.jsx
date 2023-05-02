import React, { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import Datetime from 'react-datetime';
import { Button, Card, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { scheduleDeleteDB, scheduleInsertDB, scheduleListDB, scheduleUpdateDB } from '../../service/ScheduleDBLogic';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import QuillEditor from './QuillEditor'
import MainHeader from '../include/MainHeader';
import { FormDiv,ContainerDiv,HeaderDiv } from '../css/FormStyle';
import Noticebar from '../board/notice/Noticebar';
const ScheduleDetail = () => {
  //수정페이지
    //사용자가 선택한 row m_no
    const {cal_no}=useParams()
    //한건을 담아서 
    //안에있는 타입이 오브젝트라서 한건만 가져올거니까 객체리터럴로 
    const user = useSelector(state => state.user_type); 
    //오늘 이전 날짜 비활성화
    const yesterday=moment().subtract(1,'day')
    const valid=(current)=>{
        return current.isAfter(yesterday)
    }
   
    const [cal_title,setCal_title]=useState(0)
    const [cal_writer,setCal_writer]=useState(0)
    const [cal_content,setCal_content]=useState('')
    const [cal_start,setCal_start]=useState('')
    const [cal_end,setCal_end]=useState('')
    

    const [scheduleList,setScheduleList]=useState([])
    const [schedule,setSchedule]=useState([])
  const token =useSelector(state => state.token);
    const navigate=useNavigate()
  const userid = useSelector(state => state.userid);
  console.log(userid)
  const [dbid, setDbid] = useState()
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const page_num = searchParams.get('page');
  const cal_num = searchParams.get('cal_no');

  //스케줄 번호
  const[pboard, setPBoard] = useState({
      cal_no : cal_num,
  })

  //스케줄 내용
  const[board, setBoard] = useState({
    cal_no: 0,
    user_id: "",
    cal_title:"",
    cal_content:"",
    cal_start:"",
    cal_end:"",
  })

//수정화면 모달 마운트 여부 결정 - false(안보임), true(보임)
const[show, setShow] = useState(false)
const[rshow, setRshow] = useState(false)
const handleShow = () => {
    setShow(true)
    setTitle(board.cal_title)
    setContent(board.cal_content)
}
const handleClose = () => setShow(false)

//수정 후 useEffect가 되도록 설정
const [rend, setRend] = useState(0)

useEffect(()=>{
    const scheduleDetail = async() => {
        const res = await scheduleListDB(pboard)
        const result = JSON.stringify(res.data)
        const jsonDoc = JSON.parse(result)
        setBoard({
            cal_no:jsonDoc[0].cal_no,
            cal_title:jsonDoc[0].cal_title,
            cal_content:jsonDoc[0].cal_content,
            cal_start:jsonDoc[0].cal_start,
            cal_end:jsonDoc[0].cal_end,
        })
        if(jsonDoc[0].cal_result == 1){
          setRshow(true)
        }
        if(jsonDoc[0].user_id != null){
          setDbid(jsonDoc[0].user_id)
          console.log("Dbid : ", jsonDoc[0].user_id)
        }
      }
      

  const fetchData = async () => {      
      await scheduleDetail()
    }
    fetchData()

},[rshow,pboard, rend])


//삭제
const scheduleDelete = async() => {
    const res = await scheduleDeleteDB(pboard);

    if(res.data === 1) {
      Swal.fire({
        icon: "success",
        title: "게시물 삭제 성공",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })
        navigate("/memo")
    }
}
//schedule 수정
const[title, setTitle] = useState(board.cal_title)
const[content, setContent] = useState(board.cal_content)
const handleTitle = useCallback((e)=>{
    setTitle(e)
},[])
const handleContent = useCallback((e)=>{
    setContent(e)
},[])
const quillRef = useRef()

const scheduleUpdate = async () => {
    const board = {
        cal_num,
        cal_title:cal_title,
        cal_content:cal_content,
    }
    const res = await scheduleUpdateDB(board)
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
    navigate(`/schedule/detail?page=${page_num}&cal_no=${cal_num}`)
}

  
  const handleChangeForm=()=>{

  }
  const handleStart = (date) => {
    const cal_start = moment(date).format("YYYY-MM-DD");
    console.log(cal_start);
    setCal_start(cal_start);
  };
const handleEnd = (date) => {
  const cal_end = moment(date).format("YYYY-MM-DD");
  console.log(cal_end);
  setCal_end(cal_end);
};

  return (
    <>
        <MainHeader/>
        <Noticebar/>
        <div style={{paddingBottom: "80px"}}>
        <ContainerDiv>
          <HeaderDiv>
            <h3 style={{marginLeft:"10px"}}>월간일정 상세보기</h3>
          </HeaderDiv>
          <FormDiv>
          <div>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
              <div style={{display: 'flex', justifyContent:"space-between"}}>
                <div style={{overflow: "auto"}}>
                  <span style={{marginBottom:'15px', fontSize: "30px", display:"block"}}>
                    {board.cal_title}
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
                      <Button style={{margin:'0px 10px 0px 10px'}} onClick={scheduleDelete}>
                        삭제
                      </Button>
                      ) : (<div></div>)
                    }
                    <Button style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/memo?page=${page_num}`)}}>
                      목록
                    </Button>

                  </div>
                }
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px'}}>
                  <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{board.BM_HIT}</div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{height: '2px'}}/>
            <div>
              {/* {board.notice_content} */}
              <section style={{minHeight: '200px'}}>
                <div dangerouslySetInnerHTML={{__html:board.cal_content}}></div>
              </section>              
            </div>
          </div>
          <div style={{marginBottom:"300px"}}></div>
          
          <hr style={{height:"2px"}}/>

          </FormDiv>
        </ContainerDiv>
      </div>
        {/* ========================== [[  일정등록 Modal ]] ========================== */}
        <Modal show={show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>일정 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="f_memo">
              <Form.Group className="mb-3 row" controlId="mTitle">
                <Form.Label className="col-sm-2 col-form-label">
                  일정명
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    name="cal_title"
                    value={scheduleList.cal_title}
                    onChange={handleChangeForm}
                    placeholder="Enter 일정명"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="boardWriter">
               
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="edit-start">
                <Form.Label className="col-sm-2 col-form-label">
                  시작
                </Form.Label>
                <div className="col-sm-10">
                  <Datetime
                   input={false}
                   timeFormat={false}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={valid}
                    name="cal_start"
                    value={scheduleList.cal_start}
                    onChange={handleStart}
                    
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="edit-end">
                <Form.Label className="col-sm-2 col-form-label">끝</Form.Label>
                <div className="col-sm-10">
                  <Datetime
                input={false}
                timeFormat={false}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={valid}
                    name="cal_end"
                    value={scheduleList.cal_end}
                    onChange={handleEnd}
                   
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="boardContent">
                <Form.Label className="col-sm-2 col-form-label">
                  내용
                </Form.Label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    name="cal_content"
                    value={scheduleList.cal_content}
                    onChange={handleChangeForm}
                    rows="3"
                  ></textarea>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={()=>{scheduleUpdate()}}>
              수정
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ========================== [[ 수정 Modal ]] ========================== */}
    
      
        
    </>
  )
}

export default ScheduleDetail
