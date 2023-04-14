import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import { DividerDiv, DividerHr, DividerSpan, GoogleButton, LoginForm, MyH1, MyInput, MyLabel, MyP, PwEye, SubmitButton } from '../css/FormStyle';
import { useDispatch } from 'react-redux';
import { GoogleLoginCheck,  loginCheck } from '../../service/authLogic';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });

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

  //const googleLogin = () => {}

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => googleSuccess(res),
  })

/*   const getIdToken = async (accessToken) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://oauth2.googleapis.com/tokeninfo",
        params: {
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get idToken from accessToken");
    }
  }; */

/*   const getIdToken = async (accessToken) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
      });
  
      // 인증 요청이 성공하면 응답 데이터에서 idToken 추출
      const idToken = response;
  
      return idToken;
    } catch (error) {
      console.error(error);
    }
  }; */



  const googleSuccess = async (res) => {
    console.log(res)
    const accessToken = {
      access_token: res.access_token
    } 
    //const accessToken = res.access_token;
    console.log(accessToken)
    //const idToken = await getIdToken(accessToken);
    //console.log(idToken)
    //const googleLogin = await GoogleLoginCheck(idToken);
    const googleLogin = await GoogleLoginCheck(accessToken);
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
        <button style={{margin: "30px", border: "none"}} onClick={kakaoLogin}>
          <img src="images/kakao_login_medium_wide.png"/>
        </button>   

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
