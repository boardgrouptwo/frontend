import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { productReceiveListDB } from '../../service/ShopDBLogic';
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
  const defaultimage = "http://localhost:3000/images/shop/test.jpg"

  const [hovered, setHovered] = useState(false);

  const handleDetail = () => {
    console.log("상세보기")
    console.log(board.product_no)
    navigate("/")
  }



  /****** 하단 카드에 productList 데이터 넣기 ******/
  useEffect(() => {
    const boardList = async() => {

      const res = await productReceiveListDB("total")
      console.log(res.data)
      const list = []
      res.data.forEach((item) => {
        const obj = {
          product_no: item.product_no,
          product_title: item.product_title,
          product_price: item.product_price,
          product_image: item.product_image,     
          product_hit: item.product_hit,
          product_detail: item.product_detail,
        } 
        list.push(obj)       
      })
      setProductList(list)
    }
    boardList();
    console.log(productList)
  })



  return (
    <>

<div className="receive-card-container" onClick={handleDetail} style={{height:"630px"}}>

<div className="receive-card-header" style={{backgroundColor:"#4a9e5c"}}>

  <div className="receive-card-title" style={{height:"40px", marginLeft:"5px", color:"white"}}> 봄 맞이 요양원 대청소</div>
  <div className="receive-card-rank" style={{color:"white", textAlign:"right", marginRight:"10px"}}>
  <span className="rank-text" >작성자 : tomato</span>

  </div>
</div>
<div className="receive-card-footer" style={{display:"block", padding: "0"}}>
<div>
          <img 
            style={{ width: "430px", height: "400px", borderRadius:"0%", objectFit: "cover"}}
            src={`http://localhost:3000/images/shop/KakaoTalk_20230323_092346383.jpg`}
            alt="설명"
            onClick={handleDetail}
          />
</div>

  <div className="rank-text" style={{textAlign:"right", margin:"10px"}}> 등록일자 : 2023-04-29 </div>

  <div className="receive-card-detail" style={{margin:"10px"}}>다른곳에서 쉽게 할 수 없는 체험을 할 수 있어서 너무 좋은 경험이였습니다. </div>


</div>
</div>


    </>
    );
};

export default KhServiceCard;