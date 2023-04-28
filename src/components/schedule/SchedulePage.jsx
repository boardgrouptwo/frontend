import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import React, { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment/moment'
import interactionPlugin from "@fullcalendar/interaction";
import MainHeader from '../include/MainHeader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SchedulePage = () => {

  const token =useSelector(state => state.token);
  const[title,setTitle] = useState("") 
  const[content,setContent] = useState("")
  const handleTitle = useCallback((e) => {
    setTitle(e)
  },[])
  const handleContent = useCallback((e) => { //QuillEditor에서 담김 - 태그포함된 정보
    setContent(e)
  },[])
  const quillRef = useRef()

 //오늘 이전 날짜 비활성화
 const yesterday=moment().subtract(1,'day')
 const valid=(current)=>{
     return current.isAfter(yesterday)
 }
const [show,setShow]=useState(false)
const [m_end,setM_end]=useState("")
  const[memoList,setMemoList]=useState([])
const navigate=useNavigate()
  const role=useState();
  const handleDateClick=(arg)=>{
    console.log(arg.dateStr)
    //if (role === 'admin') {
      // 관리자 페이지이동
      navigate('/memo')
   // } else {
      // 일반 사용자는 모달창이 열리지 않음
      //console.log('일반유저 작성불가');
   // }
  }
  const handleClose=()=>{
setShow(false)
  }
  const handleEnd=(date)=>{
    const end = moment(date._d).format("YYYY-MM-DD, a h:mm")
    console.log(m_end)
    setM_end(m_end)
  }
  const handleStart=(date)=>{
    const m_start = moment(date._d).format("YYYY-MM-DD, a h:mm")
    console.log(m_end)
    setM_end(m_end)
  }
  const handleChangeForm=()=>{

  }

  return (
    <>
     <MainHeader/>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        locale="ko"
        events={
            memoList
          }
          dateClick={handleDateClick}
          height={"500px"}
      />
     
  
    </>
  )
}

export default SchedulePage
