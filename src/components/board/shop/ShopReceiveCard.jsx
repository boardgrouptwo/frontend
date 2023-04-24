import React from 'react';
import Slider from 'react-slick';
import "../../css/slider.css"
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { productListDB } from '../../../service/ShopDBLogic';
import ShopRow from './ShopRow';
import styled from 'styled-components';

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #C0C0C0;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;    
`;


const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,

  responsive: [ // 반응형 웹 구현 옵션
  {
      breakpoint: 1200, // 화면 사이즈 1200px
      settings: {
        slidesToShow: 3,
      }
  },
  {
    breakpoint: 1023,
    settings: {
      slidesToShow: 3
    }
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 1
    }
  }
]
};


const data = [
  {image:"images/shop/sample1.jpg",title:" 1. This is a title",description:"This is a description"},
  {image:"images/shop/sample2.jpg",title:" 2. This is a second title",description:"This is a second description"},
  {image:"images/shop/sample3.jpg",title:" 3. This is a third title",description:"This is a third description"},
  {image:"images/shop/sample4.jpg",title:" 4. This is a fourth title",description:"This is a fourth description"},
  {image:"images/shop/sample5.jpg",title:" 5. This is a fifth title",description:"This is a fifth description"},
  {image:"images/shop/sample6.jpg",title:" 6. This is a sixth title",description:"This is a sixth description"},
  {image:"images/shop/sample7.jpg",title:" 7. This is a seventh title",description:"This is a seventh description"},
  {image:"images/shop/sample8.jpg",title:" 8.This is a seventh title",description:"This is a seventh description"},
  {image:"images/shop/sample9.jpg",title:" 9.This is a seventh title",description:"This is a seventh description"},
  {image:"images/shop/sample10.jpg",title:" 10.This is a seventh title",description:"This is a seventh description"},
];










const ShopReceiveCard = () => {
  const slides = data.map((item) => {
    return (
      <div className="slider-card" key={item.title}>
        <div className="slider-card-image" style={{backgroundImage:`url(${item.image})`, backgroundSize: "cover"}} />
        <div className="slider-card-info">
          <h3 className="slider-card-title">{item.title}</h3>
          <p className="slider-card-description">{item.description}</p>
        </div>
      </div>
    );
  });


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
        <div style={{ paddingTop: "40px", paddingBottom: "70px", backgroundColor: "#2c786c" }}>
            <p style={{ fontSize: "25px", color: "white", margin: "0px 0px 20px 45%" }}>TOTAL RANKING</p>
            <Slider {...settings}>{slides}</Slider>
        </div>

        <div style={{ margin: "50px", marginLeft: "15%" }}>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handleTotal}
                        className={`${type === 'total' ? 'selecton' : 'selectoff'}`}>
                        전체
                    </Button>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handleHit}
                        className={`${type === 'hit' ? 'selecton' : 'selectoff'}`}>
                        조회수
                    </Button>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handlePrice}
                        className={`${type === 'price' ? 'selecton' : 'selectoff'}`}>
                        가격순
                    </Button>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handleRegister}
                        className={`${type === 'register' ? 'selecton' : 'selectoff'}`}>
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
    
    );
};

export default ShopReceiveCard;