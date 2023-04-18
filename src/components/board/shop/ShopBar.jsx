import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import "../../css/shop.css"

const ShopBar = () => {

  return (
    <>
      <div className="wrap_tab_reviewrank">
          <ul className="tab_reviewrank" >          
            <li className={window.location.pathname.includes('/shopmain') ? 'on' : ''}>
              <Link to="/shopmain?type=total" className="link_rank">
                <span className="txt_tab">많이 선물한</span>
              </Link>
            </li>
            <li className={window.location.pathname.includes('/shopreceive') ? 'on' : ''}>
              <Link to="/shopreceive" className="link_rank">
                <span className="txt_tab">받고 만족한</span>
              </Link>             
            </li>
          </ul>
      </div>  
    </>
  )
}

export default ShopBar
