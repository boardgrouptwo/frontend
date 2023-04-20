import axios from "axios";

export const kakaoPayReady = (payForm) => {
  console.log("kakaoPayReady 호출")
  console.log(payForm)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: process.env.REACT_APP_SPRING_IP + "kakaopay/ready",
        data: payForm,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}