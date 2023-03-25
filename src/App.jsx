import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notice from './components/board/Notice'
import NoticeWrite from './components/board/NoticeWrite'
import Test from './components/include/Test'
import HomePage from './components/main/HomePage'
import Login from './components/main/Login'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" exact={true} element={<HomePage/>}/>
        <Route path="/" exact={true} element={<Test/>}/>
        <Route path="/notice" exact={true} element={<Notice/>}/>
        <Route path="/notice/write" exact={true} element={<NoticeWrite/>}/>
        <Route path="/login" exact={true} element={<Login/>}/>
      </Routes>      
    </>
  )
}

export default App
