import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import KhSponorServicebar from './KhSponorServicebar'
import { imageUploadDB, reviewInsertDB } from '../../service/KhServiceDBLogic'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../css/FormStyle'
import MainHeader from '../include/MainHeader'
import Bottom from '../include/Bottom'
import QuillEditor from './QuillEditor'
import { useEffect } from 'react'

const KhServiceReviewWrite = () => {

  const isLogin = useSelector(state => state.isLogin);  //로그인정보 가져오기
  const user = useSelector(state => state.nickname); //user 닉네임 가져오기

  useEffect(()=> {
    if(isLogin === true) {
      navigate("/loginError")
    }
  },[]);

  const navigate = useNavigate();
  const token =useSelector(state => state.token);   

  const[title,setTitle] = useState("") 
  const[content,setContent] = useState("")
  const [imageUrl, setImageUrl] = useState()
  const [imageName, setImageName] = useState()
  const handleTitle = useCallback((e) => {
    setTitle(e)
  },[])
  const handleContent = useCallback((e) => { //QuillEditor에서 담김 - 태그포함된 정보
    setContent(e)
  },[])
  
  const quillRef = useRef()


  const boardInsert = async () =>{
    const board = {
      user_id: user,
      review_title: title,
      review_content: content,
      review_image: imageName,
    }
    console.log(token);
    console.log(board);
    const res = await reviewInsertDB(board,token);
    console.log(res)
    navigate("/service/review")
  }

  const handleFileChange = (event) => {
    //setSelectedFile(event.target.files[0]);
    handleImageUpload(event.target.files[0]);
  };
  
  const handleImageUpload = (file) => {
    console.log(file)
    const formData = new FormData();
    formData.append("file", file)
    console.log(formData)
/*     imageUploadDB(formData)
      .then((res) => {
        setImageName(res.data)
        setImageUrl("http://localhost:3000/images/service/"+res.data)
                
      }) */
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <MainHeader/>
      <KhSponorServicebar />
      <ContainerDiv>
    <HeaderDiv>
      <h3 style={{marginLeft:"10px"}}>봉사활동 후기작성</h3>
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
        <input type="file" onChange={handleFileChange} />
            {imageUrl 
              && 
              <img style={{ width: "305px", height: "300px", margin: "30px", padding: "0"}}
              src={imageUrl} alt="Upload image" />}
        <hr style={{margin:'10px 0px 10px 0px'}}/>
        <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef}/>
      </div>
    </FormDiv>
  </ContainerDiv>

      <Bottom/>
    </>
  )
}

export default KhServiceReviewWrite
