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
import Cookies from 'js-cookie'
import QnAListPage from './components/board/qna/QnAListPage'
import QnAWriteForm from './components/board/qna/QnAWriteForm'
import QnADetailPage from './components/board/qna/QnADetailPage'
import KakaoAuthHandle from './components/main/KakaoAuthHandle'
import ShopMain from './components/board/shop/ShopMain'
import ShopAdd from './components/board/shop/ShopAdd'
import MealDetail from './components/meal/MealDetail'
import SponsorSuccess from './components/Sponsor/SponsorSuccess'
import ShopReceive from './components/board/shop/ShopReceive'
import ShopDetail from './components/board/shop/ShopDetail'
import KhServiceForm from './components/khservice/KhServiceForm'
import Auth from './components/main/Auth'
import FindId from './components/main/FindId'
import SponsorListPage from './components/Sponsor/SponsorListPage'
import KhServiceSuccess from './components/khservice/KhServiceSuccess'
import FindPassword from './components/main/FindPassword'
import FullCalendarMain from './components/visit/FullCalendarMain'
import Admin_Service from './components/admin/AdminService'
import AdminService from './components/admin/AdminService'
import PaymentDetail from './components/payment/PaymentDetail'
import Register from './components/main/Register'
import IntroPage from './components/intro/IntroPage'
import LoginError from './components/main/LoginError'
import MyPage from './components/board/mypage/MyPage'
import MyPageDetail from './components/board/mypage/MyPageDetail'
import Elder from './components/main/Elder'
import SponsorManagement from './components/Sponsor/SponsorManagement'
import ScheduleList from './components/schedule/ScheduleList'
import ElderUpdate from './components/board/mypage/ElderUpdate'
import ElderInsert from './components/board/mypage/ElderInsert'
import OrderPage from './components/board/shop/OrderPage'
import PaymentSuccess from './components/payment/PaymentSuccess'
import WishListPage from './components/board/shop/WishListPage'
import "react-datetime/css/react-datetime.css";
import SchedulePage from'./components/schedule/SchedulePage'

import VisitManager from './components/visit/VisitManager'
import ScheduleDetail from './components/schedule/ScheduleDetail'

import KhServiceReview from './components/khservice/KhServiceReview'
import KhServiceReviewWrite from './components/khservice/KhServiceReviewWrite'


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
  const userid = Cookies.get("userid")

  // 카카오 로그인
  //const kakaoToken = window.localStorage.getItem("kakaotoken")
  // 구글 로그인
  //const googleToken = window.localStorage.getItem("googletoken")
  
  // 로그인 방법에 따라 토큰값을 다시 리덕스에 넣어준다.
  if(token) {
    dispatch({
      type: 'SET_TOKEN', 
      payload: token,
      userid: userid,
      user_type: role,
      user_name: username
    })
  }

  return (
    <>
      <Routes>
        <Route path="/home" exact={true} element={<HomePage/>}/>
        <Route path="/" exact={true} element={<Start/>}/>
        <Route path="/intro" exact={true} element={<IntroPage />}/>
        {/* 회원가입 */}
        <Route path="/join" exact={true} element={<Register />}/>
        {/* 어르신 정보 */}
        <Route path="/elder" exact={true} element={<Elder />}/>
        <Route path="/elderupdate" exact={true} element={<ElderUpdate />}/>
        <Route path="/elderinsert" exact={true} element={<ElderInsert />}/>

        {/* 로그인 */}
        <Route path="/login" exact={true} element={<Login/>}/>
        <Route path="/loginError" exact={true} element={<LoginError/>}/>
        <Route path="/auth/kakao/callback" element={<KakaoAuthHandle/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/findId" element={<FindId/>}/>
        <Route path="/findPw" element={<FindPassword/>}/>

        {/* 공지사항 */}
        <Route path="/notice" element={<Notice/>}/>
        <Route path="/notice/write" exact={true} element={<NoticeWrite/>}/>
        <Route path="/notice/detail/" element={<NoticeDetail/>}/>
        {/* 선물하기, 쇼핑몰 */}
        <Route path="/shopmain" element={<ShopMain/>}/>
        <Route path="/shopreceive" exact={true} element={<ShopReceive/>}/>
        <Route path="/shopadd" exact={true} element={<ShopAdd/>}/>
        <Route path="/shopdetail" element={<ShopDetail/>}/>
        <Route path="/cart" exact={true}element={<WishListPage/>}/>{/* 장바구니 */}
        <Route path="/order" exact={true} element={<OrderPage />}/> {/* 결제 페이지 */}
        <Route path="/payment/success" exact={true} element={<PaymentSuccess />}/> {/* 결제 페이지 */}
        
        {/* 식단표 */}
        <Route path="/meal" exact={true} element={<Meal/>}/>
        <Route path="/meal/page?" exact={true} element={<MealDetail/>}/>
        {/*후원하기 */}
        <Route path="/sponsor/from" exact={true} element={<SponsorFrom />}/> {/* 후원폼 */}
        <Route path="/sponsor/list" exact={true} element={<SponsorListPage />}/> {/* 후원리스트 */}
        <Route path="/sponsor/success" exact={true} element={<SponsorSuccess />}/> {/* 후원성공 */}
        <Route path="/sponsor/management" element={<SponsorManagement />}/> {/* 후원내역 - 관리자 */}
        {/* 자원봉사 */}
        <Route path="/service/from" exact={true} element={<KhServiceForm />}/> {/* 자원봉사폼 */}
        <Route path="/service/success" exact={true} element={<KhServiceSuccess />}/> {/* 자원봉사신청성공 */}
        <Route path="/service/review" exact={true} element={<KhServiceReview />}/> {/* 자원봉사리뷰 */}
        <Route path="/service/review/write" exact={true} element={<KhServiceReviewWrite />}/> {/* 자원봉사리뷰작성 */}
        <Route path="/service/management" exact={true} element={<AdminService />}/>  {/* 자원봉사 - 관리자 */}

        {/* QnA */}
        <Route path="/qna" element={<QnAListPage/>}/>
        <Route path="/qna/write" element={<QnAWriteForm/>}/>
        <Route path="/qna/detail/" exact={true} element={<QnADetailPage/>}/>
        {/* 면회 */}
        <Route path="/visit/sign/" exact={true} element={<FullCalendarMain/>}/>
        <Route path="/visit/management" exact={true} element={<VisitManager/>}/>
        {/* 월간 */}
        <Route path="/calendar" exact={true} element={<SchedulePage/>}/>
        <Route path="/memo" exact={true} element={<ScheduleList/>}/>
        <Route path="/schedule/detail/:cal_no" exact={true} element={<ScheduleDetail/>} />


        {/* 내정보 */}
        <Route path="/mypage" exact={true} element={<MyPage />} />
        <Route path="/mypage/detail" exact={true} element={<MyPageDetail />} />
        <Route path="/paymentdetail" exact={true} element={<PaymentDetail />} />

      </Routes>      
    </>
  )
}

export default App
