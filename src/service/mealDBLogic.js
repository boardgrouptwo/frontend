import axios from "axios";

export const mealListDB = (meal) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "meal/mealList",
        params: meal,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
