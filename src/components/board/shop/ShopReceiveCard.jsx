import React from 'react';
import Slider from 'react-slick';
import "../../css/slider.css"
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { productReceiveListDB } from '../../../service/ShopDBLogic';
import styled from 'styled-components';
import ShopReceiveRow from './ShopReceiveRow';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ShopReceiveRow2 from './ShopReceiveRow2';


const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #C0C0C0;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;    
`;

/****** OverlayTrigger 효과 ******/
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      조회수 기준 랭킹입니다
    </Tooltip>
  );

/****** slides 움직이게 효과 ******/
const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,

/******반응형 웹 구현 옵션 *****/
  responsive: [ 
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


const ShopReceiveCard = ({board}) => {
  /******* 하단 데이터 ******/
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type= searchParams.get('type');
  const[protype, setProType] = useState({
    select_type: type
  })

  // 상품 목록
  const [productList, setProductList] = useState([])
  const [productBasicList, setProductBasicList] = useState([])

  //
  const handleTotal = () => {
    setProType({select_type: "total"})
    navigate("/shopreceive?type=total")
  }

  const handleLow = () => {
    setProType({select_type: "low"})
    navigate("/shopreceive?type=low")
  }

  const handleMiddle = () => {
    setProType({select_type: "middle"})
    navigate("/shopreceive?type=middle")
  }

  const handleHigh = () => {
    setProType({select_type: "high"})
    navigate("/shopreceive?type=high")
  }




  /****** 하단 카드에 productList 데이터 넣기 ******/
  useEffect(() => {
    const boardList = async() => {
      
      let page_type = {}
      if(protype.select_type==="total") {
        page_type = {select_type : "total"}
      } else if(protype.select_type==="low") {
        page_type = {select_type : "low"}
      } else if(protype.select_type==="middle") {
        page_type = {select_type : "middle"}      
      } else if(protype.select_type==="high") {
        page_type = {select_type : "high"}
      } 
      console.log(page_type);

      const res = await productReceiveListDB(page_type)
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
  },[protype])


  /****** 상단 카드에 productBasicList 데이터 넣기 ******/
  useEffect(()=>{
    const basicBoardList = async() => {
      let page_type = {select_type : "basic"}
      const response = await productReceiveListDB(page_type)
      console.log(response.data)
      const list = []
      response.data.forEach((item) => {
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
      setProductBasicList(list)
    }
    basicBoardList();
  },[])


  /****** 사용x 상단 카드에 데이터 넣기1 ***** 주소바뀔 때 같이 바뀜*/
/* const slides = productList.map((board, index) => {
    return (
      <div className="slider-card" key={board.product_title}>
        <div className="slider-card-number">{index+1}</div>
        <div className="slider-card-image" style={{backgroundImage:`url(/images/shop/${board.product_image})`, backgroundSize: "cover" }} />
        <div className="slider-card-info">
          <h3 className="slider-card-title">{board.product_title}</h3>
          <p className="slider-card-description" style={{float:'bottom'}}>{board.product_price.toLocaleString()}원</p>
        </div>
      </div>
    );
  }); */


    const slides = productBasicList.map((board, index) => {
    return (
      <div className="slider-card" key={board.product_title}>
        <div className="slider-card-number">{index+1}</div>
        <div 
          className="slider-card-image" 
          style={{backgroundImage:`url(/images/shop/${board.product_image})`, backgroundSize: "cover" }} 
          onClick={() => navigate("/shopdetail?product_no="+board.product_no)}
        />
        <div className="slider-card-info">
          <h3 className="slider-card-title">{board.product_title}</h3>
          <p className="slider-card-description" style={{float:'bottom'}}>{board.product_price.toLocaleString()}원</p>
        </div>
      </div>
    );
  });



  return (
    <>

    {/* 상단 TOTAL RANKING 부분 */}
        <div style={{ paddingTop: "40px", paddingBottom: "70px", backgroundColor: "#F8B400" }}>
            <p style={{ fontSize: "25px", color: "white", margin: "0px 0px 20px 45%" }}>TOTAL RANKING
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <img src="/images/shop/question-mark.png" alt="question_mark" style={{marginBottom:"5px", marginLeft:"5px"}}/>
            </OverlayTrigger>
            </p>
            <Slider {...settings}>{slides}</Slider>
        </div>


    {/* 중간 항목 선택 부분 */}
        <div style={{ margin: "50px", marginLeft: "15%" }}>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handleTotal}
                        className={`${type === 'total' ? 'selecton' : 'selectoff'}`}>
                        전체
                    </Button>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handleLow}
                        className={`${type === 'low' ? 'selecton' : 'selectoff'}`}>
                        1-2만원
                    </Button>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handleMiddle}
                        className={`${type === 'middle' ? 'selecton' : 'selectoff'}`}>
                        2-5만원
                    </Button>
                </li>
                <li style={{ marginRight: '10px' }}>
                    <Button onClick={handleHigh}
                        className={`${type === 'high' ? 'selecton' : 'selectoff'}`}>
                        5만원 이상
                    </Button>
                </li>
            </ul>
        </div>

    {/* 하단 목록 부분 */}
        <div className="prodiv">        
          {productList.map((board,index) => (
            <ShopReceiveRow2 key={index} board={board} />
          ))}
      </div>
    </>
    );
};

export default ShopReceiveCard;