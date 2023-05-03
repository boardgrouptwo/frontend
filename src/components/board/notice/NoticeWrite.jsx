import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { noticeInsertDB } from '../../../service/NoticeDBLogic'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../css/FormStyle'
import Bottom from '../../include/Bottom'
import MainHeader from '../../include/MainHeader'
import Noticebar from './Noticebar'
import QuillEditor from './QuillEditor'

const NoticeWrite = () => {

  const navigate = useNavigate();
  const token =useSelector(state => state.token);   

  const[title,setTitle] = useState("") 
  const[content,setContent] = useState("")
  const handleTitle = useCallback((e) => {
    setTitle(e)
  },[])
  const handleContent = useCallback((e) => { //QuillEditor에서 담김 - 태그포함된 정보
    setContent(e)
  },[])
  const quillRef = useRef()

  const boardInsert = async () =>{
    const board = {
      notice_title: title,
      notice_content: content
    }
    const res = await noticeInsertDB(board,token);
    navigate("/notice")
  }

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
          <BButton onClick={()=>{boardInsert()}}>글쓰기</BButton>
        </div>
        <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
          style={{width:"100%",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleTitle(e.target.value)}}/>

        <h3>상세내용</h3>
        <hr style={{margin:'10px 0px 10px 0px'}}/>
        <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef}/>
      </div>
    </FormDiv>
  </ContainerDiv>

      <Bottom/>
    </>
  )
}

export default NoticeWrite
