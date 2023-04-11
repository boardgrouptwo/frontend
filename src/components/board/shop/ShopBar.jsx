import React from 'react'
import { useParams } from 'react-router'
import "../../css/shop.css"

const ShopBar = () => {

  return (
    <>
      <div className="wrap_tab_reviewrank">
          <ul className="tab_reviewrank" >          
            <li className={window.location.pathname.includes('/shopmain') ? 'on' : ''}>
              <a className="link_rank" href="/shopmain?type=total" >
                <span className="txt_tab">많이 선물한</span>
              </a>
            </li>
            <li className={window.location.pathname.includes('/shopreceive') ? 'on' : ''}>
              <a className="link_rank" href="/shopreceive">
                <span className="txt_tab">받고 만족한</span>
              </a>             
            </li>
          </ul>
      </div>  
    </>
  )
}

export default ShopBar
