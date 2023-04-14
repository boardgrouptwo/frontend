import axios from "axios";


export const qnaListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "qna/qnaList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};



export const qnaInsertDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
        const response = axios({
            method: "post",
            url: process.env.REACT_APP_SPRING_IP + "qna/insert",
            data: board,
        })
        resolve(response);
      }catch(error){
          reject(error)
      }
  });
};



export const qnaUpdateDB = (board) => {
  return new Promise((resolve,reject) => {
      try{
        const response = axios ({
          method: "post",
          url: process.env.REACT_APP_SPRING_IP + "qna/update",
          data: board,
        })
        resolve(response);
      }catch(error){
        reject(error);
      }
  })
}



export const qnaDeleteDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method: "get",
              url: process.env.REACT_APP_SPRING_IP + "qna/delete",
              params: board,
          })
          resolve(response);
      }catch(error){
          reject(error)
      }
  })
}



export const qnaSearchListDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method: "get",
              url: process.env.REACT_APP_SPRING_IP + "qna/Search",
              params:board,
          })
          resolve(response);
      }catch(error){
          reject(error)
      }
  });
};


export const qnaResultDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method: "get",
              url: process.env.REACT_APP_SPRING_IP + "qna/result",
              params: board,
          })
        resolve(response)
      }catch(error){
        reject(error)
      }
  });
};




export const qnabeforeAfterDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method : "get",
              url : process.env.REACT_APP_SPRING_IP + "qna/qnaAfterBefore",
              params: board,
          })
          resolve(response)
      }catch(error){
        reject(error)
      }
  });
};