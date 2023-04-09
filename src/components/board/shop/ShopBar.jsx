import React from 'react'
import "../../css/shop.css"

const ShopBar = () => {
  return (
    <>
      <div className="wrap_tab_reviewrank">
          <ul className="tab_reviewrank" >
            <li className="on">
              <a className="link_rank" href="" >
                <span className="txt_tab">많이 선물한</span>
              </a>
            </li>
            <li>
              <a className="link_rank" href="">
                <span className="txt_tab">받고 만족한</span>
              </a>             
            </li>
          </ul>
      </div>  
    </>
  )
}

export default ShopBar
