/**
 * Sponcor 테이블의 마지막 pay_no 출력
 * @returns pay_no
 */
export const findRecentNo = () => {
  console.log("findRecentNo 호출")

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "sponcor/findRecentNO", 
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};