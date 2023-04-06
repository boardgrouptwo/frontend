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
import { useSelector } from 'react-redux'
import SponsorFrom from './components/Sponsor/SponsorFrom'
import SponsorList from './components/Sponsor/SponsorList'
import QnAListPage from './components/board/qna/QnAListPage'
import QnAWriteForm from './components/board/qna/QnAWriteForm'
import QnADetailPage from './components/board/qna/QnADetailPage'


const App = () => {



  return (
    <>
      <Routes>
        <Route path="/home" exact={true} element={<HomePage/>}/>
        <Route path="/" exact={true} element={<Start/>}/>
        <Route path="/intro" exact={true} element={<Introduction />}/>
        <Route path="/notice" element={<Notice/>}/>
        <Route path="/notice/write" exact={true} element={<NoticeWrite/>}/>
        <Route path="/notice/detail/:notice_no" exact={true} element={<NoticeDetail/>}/>
        <Route path="/login" exact={true} element={<Login/>}/>
        {/* 식단표 */}
        <Route path="/meal" exact={true} element={<Meal/>}/>
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
