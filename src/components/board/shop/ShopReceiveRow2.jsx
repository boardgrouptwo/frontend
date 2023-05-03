import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import "../../css/slider.css"

const ShopReceiveRow2 = ({board}) => {

  const navigate = useNavigate();
  const defaultimage = "http://localhost:3000/images/shop/test.jpg"

  const [hovered, setHovered] = useState(false);

  const handleDetail = () => {
    console.log("상세보기")
    console.log(board.product_no)
    navigate("/shopdetail?product_no="+board.product_no)
  }

  //조회수에 따른 별이미지 추가
  const generateStars = () => {
    const stars = [];
    let count = 0;
    if(board.product_hit > 500) {
      count = 400
    } else {
      count = board.product_hit
    }

    for (let i = 0; i <= Math.floor(count / 100); i++) {
      stars.push(<img src="images/star.png" alt="" key={i} style={{ width: "20px", height: "20px", marginBottom:"2%"}}/>);
    }

    return stars;
  }


  return (
    <>


    {/* 하단 목록 부분2 */}
    <div className="receive-card-container" onClick={handleDetail} >

        <div className="receive-card-header">
          <div>
        {
        (board.product_image !== "defaultimage") ? (
          <img 
            style={{ width: "180px", height: "180px", borderRadius:"10%", float:"left"}}
            src={`http://localhost:3000/images/shop/${board.product_image}`}
            alt={board.product_title} 
            onClick={handleDetail}
          />
        ) : (
          <img 
            style={{ width: "180px", height: "180px", borderRadius:"10%", float:"left"}}
            src={defaultimage}
            alt={board.product_title} 
            onClick={handleDetail}
          />                
        )
      }
      </div>
          <div className="receive-card-title">{board.product_title}</div>
          <div className="receive-card-price">{board.product_price.toLocaleString()}원</div>
          <div className="receive-card-rank">
          <span className="stars" style={{ width: "10%", height: "10%" }}>{generateStars()}</span> 
          <span className="rank-text">조회수 : {board.product_hit}</span>

          </div>
        </div>
        <div className="receive-card-footer">

          <div className="receive-card-detail">"{board.product_detail}"</div>
        </div>
      </div>
    </>
  )
}

export default ShopReceiveRow2
