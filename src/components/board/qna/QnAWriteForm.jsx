import React, { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { qnaInsertDB } from '../../../service/QnADBLogic'
import MainHeader from '../../include/MainHeader'
import Noticebar from '../notice/Noticebar'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../css/FormStyle'
import { useState } from 'react'
import Bottom from '../../include/Bottom'
import QuillEditor from './QuillEditor'

const QnAWriteForm = () => {
    const navigate = useNavigate()

    const token  = useSelector(state => state.token);
    const user = useSelector(state => state.userid);

    const real_user = (user !== "") ? user : "비회원";
    console.log(real_user);
    console.log(user);

    const[type, setType] = useState("후원하기")
    const[id, setId] = useState(user)
    const[title, setTitle] = useState("")
    const[content, setContent] = useState("")
    const[date, setDate] = useState("")
    const[result, setResult] = useState(0)


    const handleType = useCallback((e) => {
        setType(e)
        console.log(e)
    },[])

    const handleName = useCallback((e) => {
        setId(e)
    },[])

    const handleTitle = useCallback((e) => {
        setTitle(e)
    },[])

    const handleContent = useCallback((e)=> {
        setContent(e)
    },[])

    const handleDate = useCallback((e)=> {
        setDate(e)
    },[])

    const handleResult = useCallback((e)=> {
        setResult(e)
    },[])

    const quillRef = useRef()


    //화면에 입력한 값을 DB에 보내는 값
    const boardInsert = async () => {
        const board = {
            qna_type : type,
            user_id : real_user, 
            qna_title : title,
            qna_content : content,
            qna_date : date,
            qna_result : result, 
        }
        
        console.log(token)
        const res = await qnaInsertDB(board, token)
        console.log(res)
        navigate("/qna?page=1")
    }


  return (
    <>
      <MainHeader/>
      <Noticebar/>

      <ContainerDiv>
          <HeaderDiv>
            <h3 style={{marginLeft:"10px"}}>QnA 글작성</h3>
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
                          <div className="col-3" style={{margin:'10px 0px 10px 0px'}}>
                              <select id="gubun" className="form-select" aria-label="분류선택" onChange={(e) => handleType(e.target.value)}>
                                <option defaultValue>후원하기</option>
                                <option value="자원봉사">자원봉사</option>
                                <option value="선물하기">선물하기</option>
                                <option value="기타">기타</option>
                              </select>
                          </div>

                <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef}/>
            </div>
          </FormDiv>
  </ContainerDiv>

      <Bottom/>
    </>
  )
}

export default QnAWriteForm
