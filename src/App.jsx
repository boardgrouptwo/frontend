import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Test from './components/include/Test'
import HomePage from './components/main/HomePage'
import Login from './components/main/Login'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" exact={true} element={<HomePage/>}/>
        <Route path="/" exact={true} element={<Test/>}/>
        <Route path="/login" exact={true} element={<Login/>}/>
      </Routes>      
    </>
  )
}

export default App
