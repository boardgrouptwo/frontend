import React, { useState } from 'react'

const ShopRow = ({board}) => {

  const defaultimage = "http://localhost:3000/images/shop/test.jpg"

  const [hovered, setHovered] = useState(false);

  return (
    <>
        <div className="productul"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
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
              <div className="productspan">{board.product_price}원</div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ShopRow
