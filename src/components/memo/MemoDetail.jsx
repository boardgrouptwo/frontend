import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Datetime from 'react-datetime';
import { Button, Card, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

const MemoDetail = () => {
    //사용자가 선택한 row m_no
    const {m_no}=useParams()
    //한건을 담아서 
    //안에있는 타입이 오브젝트라서 한건만 가져올거니까 객체리터럴로 
    const{memo,setMemo}=useState({})
    //오늘 이전 날짜 비활성화
    const yesterday=moment().subtract(1,'day')
    const valid=(current)=>{
        return current.isAfter(yesterday)
    }
    const navigate=useNavigate();
    const [show,setShow]=useState(false)
    const handleClose=()=>setShow(false)//모달창 닫기
    const handleShow=()=>setShow(true)//모달창 열기
    const [m_title,setM_title]=useState(0)
    const [m_writer,setM_writer]=useState(0)
    const [m_content,setM_content]=useState('')
    const [m_start,setM_start]=useState('')
    const [m_end,setM_end]=useState('')
    useEffect(()=>{
        const startCountRef=ref(database,'memo/'+m_no)
        onValue(startCountRef,(snapshot)=>{
            const data = snapshot.val()
            setMemo(data)
            return ()=>off(startCountRef)
            })
        },[m_no])
    const memoUpdate=(event)=>{
        event.preventDefault(event)
        const pmemo={ //파이어베이스에 전달할 파라미터
            m_no:m_no,//memo/detail/:m_no 로 넘기는 값일아 memo에서 꺼내지않아도괜찮
            m_title:memo.m_title,
            m_content:memo.m_content,
            m_start:m_start?memo.m_start:m_start,
            m_start:m_end?memo.m_end:m_end,
        }
        console.log(pmemo)
        set(ref(database,'memo/'+m_no),pmemo)
        handleClose()
    }
    const memoDelete=(event)=>{
        //키값넘기기 m_no
        event.preventDefault()
        remove(ref(database,'memo/'+m_no))
        navigate("/memo")
    }
    const handleStart=(date)=>{
        console.log(date)
        const m_start = moment(date._d).format("YYYY-MM-DD, a h:mm")
        console.log(m_start)
        setM_start(m_start)
      }
      const memoSearch=()=>{
  
      }
      const getMemoList=()=>{
  
      }
      const handleEnd=(date)=>{
        console.log(date)
        const m_start = moment(date._d).format("YYYY-MM-DD, a h:mm")
        console.log(m_end)
        setM_end(m_end)
  
      }
      //화면에 입력받은 정보 담기
      const handleChangeForm=(event)=>{
        if(event.currentTarget==null){
          return
        }
        //console.log("폼내용 변경 발생 name:",event.target.name)
        //console.log("폼내용 변경 발생 name:",event.target.value)
        console.log(memo)
        setMemo({
          ...memo,
          m_no:Date.now(),// 십진수로 가져간다
          [event.target.name]:event.target.value
        })
        console.log(memo)
      }
  return (
    <>
            <div className="container">
        <div className="page-header">
          <h2>
            일정관리 <small>일정보기</small>
          </h2>
          <hr />
        </div>
        <Card style={{ width: "58rem" }}>
          <Card.Header>{memo.m_title}</Card.Header>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{memo.m_writer}</ListGroupItem>
            <ListGroupItem>{`${memo.m_start} ~ ${memo.m_end}`}</ListGroupItem>
            <ListGroupItem>{memo.m_content}</ListGroupItem>
          </ListGroup>
          <div className="detail-link">
            <Button variant="primary" onClick={handleShow}>
              수정
            </Button>
            &nbsp;
            <Button variant="primary" onClick={memoDelete}>
              삭제
            </Button>
            <Link to="/memo" className="nav-link">
              일정목록
            </Link>
          </div>
        </Card>
        <hr />
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
                    name="m_title"
                    value={memo.m_title}
                    onChange={handleChangeForm}
                    placeholder="Enter 일정명"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="boardWriter">
                <Form.Label className="col-sm-2 col-form-label">
                  등록자
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    name="m_writer"
                    value={memo.m_writer}
                    onChange={handleChangeForm}
                    className="form-control form-control-sm"
                    placeholder="Enter 작성자"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="edit-start">
                <Form.Label className="col-sm-2 col-form-label">
                  시작
                </Form.Label>
                <div className="col-sm-10">
                  <Datetime
                    dateFormat="YYYY-MM-DD"
                    isValidDate={valid}
                    name="m_start"
                    value={memo.m_start}
                    onChange={handleStart}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3 row" controlId="edit-end">
                <Form.Label className="col-sm-2 col-form-label">끝</Form.Label>
                <div className="col-sm-10">
                  <Datetime
                    dateFormat="YYYY-MM-DD"
                    isValidDate={valid}
                    name="m_end"
                    value={memo.m_end}
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
                    name="m_content"
                    value={memo.m_content}
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
            <Button variant="primary" onClick={memoUpdate}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ========================== [[ 글등록 Modal ]] ========================== */}
      </div>
    </>
  )
}

export default MemoDetail
