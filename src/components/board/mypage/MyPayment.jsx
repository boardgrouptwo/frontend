import React from 'react'
import { Table } from 'react-bootstrap'
import PaymentRow from '../../payment/PaymentRow';
import { useState } from 'react';
import { useEffect } from 'react';
import { paymentListPreviewDB } from '../../../service/PaymentDBLogic';
import { useSelector } from 'react-redux';

const MyPayment = () => {
  const userId = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 

  // DB서버에서 받아온 정보 담기
  // 배열 타입 [{},{},{}] -> List<Map>, List<VO>
  const [ listBody, setListBody ] = useState([]);
  const listHeaders = ["결제정보", "결제일", "결제금액", "결제내용"];
  const HeaderWidth = ["15%", "20%", "15%", "50%"];

  // listBody(컬럼명)는 상태 훅이다
  const listHeadersElements = listHeaders.map((listHeader, index) => 
    listHeader === "결제내용" ?
      <th key={index} style={{borderStyle: "solid", width: HeaderWidth[index], paddingLeft: "40px"}}>{listHeader}</th>
      : <th key={index} style={{width: HeaderWidth[index], textAlign: "center"}}>{listHeader}</th>
  )

  // 결제 리스트 출력
  const listItemsElements = listBody.map((listItem, index) => {
    console.log("listItemsElements 호출");

    return (
      <PaymentRow key={index} listItem={listItem} />
    )
  })

  useEffect(() => {
    const payList = async() => {
      const payInfo = {
        pay_type: "전체",
        user_id: userId,             // 사용자 정보
      }
      console.log(payInfo);

      const res = await paymentListPreviewDB(payInfo);
      console.log(res.data);

      const list = [];

      const datas = res.data;
      datas.forEach((item, index) => {
        console.log(item)

        const obj = {
          pay_no: item.pay_no, 
          user_id: item.user_id, 
          pay_amount: item.pay_amount, 
          pay_date: item.pay_date, 
          pay_content: item.pay_content, 
          user_name: item.user_name,
          pay_type: item.pay_type,
        }

        list.push(obj);
      })

      // 데이터 셋 변화에 따라 리렌더링 할 것과 기존에 DOM을 그냥 출력하는 것 - 비교 알고리즘
      setListBody(list);  
    }

    payList();
  }, [setListBody])



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
