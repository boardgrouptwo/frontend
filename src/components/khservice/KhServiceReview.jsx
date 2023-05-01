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
            review_no: item.review_no,
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
    


  return (
    <>
      <MainHeader />
      <KhSponorServicebar />
      <div className='container' style={{position: "relative"}}>
        <div className="page-header" ></div>
        <div style={{display: "flex", alignItems: "center"}}>
          <h2 style={{marginTop: "30px", marginRight: "10px"}}>봉사활동 리뷰 게시판</h2>
  {/* <Button variant="success" onClick={handleWrite} style={{marginTop:"25px", marginLeft:"10px"}}> 글쓰기 </Button>  */}
        </div>

<br />

    {/* 후기 추가 카드 */}
        <div className="receive-card-container" style={{width:"300px", height:"550px", float:"left", marginRight: "20px"}} onClick={handleWrite}>
          <div className="receive-card-header" style={{backgroundColor:"#4a9e5c"}}>
            <div className="receive-card-title" style={{height:"62px", marginLeft:"5px", color:"white"}}> 새로운 후기를 기다립니다 </div>
            <div className="receive-card-rank" style={{color:"white", textAlign:"right", marginRight:"10px"}}>
              <span className="rank-text" ></span>
            </div>
          </div>
        <div className="receive-card-footer" style={{display:"block", padding: "0"}}>
        <div>
          <img 
              style={{ width: "300px", height: "300px", borderRadius:"0%", objectFit: "cover", transform: "scale(0.5)", transition: "transform .2s"}}
              src={`http://localhost:3000/images/service/addButton.png`}
              alt="추가하기"
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(0.6)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(0.5)"}
          />
        </div>
          <div className="rank-text" style={{textAlign:"center", margin:"10px"}}> (회원전용 서비스) </div>
          <div className="receive-card-detail" style={{textAlign:"center", margin:"10px"}}>  
            <div> 당신의 후기를 남겨보세요</div>
          </div>
        </div>
      </div>
{/* 후기 카드 */}
        {reviewList.map((board,index) => (
        <KhServiceCard key={index} board={board}/>
        ))}
      </div>
    <Bottom />
    </>
)
}

export default KhServiceReview
