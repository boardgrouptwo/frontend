import React from 'react'
import { useNavigate } from 'react-router-dom';
import { findRecentNo } from '../../service/SponcorDBLogic';
import { kakaoPayReady } from '../kakao/KakaoPay';


const payment = ({sponcor_form}) => {
  const navigate = useNavigate();
  const [tid, setTid]= useState();

  const {sponsor_name, sponsor_number, sponsor_birth, sponRadios, sponsor_money, sponPay, sponOpen, sponsor_memo} = sponcor_form;
  console.log(sponcor_form);


  /* 
    이름 : 			  	sponsor_name
    연락처 : 			  sponsor_number
    생년월일 : 			 sponsor_birth
    후원방법 : 			 sponRadios 			  -> 1 : 일반 후원,      2 : 물품 후원
    금액 : 				  sponsor_money
    입금방법 : 			 sponPay 				    -> 1 : 홈페이지 결제,   2 : 방문 접수
    익명 여부 : 		 sponOpen 				  -> 1 : 공개, 				   2 : 비공개
    전하고 싶은 말 :  sponsor_memo
  */
  
  //Sponcor 테이블의 마지막 pay_no 출력
  const findSponNo = async() => {
    console.log("findSponNo 호출")

    const res = await findRecentNo()
    console.log(res)

    return res;
  }
  
  const kakaoPay = async() => {
    /* ** 카카오로 전달할 파라미터
      String userID = pMap.get("user_id").toString();                               // 회원 id
      String order_id = pMap.get("order_id").toString();                            // 주문번호
      String item_name = pMap.get("item_name").toString();                          // 상품명
      int total_amount = Integer.parseInt(pMap.get("total_amount").toString());     // 상품 총액
      String approval_url = "http://localhost:7000/kakaopay/success";               // 성공 시 redirect url
      String cancel_url = "http://localhost:7000/kakaopay/cancel";                  // 취소 시 redirect url
      String fail_url = "http://localhost:7000/kakaopay/fail";                      // 실패 시 redirect url
    */
    /* ** 스프링으로 전달할 파라미터
      String pg_token = pMap.get("pg_token").toString();                            // 결제승인 요청을 인증하는 토큰, 쿼리스트링
      String tid = pMap.get("tid").toString();                                      // 결제 고유번호, 결제 준비 API 응답에 포함
      String userID = pMap.get("user_id").toString();                               // 회원 id
      String order_id = pMap.get("order_id").toString();                            // 주문번호
    */
    const pay_no = findSponNo()
    pay_no += 1

    const params = {
      cid : "TC0ONETIME",
      partner_order_id : pay_no,
      partner_user_id : sponsor_name,            // TODO: 임의의 값으로 설정함 수정필요!!
      item_name : sponRadios,
      quantity : "1",
      total_amount : sponsor_money,
      vat_amount : "0",
      tax_free_amount : "0",
      payment_method_type : "MONEY",
      approval_url : "http://localhost:3000/kakaopay/success",
      cancel_url : "http://localhost:3000/kakaopay/cancel",
      fail_url : "http://localhost:3000/kakaopay/fail"
    }

    const res = await kakaoPayReady(params)
    console.log("tid : " + res)

    setTid(res)
  }


  // 일반 후원일 경우
  if (sponRadios === "일반 후원") {
    console.log("일반 후원입니다.");

    if (sponPay === "KaKaopay") {
      console.log("카카오페이로 결제합니다");

      
    }

  }

  
}

export default payment
