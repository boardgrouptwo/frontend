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


const MyPage = () => {
  const userId = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 

  const [ userInfo, setUserInfo ] = useState({});

  useEffect(() => {
    const FindUserInfo = async () => {
      console.log("FindUserInfo 호출")

      const user = {
        user_id: userId,
      }

      const res = await userInfoDB(user);
      console.log(res.data);

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

      setUserInfo(obj)
    }

    FindUserInfo();
    console.log(userInfo);
  }, [])

  return (
    <>
      <MainHeader />
      <MyPageBar />
      <div className="container" style={{position: "relative"}}>
        <div className="userInfo" style={{display: "flex", height: "50%"}}>
          {/* 내 정보 카드 */}
          <MyInfo userInfo={userInfo} />
          {/* 내원자 정보 카드 */}
          <ElderInfo />
        </div>
        <div style={{marginTop: "7%"}}/>
        <hr />
        {/* 사용자 결제내역 5건 출력 */}
        <MyPayment />
      </div>
      <Bottom />
    </>
  )
}

export default MyPage
