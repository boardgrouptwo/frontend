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


const App = () => {



  return (
    <>
      <Routes>
        <Route path="/home" exact={true} element={<HomePage/>}/>
        <Route path="/" exact={true} element={<Start/>}/>
        <Route path="/intro" exact={true} element={<Introduction />}/>
        <Route path="/notice" exact={true} element={<Notice/>}/>
        <Route path="/notice/write" exact={true} element={<NoticeWrite/>}/>
        <Route path="/notice/detail/:notice_no" exact={true} element={<NoticeDetail/>}/>
        <Route path="/login" exact={true} element={<Login/>}/>
        {/* 식단표 */}
        <Route path="/meal" exact={true} element={<Meal/>}/>
      </Routes>      
    </>
  )
}

export default App
