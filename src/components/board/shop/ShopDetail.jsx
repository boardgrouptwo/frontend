import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { noticeListDB } from '../../../service/NoticeDBLogic';
import { productHitDB, productListDB } from '../../../service/ShopDBLogic';
import MainHeader from '../../include/MainHeader'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';

const PRODUCTSPAN = styled.span`  
  font-size: 30px;
`
const SPANPRICE = styled.span`  
  font-size: 40px;
`
const COUNTDIV = styled.div`  
  width: 400px;
  height: 700px;  
  position: relative;
  margin-left: 30px;
  flex-shrink: 0;
  
`

const DIV = styled.div`
  width: 400px;
  height: 300px;
  top: 10px;
  left: 550px;
  position: absolute;
`

const CONTAINER = styled.div`
  padding-left: 20%;
  padding-top: 2%;
  display: flex;
  
`

const ShopDetail = () => {

  const navigate = useNavigate();
  const defaultimage = "http://localhost:3000/images/shop/test.jpg"

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const product_no = searchParams.get('product_no');

  //상품 가격
  let first_price = 0;
  const[price, setPrice] = useState(0)
  const[count, setCount] = useState(1)

  // 상품 번호
  const[pboard, setPBoard] = useState({
    product_no: product_no,
  })

  // 상품 내용
  const[product, setProduct] = useState({
    product_title: "",
    product_price: "",
    product_date: "",
    product_image: "",
    product_hit: 0,
  })

  useEffect(()=>{
    const productDetail = async() => {

      const productHit = async() => {
        const res = await productHitDB(pboard)
      }
      productHit()

      const res = await productListDB(pboard)
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      setProduct({
        product_title: jsonDoc[0].product_title,
        product_price: jsonDoc[0].product_price,
        product_date: jsonDoc[0].product_date,
        product_image: jsonDoc[0].product_image,
        product_hit: jsonDoc[0].product_hit,
      })      
      setPrice(jsonDoc[0].product_price)
    }
    productDetail()
    
    console.log(product)
  },[])

  const handleUp = () => {
    const cnt = count+1
    setCount(cnt)
    const product_price = product.product_price*cnt;
    setPrice(product_price)
  }

  const handleMinus = () => {
    if(count>1) {
      const cnt = count-1
      setCount(cnt)
      const product_price = product.product_price*cnt;
      setPrice(product_price)
    }

  }

  return (
    <>
      <MainHeader/>
      <CONTAINER>      
      <div style={{
        /* marginTop: "2%", marginLeft: "20%", */ position: "relative"
        ,border: "1px solid lightgray"
        ,width: "1000px", height: "700px", padding: "0"
        ,flexShrink: "0"
      }}>
        <div style={{width: "520px", height:"60px", backgroundColor:"lightgray"}}/>        
        {
          (product.product_image !== "defaultimage") ? (
            <img 
            style={{ width: "520px", height: "520px"}}
            src={`http://localhost:3000/images/shop/${product.product_image}`}
            alt={product.product_title} 
            />
          ) : (
            <img 
            style={{ width: "305px", height: "300px"}}
            src={defaultimage}
            alt={product.product_title} 
            />                
            )
        }
        <div style={{width: "520px", height:"60px", backgroundColor:"lightgray"}}/>
        <DIV>
          <PRODUCTSPAN>
           [{product.product_title}]
          </PRODUCTSPAN>
          <br/>
          <hr/>
          <SPANPRICE>
            {product.product_price}원
            <br/>
          </SPANPRICE>
          <img src="images/star.png" alt="" />
          <img src="images/star.png" alt="" />
          <img src="images/star.png" alt="" />
          <img src="images/star.png" alt="" />
          <img src="images/star.png" alt="" />
          <hr/>
          <div>
            <img src="images/truck.png" style={{marginLeft: "3px"}}/>
            배송비포함 도서산간 추가 배송비 안내
          </div>
          <hr/>
          <div style={{
          width: "420px", height:"400px",
          border: "1px solid lightgray",
          paddingLeft: "10px"
          }}>
            공지사항
            <br/>
            [10주년 우리카드 결제혜택]
            <br/>
            (순금류, 도서, 지류상품권 등 위험/고위험 상품 제외)
            <br/>
            ※유의사항※
            <br/>
            - 카카오페이에 등록된 우리카드 결제시에만 할인 적용
            <br/>
            (선불, 기프트, 하이브리드, 기업/법인, BC카드 제외)
            <br/>            
            - 할인을 선택한 상태이더라도 카드 신규등록 시 할인             
            미선택으로 변경되므로 카드 등록 후 할인 재 선택 후 적용버튼
            눌러야 할인 적용
            <br/>
            - 1회 결제기준 총 결제금액(쿠폰사용 등 추가 금액 적용가)에 할인 적용
            <br/>
            - 결제 전체 취소 후 기간 내 재결제 시 할인 적용/ 결제 부분취소 후 재결제 시 할인 미적용
            <br/>
            - 부분 취소 시, 결제금액 취소 비율만큼 할인 취소됨
            <br/>
            - 본 이벤트는 조기 종료될 수 있음
        </div>
        </DIV>
      </div> 
        <COUNTDIV>
          <div style={{width: "100%", height: "60px", marginBottom:"30px"}}>
            <img style={{width: "70px", height: "70px"}} src="images/delivery.png" alt="" />
            <span style={{fontWeight: "bold"}}>도착보장상품 1일배송</span>              
            </div>
            <div style={{width:"100%", height:"60px",padding:"10px",paddingTop:"13px", backgroundColor:"lightgray"}}>
              <img style={{width: "25px", height:"25px"}}src="images/location.png"/>
              <span style={{fontSize:"20px", fontWeight: "bold"}}>서울시 강남 도착기준</span>
            </div>
            <span style={{marginLeft: "10px"}}>택배 배송 | 무료배송</span>
            <br/>
            <span style={{marginLeft:"10px" ,color: "lightgray"}}>제주 추가 3,000원, 제주 외 도서지역 8,000원</span>
            <hr/>
          
          <div style={{width: "100%", height: "80px",paddingTop:"10px", backgroundColor: "#fafafa"}}>
            <span style={{margin: "20px", fontSize: "20px"}}>총 금액 : </span>
            <span style={{fontSize: "30px"}}>{price}원</span>
          </div>
          <div style={{marginTop: "20px"}}>            
            <button style={{backgroundColor: "white", border:"none"}}onClick={handleMinus}>
              <img style={{width: "50px", height: "50px"}}src="images/minus.png" alt="" />
            </button>
            <span style={{fontSize: "20px",fontWeight: "bold", marginLeft: "30px", marginRight: "30px"}}>상품 수량 : {count}개</span>
            <button style={{backgroundColor: "white", border:"none"}}onClick={handleUp}>
              <img style={{width: "60px", height: "60px"}}src="images/plus.png" alt="" />
            </button>
          </div>
          <div style={{marginTop: "20px"}}>
            <Button style={{marginRight:"10px"}} variant="success">추천하기</Button>
            <Button style={{marginRight:"10px"}} variant="success">장바구니</Button>
            <Button variant="success">상품구매</Button>
          </div>
        </COUNTDIV>
      </CONTAINER>
    </>
  )
}

export default ShopDetail
