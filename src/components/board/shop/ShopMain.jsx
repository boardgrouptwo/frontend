import React from 'react'
import MainHeader from '../../include/MainHeader'
import ShopBar from './ShopBar'
import "../../css/shop.css"
import styled from 'styled-components'
const ShopMain = () => {


  const DIV = styled.div`
    width: auto;
    height: auto;
    margin : 50px;
    margin-left: 15%;
    margin-right: 15%;
    padding: 0;  
  `

  const PRODUCTDIV = styled.div`
    width: 305px;
    height: 420px;
 /*    border: 1px solid blue; */
    text-align: center;
    box-sizing: border-box;
  `

  const PRODUCTUL = styled.ul`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    flex-basis: calc(25% - 10px);
    
  `

  const PRODUCTLI = styled.li`
    vertical-align: top;
    list-style: none;
    margin : 10px;    
  `

  const SPAN = styled.span`
    font-size: 20px;
    line-height: 22px;
  `

  const STRONG = styled.strong`
    font-size: 20px;
  `
  return (
    <>
    <MainHeader/> 
    <ShopBar/>

    <DIV>
      <PRODUCTUL>
        <PRODUCTLI>
          <PRODUCTDIV>
            <img 
              style={{ width: "305px", height: "300px"}}
              src="http://localhost:3000/images/shop/test.jpg"/>
            <STRONG>피카츄</STRONG>
            <br/>
            <SPAN>38,000원</SPAN>
          </PRODUCTDIV>
        </PRODUCTLI>
        <PRODUCTLI>

          <PRODUCTDIV>
          <img 
              style={{ width: "305px", height: "300px"}}
              src="http://localhost:3000/images/shop/test1.jpg"/>
            <STRONG>파이리</STRONG>
            <br/>
            <SPAN>25,000원</SPAN>
          </PRODUCTDIV>
        </PRODUCTLI>
        <PRODUCTLI>
          <PRODUCTDIV>
          <img 
              style={{ width: "305px", height: "300px"}}
              src="http://localhost:3000/images/shop/test2.gif"/>
            <STRONG>꼬부기</STRONG>
            <br/>
            <SPAN>30,000원</SPAN>
          </PRODUCTDIV>
        </PRODUCTLI>
        <PRODUCTLI>
          <PRODUCTDIV>
          <img 
              style={{ width: "305px", height: "300px"}}
              src="http://localhost:3000/images/shop/test3.jpg"/>
            <STRONG>파치리스</STRONG>
            <br/>
            <SPAN>50,000원</SPAN>
          </PRODUCTDIV>
        </PRODUCTLI>
        <PRODUCTLI>
          <PRODUCTDIV>
            1  
          </PRODUCTDIV>
        </PRODUCTLI>



      </PRODUCTUL>
    </DIV>
    

    </>
  )
}

export default ShopMain
