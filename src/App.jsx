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
import QnAListPage from './components/board/qna/QnAListPage'
import QnAWriteForm from './components/board/qna/QnAWriteForm'
import QnADetailPage from './components/board/qna/QnADetailPage'
import KakaoAuthHandle from './components/main/KakaoAuthHandle'
import ShopMain from './components/board/shop/ShopMain'
import ShopAdd from './components/board/shop/ShopAdd'
import MealDetail from './components/meal/MealDetail'



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
        {/* 로그인 */}
        <Route path="/login" exact={true} element={<Login/>}/>
        <Route path="/auth/kakao/callback" element={<KakaoAuthHandle/>}/>
        {/* 공지사항 */}
        <Route path="/notice" element={<Notice/>}/>
        <Route path="/notice/write" exact={true} element={<NoticeWrite/>}/>
        <Route path="/notice/detail/" element={<NoticeDetail/>}/>
        {/* 선물하기, 쇼핑몰 */}
        <Route path="/shop" exact={true} element={<ShopMain/>}/>
        <Route path="/shopadd" exact={true} element={<ShopAdd/>}/>
        
        {/* 식단표 */}
        <Route path="/meal" exact={true} element={<Meal/>}/>
        <Route path="/meal/page/:selectedDate" exact={true} element={<MealDetail/>}/>
        {/* */}
        <Route path="/sponser/from" exact={true} element={<SponsorFrom />}/> {/* 후원폼 */}
        <Route path="/sponser/list" exact={true} element={<SponsorList />}/> {/* 후원리스트 */}
        {/* QnA */}
        <Route path="/qna" element={<QnAListPage/>}/>
        <Route path="/qna/write" element={<QnAWriteForm/>}/>
        <Route path="/qna/detail/:qna_no" exact={true} element={<QnADetailPage/>}/>
        
      </Routes>      
    </>
  )
}

export default App
