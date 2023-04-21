import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

const KakaoAuthHandle = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code')
    console.log(code);
    const kakaoLogin = async () => {
      await axios
        .get(`http://localhost:7000/user/kakao/callback?code=${code}`)
        .then((res) => {
          const decoded = jwt_decode(res.data);
          dispatch({
            type: 'KAKAO_TOKEN', 
            payload: res.data,
            user_type: decoded.roles[0],
            userid: decoded.user_id,
            user_name: decoded.user_name
          })
          Cookies.set('jwt', res.data, { expires: 30/1440 })
          Cookies.set('role', decoded.roles[0], { expires: 30/1440 })
          Cookies.set('userid', decoded.user_id, { expires: 30/1440 })
          Cookies.set('user_name', decoded.user_name, { expires: 30/1440 })

          window.location.href = "/home";
        })
    }
    kakaoLogin()
  }, [props.history])

  return (
    <>
      <Container></Container>
    </>
  )
}

export default KakaoAuthHandle

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
