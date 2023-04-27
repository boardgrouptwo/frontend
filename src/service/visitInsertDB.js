import axios from "axios";

  export const visitInsertDB = (visit) => {
    console.log(visit)
    console.log("visitInsertDB호출")
  return new Promise((reslove, reject) => {
    try {
      const response = axios({
        method: "post",//@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "/",
        data: visit, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
      });
      reslove(response);
      console.log(response)
    } catch (error) {
      reject(error);
    }
  });
  };