import React, { useEffect, useState } from 'react'
import MainHeader from '../../include/MainHeader'
import ShopBar from './ShopBar'
import "../../css/shop.css"
import styled from 'styled-components'
import { productListDB } from '../../../service/ShopDBLogic'
import ShopRow from './ShopRow'
import { useLocation, useNavigate } from 'react-router'

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #C0C0C0;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;    
`;

const ShopMain = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type= searchParams.get('type');
  const[protype, setProType] = useState({
    select_type: type
  })
  // 상품 목록
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const boardList = async() => {
      
      let page_type = {}
      if(protype.select_type==="total") {
        page_type = {select_type : "product_no"}
      } else if(protype.select_type==="hit") {
        page_type = {select_type : "product_hit"}
      } else if(protype.select_type==="price") {
        page_type = {select_type : "product_price"}      
      } else if(protype.select_type==="register") {
        page_type = {select_type : "product_date"}
      }

      const res = await productListDB(page_type)
      console.log(res.data)
      const list = []
      res.data.forEach((item) => {
        const obj = {
          product_no: item.product_no,
          product_title: item.product_title,
          product_price: item.product_price,
          product_image: item.product_image,     
          product_hit: item.product_hit     
        } 
        list.push(obj)       
      })
      setProductList(list)
    }
    boardList();
    console.log(productList)
  },[protype])


  const handleTotal = () => {
    setProType({select_type: "total"})
    navigate("/shopmain?type=total")
  }

  const handleHit = () => {
    setProType({select_type: "hit"})
    navigate("/shopmain?type=hit")
  }

  const handlePrice = () => {
    setProType({select_type: "price"})
    navigate("/shopmain?type=price")
  }

  const handleRegister = () => {
    setProType({select_type: "register"})
    navigate("/shopmain?type=register")
  }
  return (
    <>
      <MainHeader/> 
      <ShopBar/>
      <div style={{margin: "50px", marginLeft:"15%"}}>
        <ul style={{display: 'flex', listStyle: 'none', padding: 0}}>
          <li style={{marginRight: '10px'}}>
            <Button onClick={handleTotal} 
              className={`${
                type==='total' ? 'selecton' : 'selectoff'
                }`}>
              전체
            </Button>
          </li>
          <li style={{marginRight: '10px'}}>
            <Button onClick={handleHit}
              className={`${
                type==='hit' ? 'selecton' : 'selectoff'
                }`}>
              조회수
            </Button>
          </li>
          <li style={{marginRight: '10px'}}
          >
            <Button onClick={handlePrice}
              className={`${
                type==='price' ? 'selecton' : 'selectoff'
                }`}>
              가격순
            </Button>
          </li>
          <li style={{marginRight: '10px'}}>
            <Button onClick={handleRegister}
              className={`${
                type==='register' ? 'selecton' : 'selectoff'
                }`}>
              등록순
            </Button>
          </li>
        </ul>
      </div>

      <div className="prodiv">        
      {productList.map((board,index) => (
        <ShopRow key={index} board={board} />
        ))}
      </div>
    </>
  )
}

export default ShopMain
