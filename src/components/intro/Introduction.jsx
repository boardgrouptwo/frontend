
import React from 'react'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import Introductionbar from './Introductionbar'

const Introduction = () => {
  return (
    <>
        <MainHeader/>
        <Introductionbar/>
        
        <div className='container'>
        <div className="page-header">
          내용
        </div>    
        </div>
        <Bottom/> 
      </>


  )
}

export default Introduction
