import { useGoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLoginCheck } from '../../service/authLogic'
import { GoogleButton } from '../css/FormStyle'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => googleSuccess(res),
  })

  const googleSuccess = async (res) => {
    const accessToken = {
      access_token: res.access_token
    } 
    const googleLogin = await GoogleLoginCheck(accessToken);
    const decoded = jwt_decode(googleLogin.data);
    console.log(decoded);
    dispatch({
      type: 'GOOGLE_TOKEN', 
      payload: googleLogin.data,
      user_type: decoded.roles[0],
      userid: decoded.user_id,
      user_name: decoded.user_name
    })
    Cookies.set('jwt', googleLogin.data, { expires: 30/1440 })
    Cookies.set('role', decoded.roles[0], { expires: 30/1440 })
    Cookies.set('userid', decoded.user_id, { expires: 30/1440 })
    Cookies.set('user_name', decoded.user_name, { expires: 30/1440 })

    Swal.fire({
      icon: "success",
      title: "로그인 성공",
      showCancelButton: false,
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "my-confirm-button"
      }
    })
    navigate("/home");
  }
  return (
    <>
      <GoogleButton type="button" onClick={googleLogin}>
        <i className= "fab fa-google-plus-g" style={{color: "red", fontSize: "18px"}}></i>&nbsp;&nbsp;Google 로그인
      </GoogleButton>   
    </>
  )
}

export default GoogleLoginButton
