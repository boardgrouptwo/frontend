import React from 'react'

const ShopRow = ({board}) => {

  const defaultimage = "http://localhost:3000/images/shop/test.jpg"

  return (
    <>
        <div className="productul">
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
