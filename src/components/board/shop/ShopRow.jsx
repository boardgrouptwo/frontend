import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const ShopRow = ({board}) => {

  const navigate = useNavigate();
  const defaultimage = "http://localhost:3000/images/shop/test.jpg"

  const [hovered, setHovered] = useState(false);

  const handleDetail = () => {
    console.log("상세보기")
    console.log(board.product_no)
    navigate("/shopdetail?product_no="+board.product_no)
  }

  return (
    <>
        <div className="productul"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleDetail}
          style={{ 
            cursor: "pointer", 
            boxShadow: hovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none" // hovered 상태에 따라 그림자 생성
          }}
        >
          <div className="productli">
            <div className="productdiv">
            {
              (board.product_image !== "defaultimage") ? (
                <img 
                  style={{ width: "305px", height: "300px"}}
                  src={`http://localhost:3000/images/shop/${board.product_image}`}
                  alt={board.product_title} 
                />
              ) : (
                <img 
                  style={{ width: "305px", height: "300px"}}
                  src={defaultimage}
                  alt={board.product_title} 
                />                
              )
            }
              <strong className="productstrong">{board.product_title}</strong>
              <br/>
              <div className="productspan">{board.product_price.toLocaleString()}원</div>
              <span style={{
                fontSize: "15px",
                bottom: "0",
                right: "15px",
                position: "absolute"
              }}>
                <img style={{marginRight: "10px", marginBottom:"5px", width: "20px",height: "20px"}} src="images/star.png" alt="" />
                조회수 : {board.product_hit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
    </>
  )
}

export default ShopRow
