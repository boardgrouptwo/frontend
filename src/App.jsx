import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notice from './components/board/notice/Notice'
import NoticeDetail from './components/board/notice/NoticeDetail'
import NoticeWrite from './components/board/notice/NoticeWrite'
import HomePage from './components/main/HomePage'
import Login from './components/main/Login'
import Start from './components/main/Start'
import Introduction from './components/intro/Introduction'
import Meal from './components/meal/Meal'
import { useDispatch, useSelector } from 'react-redux'
import SponsorFrom from './components/Sponsor/SponsorFrom'
import SponsorList from './components/Sponsor/SponsorList'
import Cookies from 'js-cookie'


const App = () => {

  // 새로고침시 초기화를 방지하기 위해 localStorage에서 token값을
  // 다시 가져와 갱신해준다
  const dispatch = useDispatch()
  // 기본 db 로그인
/*   const token = window.localStorage.getItem("jwt")
  const role = window.localStorage.getItem("role")
  const username = window.localStorage.getItem("user_name") */
  
  const token = Cookies.get("jwt")
  const role = Cookies.get("role")
  const username = Cookies.get("user_name")

  // 카카오 로그인
  //const kakaoToken = window.localStorage.getItem("kakaotoken")
  // 구글 로그인
  //const googleToken = window.localStorage.getItem("googletoken")
  
  // 로그인 방법에 따라 토큰값을 다시 리덕스에 넣어준다.
  if(token) {
    dispatch({
      type: 'SET_TOKEN', 
      payload: token,
      user_type: role,
      user_name: username
    })
  }

  return (
    <>
      <Routes>
        <Route path="/home" exact={true} element={<HomePage/>}/>
        <Route path="/" exact={true} element={<Start/>}/>
        <Route path="/intro" exact={true} element={<Introduction />}/>
        <Route path="/notice" element={<Notice/>}/>
        <Route path="/notice/write" exact={true} element={<NoticeWrite/>}/>
        <Route path="/notice/detail/" element={<NoticeDetail/>}/>
        <Route path="/login" exact={true} element={<Login/>}/>
        {/* 식단표 */}
        <Route path="/meal" exact={true} element={<Meal/>}/>
        <Route path="/sponser/from" exact={true} element={<SponsorFrom />}/> {/* 후원폼 */}
        <Route path="/sponser/list" exact={true} element={<SponsorList />}/> {/* 후원리스트 */}
      </Routes>      
    </>
  )
}

export default App
