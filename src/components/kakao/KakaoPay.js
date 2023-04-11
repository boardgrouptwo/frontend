import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const kakaoPayReady = (params) => {
  console.log("kakaoPayReady 호출")
  console.log(params)

  // 응답에서 가져올 값들
  const [tid, setTid] = useState();
  const [redirectUrl, setRedirectUrl] = useState();

  const navigate = useNavigate();

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: "https://kapi.kakao.com/v1/payment/ready",
        headers: {
          Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_ADMIN_KEY,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: params,
      }).then((response) => {
        console.log(response.data);

        setTid(response.data.tid);
        setRedirectUrl(response.data.next_redirect_pc_url);
      });

      // 카카오페이 결제 창 호출
      navigate(redirectUrl);
      resolve(tid)
    } catch (error) {
      reject(error)
    }
  })
}


export const kakaoPaySuccess = (params) => {
  console.log("kakaoPaySuccess 호출")
  console.log(pg_token)

  //const tid =
}