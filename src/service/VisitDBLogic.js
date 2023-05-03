import axios from "axios";

// 면회일정
export const visitDateDB = (user, token) => {
  console.log("visitDateDB 출력")
  console.log(user)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "visit/sign/visitList",
        params: user,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      resolve(response)
    } catch (error) {
      reject(error);
    }
  });
};
export const visitInsertDB = (visit,token) => {
  console.log(visit)
  console.log("visitInsertDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "post",//@RequestBody
      url: process.env.REACT_APP_SPRING_IP + "visit/sign/insert",
      data: visit, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    reslove(response);
    console.log(response)
  } catch (error) {
    reject(error);
  }
});
};



export const VisitMUpdateDB = (service,token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "visitmanager/visitMUpdate",
        data: service,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const VisitManagerListDB = (reservation,token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "visitmanager/visitMList",
        params: reservation,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const VisitMDeleteDB = (member,token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "visitmanager/visitMDelete",
        data: member,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


export const VisitMDateDB = (user, token) => {
  console.log("visitDateDB 호출")
  console.log(user)
  
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "visitmanager/userDate",
        params: user,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};