import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const ShopReceiveRow = ({board}) => {

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
  <div className="productli">
  <div style={{ display: "flex" }}>
    <div style={{ marginRight: "20px" }}>
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
    </div>
    <div>
      <strong className="productstrong">{board.product_title}</strong>
      <br/>
      <div className="productspan">{board.product_price.toLocaleString()}원</div>
      <span style={{
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        marginBottom: "5px"
      }}>
        <img style={{ marginRight: "10px", width: "20px", height: "20px" }} src="images/star.png" alt="" />
        조회수 : {board.product_hit.toLocaleString()}
      </span>
      <div className="productspan" style={{ fontSize:'13px'}}>
        "{board.product_detail}"
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default ShopReceiveRow
