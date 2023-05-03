import React from 'react'
import { Table } from 'react-bootstrap'
import PaymentRow from '../../payment/PaymentRow';
import { useState } from 'react';
import { useEffect } from 'react';
import { paymentListPreviewDB } from '../../../service/PaymentDBLogic';
import { useSelector } from 'react-redux';

const MyPayment = ({payListInfo}) => {
  const userId = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 

  const listHeaders = ["결제정보", "결제일", "결제금액", "결제내용"];
  const HeaderWidth = ["15%", "20%", "15%", "50%"];

  // payListInfo(컬럼명)는 상태 훅이다
  const listHeadersElements = listHeaders.map((listHeader, index) => 
    listHeader === "결제내용" ?
      <th key={index} style={{borderStyle: "solid", width: HeaderWidth[index], paddingLeft: "40px"}}>{listHeader}</th>
      : <th key={index} style={{width: HeaderWidth[index], textAlign: "center"}}>{listHeader}</th>
  )

  // 결제 리스트 출력
  const listItemsElements = payListInfo.map((listItem, index) => {
    console.log("listItemsElements 호출");

    return (
      <PaymentRow key={index} listItem={listItem} />
    )
  })


  return (
    <>
      {/* 제목 */}
      <div className="myInfo">
        <h2 style={{marginTop: "30px"}}>내 정보</h2>
      </div>
      <div className="row" style={{paddingBottom: "50px"}}>
        <Table bordered hover>
          <thead style={{backgroundColor: "#F5F5F5"}}>
            <tr style={{textAlign: "center"}}>
              {listHeadersElements}     {/* 컬럼명 */}
            </tr>
          </thead>
          <tbody>
            {listItemsElements}         {/* DB반환값 출력 */}
          </tbody>
        </Table>
        <hr />
      </div>
    </>
  )
}

export default MyPayment
