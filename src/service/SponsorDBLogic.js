import axios from "axios";


export const SponsorDB = (member) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          /* url을 통해서 스프링으로 요청 */
          method: "post",
          url: process.env.REACT_APP_CHAT221228_IP + "sponsor/sponInsert",
          data: member,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  