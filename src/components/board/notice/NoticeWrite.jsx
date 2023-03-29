import React, { useState } from 'react'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../css/FormStyle'
import Bottom from '../../include/Bottom'
import MainHeader from '../../include/MainHeader'
import Noticebar from './Noticebar'

const NoticeWrite = () => {

  return (
    <>
      <MainHeader/>
      <Noticebar/>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>공지사항 글작성</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>제목</h3> 
              <BButton onClick={()=>{}}>글쓰기</BButton>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
              style={{width:"100%",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} />
                        
            <br/>
            <h3>상세내용</h3>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
          </div>
        </FormDiv>
      </ContainerDiv>

      <Bottom/>
    </>
  )
}

export default NoticeWrite
