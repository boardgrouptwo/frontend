import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import { DividerDiv, DividerHr, DividerSpan, GoogleButton, LoginForm, MyH1, MyInput, MyLabel, MyP, PwEye, SubmitButton } from '../css/FormStyle';
import { useDispatch } from 'react-redux';
import { loginCheck } from '../../service/authLogic';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });

<<<<<<< Updated upstream
  const [tempUser, setTempUser] = useState({
    mem_id: '',
    password: ''
  });

  const [passwordType, setPasswordType] = useState({
      type:'password',
      visible:false
  });

  const changeUser = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setTempUser({...tempUser, [id]: value});
  };

  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if(id==="password") {
      if(!passwordType.visible) {
        setPasswordType({...passwordType, type: 'text', visible: true});
      } else {
        setPasswordType({...passwordType, type: 'password', visible: false});
      }
    }
  };

  useEffect(()=> {
    if(tempUser.mem_id!==""&&tempUser.password!==""){ 
      setSubmitBtn({disabled:false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({disabled:true, bgColor: 'rgb(175, 210, 244)'});
    }
  },[tempUser]);

  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({...submitBtn, hover: true, bgColor: 'rgb(58, 129, 200)'});
=======
  const login = async () => {
    const member = {
      mem_id:mem_id,
      mem_pw:mem_pw,
  } 
  console.log(member)
/*   const res = await loginCheck(member)
     localStorage.setItem('accessToken', response.data.accessToken);
    window.location.reload();
    if(!res.member){
        console.log("회원가입에 실패했습니다")
>>>>>>> Stashed changes
    }
  }

  
  const [error, setError] = useState();

  const login = async () => {
    const secretKey = 'finalproject'
    const res = await loginCheck(tempUser);
    try {      
      const decoded = jwt_decode(res.data);
      dispatch({
        type: 'SET_TOKEN', 
        payload: res.data,
        user_type: decoded.roles[0],
        user_name: decoded.user_name
      })

      Cookies.set('jwt', res.data, { expires: 30/1440 })
      Cookies.set('role', decoded.roles[0], { expires: 30/1440 })
      Cookies.set('user_name', decoded.user_name, { expires: 30/1440 })

      navigate("/home")      
    } catch(err) {
      alert("아이디나 비밀번호를 확인하세요")
    }
  }

  const kakaoLogin = () => {
    const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback'
    const KAKAO_AUTH_URL =  `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    window.location.href= KAKAO_AUTH_URL
  }

  const googleLogin = () => {
    console.log("구글로그인")
  }

  return (
    <>
      <MainHeader/>



      <LoginForm >
        <MyH1>로그인</MyH1>
        <MyLabel htmlFor="mem_id"> 아이디     
          <MyInput type="mem_id" id="mem_id" name="mem_id" placeholder="아이디를 입력해주세요." 
            onChange={(e)=>changeUser(e)}/>   
        </MyLabel>
        <MyLabel htmlFor="password"> 비밀번호
          <MyInput type={passwordType.type} autoComplete="off" id="password" name="mem_password" placeholder="비밀번호를 입력해주세요."
            onChange={(e)=>changeUser(e)}/>
          <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType.visible?"gray":"lightgray"}`}}>
            <PwEye className="fa fa-eye fa-lg"></PwEye>
          </div>
        </MyLabel>
        <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor}}  
          onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={login}>
          로그인
        </SubmitButton>
        <DividerDiv>
          <DividerHr />
          <DividerSpan>또는</DividerSpan>
        </DividerDiv>
        <div style={{margin: "30px"}} onClick={kakaoLogin}>
          <img src="images/kakao_login_medium_wide.png"/>
        </div>
        <GoogleButton type="button" onClick={googleLogin}>
          <i className= "fab fa-google-plus-g" style={{color: "red", fontSize: "18px"}}></i>&nbsp;&nbsp;Google 로그인
        </GoogleButton>
        <MyP style={{marginTop:"30px"}}>신규 사용자이신가요?&nbsp;<Link to="/home" className="text-decoration-none" style={{color: "blue"}}>계정 만들기</Link></MyP>
        <MyP>이메일를 잊으셨나요?&nbsp;<Link to="/home" className="text-decoration-none" style={{color: "blue"}}>이메일 찾기</Link></MyP>
        <MyP>비밀번호를 잊으셨나요?&nbsp;<Link to="/home" className="text-decoration-none" style={{color: "blue"}}>비밀번호 변경</Link></MyP>
      </LoginForm>
      <Bottom/>
    </>
  )
}

export default Login
