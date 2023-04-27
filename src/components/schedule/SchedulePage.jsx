import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap'
import Datetime from 'react-datetime'
import moment from 'moment/moment'

const SchedulePage = () => {
 //오늘 이전 날짜 비활성화
 const yesterday=moment().subtract(1,'day')
 const valid=(current)=>{
     return current.isAfter(yesterday)
 }
const [show,setShow]=useState(false)
const [m_end,setM_end]=useState("")
  const[memoList,setMemoList]=useState([])
useEffect(()=>{
  axios.get("/schedule.json").then(res=>{
    //res로가져온값
    console.log(res.data)
    setMemoList(res.data)//state훅이 갖고만 있는거 렌더링 되기 전
    })
  },[])
  const handleDateClick=(arg)=>{
    console.log(arg.dateStr)
    handleShow()
  }
  const handleClose=()=>{

  }
  const handleEnd=(date)=>{
    console.log(date)
    const end = moment(date._d).format("YYYY-MM-DD, a h:mm")
    console.log(m_end)
    setM_end(m_end)
  }
  const handleStart=()=>{
    console.log(date)
    const m_start = moment(date._d).format("YYYY-MM-DD, a h:mm")
    console.log(m_end)
    setM_end(m_end)
  }
  const handleChangeForm=()=>{

  }
  const memoAdd=()=>{

  }
  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        events={
            memoList
          }
          dateClick={handleDateClick}
          height={"100vh"}
      />
      {/* ========================== [[  일정등록 Modal ]] ========================== */}
    <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>새로운 일정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="f_memo">         
          <Form.Group className="mb-3 row" controlId="mTitle">
            <Form.Label className="col-sm-2 col-form-label">일정명</Form.Label>
            <div className='col-sm-10'>
            <Form.Control className='form-control form-control-sm' type="text" name="m_title" onChange={handleChangeForm} placeholder="Enter 일정명" />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row" controlId="boardWriter">
            <Form.Label className="col-sm-2 col-form-label">등록자</Form.Label>
            <div className='col-sm-10'>
            <Form.Control type="text" name="m_writer" onChange={handleChangeForm} className='form-control form-control-sm' placeholder="Enter 작성자" />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row" controlId="edit-start">
            <Form.Label className="col-sm-2 col-form-label">시작</Form.Label>
            <div className='col-sm-10'>
              {/* Datetime  이전 날짜 비활성화*/}
            <Datetime dateFormat='YYYY-MM-DD' name="m_start" onChange={handleStart}isValidDate={valid}/>
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row" controlId="edit-end">
            <Form.Label className="col-sm-2 col-form-label">끝</Form.Label>
            <div className='col-sm-10'>
            <Datetime dateFormat='YYYY-MM-DD'  name="m_end" onChange={handleEnd}/>
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row" controlId="boardContent">
            <Form.Label className="col-sm-2 col-form-label">내용</Form.Label>
            <div className='col-sm-10'>
            <textarea className="form-control" name='m_content' onChange={handleChangeForm} rows="3"></textarea>
            </div>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={memoAdd}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>     
  
    </>
  )
}

export default SchedulePage
