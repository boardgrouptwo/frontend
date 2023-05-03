import React, { useCallback, useEffect, useState } from 'react'
import MainHeader from '../../include/MainHeader'
import MyPageBar from './MyPageBar'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { VisitMDeleteDB, VisitMUpdateDB, VisitManagerListDB, visitDateDB } from '../../../service/VisitDBLogic';
import Swal from 'sweetalert2';
import moment from 'moment';

const VisitPageDetail = () => {
const userid = useSelector((state) => state.userid);
const token = useSelector(state => state.token); 

const navigate = useNavigate();
const [request, setRequest] = useState(null);
const [visit_start,setVisit_start]=useState('');
const [visit_end,setVisit_end]=useState('');
const [dbid, setDbid] = useState()
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const visit_num = searchParams.get('visit_no');
  // 면회일정
  const [ visitDate, setVisitDate ] = useState({});
  //스케줄 번호
  const[pboard, setPBoard] = useState({
    visit_no : visit_num,
})

//면회 예약 내용
const[board, setBoard] = useState({
  visit_no: 0,
  user_id: "",
  visit_start:"",
  visit_end:"",
})

//수정화면 모달 마운트 여부 결정 - false(안보임), true(보임)
const[show, setShow] = useState(false)
const[rshow, setRshow] = useState(false)
const handleShow = () => {
  setShow(true)
  setVisit_start(board.visit_start)
  setVisit_end(board.visit_end)
}
const handleClose = () => setShow(false)

//수정 후 useEffect가 되도록 설정
const [rend, setRend] = useState(0)

useEffect(() => {
    const scheduleDetail = async () => {
      const res = await VisitManagerListDB(pboard)
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      setBoard({
        visit_no: jsonDoc[0].visit_no,
        visit_start: jsonDoc[0].visit_start,
        visit_end: jsonDoc[0].visit_end,
      })
      if (jsonDoc[0].cal_result === 1) {
        setRshow(true)
      }
      if (jsonDoc[0].user_id != null) {
        setDbid(jsonDoc[0].user_id)
        console.log("Dbid : ", jsonDoc[0].user_id)
      }
    }
    scheduleDetail()
  }, []) 
  //삭제
const scheduleDelete = async() => {
    const res = await VisitMDeleteDB(pboard);

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

const scheduleUpdate = async () => {
    const board = {
        visit_num,
        visit_start,
        visit_end,
    }   
    const res = await VisitMUpdateDB(board)
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
    navigate(`/mypage`)
}

  
  const handleChangeForm=()=>{

  }
  const handleStart = (date) => {
    const cal_start = moment(date).format("YYYY-MM-DD");
    console.log(visit_start);
    setVisit_start(visit_start);
  };
const handleEnd = (date) => {
  const visit_end = moment(date).format("YYYY-MM-DD");
  console.log(visit_end);
  setVisit_end(visit_end);
};
  // 면회일정
  const userVisitDate = async () => {
    console.log("userVisitDate 호출");

    const user = {
      userid: userid,
    };

    const res = await visitDateDB(user, token);
    
    const obj = {
      elder_id: res.data[0].user_id,              // ID
      visit_date: res.data[0].visit_date,          // 면회 날짜
    }
    console.log("면회일정 ==> " + obj);
    
    setVisitDate(obj)
  }
return (
    <>
      <MainHeader/>
      <MyPageBar/>
      
    </>
  );
};

export default VisitPageDetail
