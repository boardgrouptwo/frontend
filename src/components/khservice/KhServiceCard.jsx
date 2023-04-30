import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';


const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #C0C0C0;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;    
`;


const KhServiceCard = ({board}) => {
  /******* 하단 데이터 ******/

  // 상품 목록
  const [productList, setProductList] = useState([])

  const navigate = useNavigate();
  const defaultimage = "http://localhost:3000/images/service/garden.jpg"

  const [showFooter, setShowFooter] = useState(false);
  const toggle = () => {
    setShowFooter(!showFooter);
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