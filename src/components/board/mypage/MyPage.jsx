import React from 'react'
import MainHeader from '../../include/MainHeader'
import MyPageBar from './MyPageBar'
import Bottom from '../../include/Bottom'
import styled from 'styled-components'
import MyInfo from './MyInfo'
import ElderInfo from './ElderInfo'
import MyPayment from './MyPayment'
import { useSelector } from 'react-redux'
import { userInfoDB } from '../../../service/MemberDBLogic'
import { useState, useEffect } from 'react'
import { paymentListDB, paymentListPreviewDB } from '../../../service/PaymentDBLogic'
import { sponsorUserSumDB } from '../../../service/SponsorDBLogic'
import { serviceDateDB } from '../../../service/KhServiceDBLogic'
import { visitDateDB } from '../../../service/VisitDBLogic'
import { elderSelectDB } from '../../../service/ElderDBLogic'


const MyPage = () => {
  const userId = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 

  // 회원 정보
  const [ userInfo, setUserInfo ] = useState({});
  // 결제 내역 5건 출력
  const [ payListInfo, setPayListInfo ] = useState([]);
  // 총 후원금액
  const [ sponSum, setSponSum ] = useState();
  // 자원봉사 일정
  const [ servDate, setServDate ] = useState({});
  // 내원자 정보
  const [ elderInfo, setElderInfo ] = useState({});
  // 면회일정
  const [ visitDate, setVisitDate ] = useState({});


  // 회원 정보 호출
  const FindUserInfo = async () => {
    console.log("FindUserInfo 호출")

    const user = {
      user_id: userId,
    }

    const res = await userInfoDB(user, token);
    
    const obj = {
      user_id: res.data.user_id,
      user_name: res.data.user_name,
      user_birth: res.data.user_birth,
      user_gender: res.data.user_gender,
      user_tel: res.data.user_tel,
      user_email: res.data.user_email,
      user_enter: res.data.user_enter,
      user_type: res.data.user_type,
      user_profile_url: res.data.user_profile_url,
      user_memo: res.data.user_memo,
    }
    console.log("회원정보 ==> " + obj);

    setUserInfo(obj)
  } // end of 회원 정보 호출


  // 결제 내역 5건 출력
  const payList = async() => {
    console.log("payList 호출")

    const payInfo = {
      pay_type: "전체",
      limit_cnt: "5",              // 5건 출력
      user_id: userId,             // 사용자 정보
    }
    console.log("결제내역 ==> " + payInfo);

    const res = await paymentListDB(payInfo, token);
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
    setPayListInfo(list);  
  } // end of 결제 내역 5건 출력


  // 사용자 총 후원금액
  const sponsorUserSum = async () => {
    console.log("sponsorUserSum 호출")

    const user = {
      user_id: userId,
    }

    const res = await sponsorUserSumDB(user, token);
    console.log("총 후원금액 ==> " + res.data)

    setSponSum(res.data);
  } // end of 사용자 총 후원금액


  // 자원봉사 일정
  const serviceDate = async () => {
    console.log("serviceDate 호출");
    
    const user = {
      user_id: userId,
    };
    
    const res = await serviceDateDB(user, token);
    console.log("자원봉사 ==> " + res.data);
    
    const obj = {
      service_date: res.data.service_date,
      service_check: res.data.service_check,
    }

    setServDate(obj)
  } // end of 자원봉사 일정
  
  


  // 내원자 정보
  const userElderInfo = async () => {
    console.log("userElderInfo 호출");
    
    const user = {
      elder_id: userId,
    };
    
    const res = await elderSelectDB(user, token);
    
    const obj = {
      elder_id: res.data.elder_id,
      elder_name: res.data.elder_name,
      elder_age: res.data.elder_age,
      elder_gender: res.data.elder_gender,
      elder_status: res.data.elder_status,
      attendance_date: res.data.attendance_date,
      discharge_date: res.data.discharge_date,
    }
    console.log("내원자 ==> " + obj);
    
    setElderInfo(obj)
  } // end of 내원자 일정
  
  
  // 면회일정
  const userVisitDate = async () => {
    console.log("userVisitDate 호출");

    const user = {
      user_id: userId,
    };

    const res = await visitDateDB(user, token);
    
    const obj = {
      elder_id: res.data[0].user_id,              // ID
      visit_date: res.data[0].visit_date,
      visit_time:res.data[0].visit_time,
      service_check: res.data[0].service_check,          // 면회 날짜
    }
    console.log("면회일정 ==> " + obj);
    
    setVisitDate(obj)
  } // end of 면회 일정




  
  useEffect(() => {
    // 사용자 정보 호출
    FindUserInfo();
    console.log(userInfo);

    // 결제 내역 5건 출력
    payList();

    // 사용자 총 후원금액
    sponsorUserSum();

    // 자원봉사 일정
    serviceDate();

    // 내원자 정보
    userElderInfo();
    
    // 면회일정
    userVisitDate();

  }, [setPayListInfo, setSponSum, setServDate, setElderInfo, setVisitDate])



  return (
    <>
      <MainHeader />
      <MyPageBar />
      <div className="container" style={{position: "relative"}}>
        <div className="userInfo" style={{display: "flex", height: "50%"}}>
          {/* 내 정보 카드 */}
          <MyInfo userInfo={userInfo} sponSum={sponSum} servDate={servDate} />
          {/* 내원자 정보 카드 */}
          <ElderInfo elderInfo={elderInfo} visitDate={visitDate} />
        </div>
        <div style={{marginTop: "7%"}}/>
        <hr />
        {/* 사용자 결제내역 5건 출력 */}
        <MyPayment payListInfo={payListInfo} />
      </div>
      <Bottom />
    </>
  )
}

export default MyPage