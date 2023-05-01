import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { reviewDeleteDB } from '../../service/KhServiceDBLogic';
import Swal from 'sweetalert2';


const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #C0C0C0;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;    
`;


const KhServiceCard = ({board}) => {
  const isLogin = useSelector(state => state.isLogin);  //로그인정보 가져오기
  const user = useSelector(state => state.nickname); //user 닉네임 가져오기
  const token = useSelector(state => state.token); 


  // 상품 목록
  const navigate = useNavigate();
  const defaultimage = "http://localhost:3000/images/service/garden.jpg"
  const [showFooter, setShowFooter] = useState(false);
  const toggle = () => {
    setShowFooter(!showFooter);
  }

  
  const reviewDelete = async () => {
    const res = await reviewDeleteDB(board, token);
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
      navigate("/service/review")
    }
    window.location.reload()
  }


  return (
    <>

      <div className="receive-card-container" style={{width:"300px", height:"550px", float:"left", marginRight: "20px"}}>
        <div className="receive-card-header" style={{backgroundColor:"#4a9e5c"}}>
          <div className="receive-card-title" style={{height:"40px", marginLeft:"5px", color:"white"}}> {board.review_title} </div>
          <div className="receive-card-rank" style={{color:"white", textAlign:"right", marginRight:"10px"}}>
            <span className="rank-text" >작성자 : {board.user_id}</span>
          </div>
        </div>
      <div className="receive-card-footer" style={{display:"block", padding: "0"}}>
        <div>
          {
            (board.review_image !== "defaultimage") ? (
              <img 
                style={{ width: "300px", height: "300px", borderRadius:"0%", objectFit: "cover"}}
                src={`http://localhost:3000/images/service/${board.review_image}`}
                alt={board.review_title}
              />
            ) : (
              <img 
                style={{ width: "300px", height: "300px", borderRadius:"0%", objectFit: "cover"}}
                src={defaultimage}
                alt={board.review_title} 
              />                
            )
          }
        </div>
        
          <div className="rank-text" style={{textAlign:"right", margin:"10px"}}> 
            등록일자 : {new Date(board.review_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
            { 
            (user === board.user_id) ? (
              <img 
                style={{ width: "20px", height: "20px", borderRadius:"0%", objectFit: "cover", marginBottom:"4px", marginLeft:"5px"}}
                src={`http://localhost:3000/images/service/delete.png`}
                alt={board.review_title}
                onClick={reviewDelete}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
              />
            ) : (
              <img />                
            )
          }
          
          </div>
          



          <div className="receive-card-detail" style={{margin:"10px"}}>  
            <div dangerouslySetInnerHTML={{__html:board.review_content}}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KhServiceCard;