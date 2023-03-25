import React, { useState } from 'react'
import { FormDiv } from '../css/FormStyle'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import Noticebar from './Noticebar'

const NoticeWrite = () => {

  return (
    <>
      <MainHeader/>
      <Noticebar/>
      <FormDiv>
        <div style={{width:"100%", maxWidth:"2000px"}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h4>아이디</h4> 
          </div>
          <input id="mem_uid" type="text" maxLength="50" placeholder="ID를 입력하세요."
          style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}/>
        </div>
      </FormDiv>

      <Bottom/>
    </>
  )
}

export default NoticeWrite
