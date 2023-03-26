import React, { useCallback, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import { BButton,  FormDiv } from '../css/FormStyle'
import { loginCheck } from '../../service/MemberDBLogic'

const Login = () => {

  const navigate = useNavigate()
  const[mem_id, setMemid] = useState("")
  const[mem_pw, setMempw] = useState("")

  const login = async () => {
    const member = {
      mem_id:mem_id,
      mem_pw:mem_pw,
  } 
  console.log(member)
/*   const res = await loginCheck(member)
    if(!res.member){
        console.log("회원가입에 실패했습니다")
    }
    else{
        console.log("회원가입에 성공했습니다")
        navigate('/home')
    } */
  }

  const handleID = useCallback((e) => {
    setMemid(e)
  }, [])

  const handlePW = useCallback((e) => {
    setMempw(e)
  }, [])


  return (
    <>
      <MainHeader/>
        <div>
        <FormDiv>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h3>아이디</h3>
          </div>
          <input id="mem_uid" type="text" maxLength="50" placeholder="ID를 입력하세요."
            style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) =>{handleID(e.target.value)}} />

          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h3>비밀번호</h3>
          </div>
            <input id="mem_pw" type="text" maxLength="50" placeholder="비밀번호를 입력하세요."
                style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) =>{handlePW(e.target.value)}} />

          <BButton onClick={login}>로그인</BButton>
          <div style={{margin: "10px"}}>
            <Image src = "/images/kakao_login_medium_wide.png" />              
          </div>
        </FormDiv>
        </div>
      <Bottom/>
    </>
  )
}

export default Login
