import React from 'react'
import MainHeader from '../include/MainHeader'
import KhSponorServicebar from './KhSponorServicebar'
import KhServiceCard from './KhServiceCard'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { reviewListDB } from '../../service/KhServiceDBLogic'
import Bottom from '../include/Bottom'

const KhServiceReview = () => {
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.isLogin);  //로그인정보 가져오기

    // 카드 목록
    const [reviewList, setReviewList] = useState([])
    

    const handleWrite = () => {
    if (isLogin === false) { // 로그인한 사용자만 글쓰기 가능
      navigate(`/service/review/write`);
    } else {
      navigate("/loginError");
    }
    };

  /****** 카드에 데이터 넣기 ******/
    useEffect(()=>{
      const boardList = async() =>{
        const res = await reviewListDB()
        console.log(res.data)  
        const list = []
        res.data.forEach((item) => {
          const obj = {
            user_id: item.user_id,
            review_title: item.review_title,
            review_content: item.review_content,
            review_date: item.review_date,     
            review_image: item.review_image,          
          } 
          list.push(obj)       
        })
        setReviewList(list)
      }
      boardList();
      console.log(reviewList)
    },[])
    


      //검색 로직
  const reviewSearch = () => {    
/*     if(search === "") {
      alert("검색어를 입력하세요")      
    } else {
      const sear = {
        search
      }
      const noticeSearchList = async() => {
        const res = await noticeSearchListDB(sear)
        const list = []
        res.data.forEach((item) => {
          const obj = {
            notice_no: item.notice_no,
            notice_title: item.notice_title,
            notice_content: item.notice_content,
            notice_date: item.notice_date,
            notice_hit: item.notice_hit
          }
          list.push(obj)
        })
        setNoticeList(list)         
      }
      console.log(noticeList)
      noticeSearchList()
    } */
  }


  return (
    <>
      <MainHeader />
      <KhSponorServicebar />
      <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
  <h2 style={{marginTop: "30px", marginRight: "10px"}}>봉사활동 리뷰 게시판</h2>
  <Button variant="success" onClick={handleWrite} style={{marginTop:"25px", marginLeft:"10px"}}>
    글쓰기              
  </Button> 
</div>

        <br />
        {reviewList.map((board,index) => (
        <KhServiceCard key={index} board={board}/>
        ))}

        </div>
        <Bottom />
    </>
  )
}

export default KhServiceReview
