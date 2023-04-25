import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const VisitDateP = () => {
  const userId = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 

  useEffect(() => {
    const userVisit = async () => {
      const user = {
        user_id: userId,
      }

      // const res = await userVisitDB();
      // console.log(res.data);
    }
  }, [])

  return (
    <>
      <p style={{marginLeft: "10px", color: "#C88B00"}}>
        {
          1 != null ? "있음"
            : "없음"
        } 
      </p>
    </>
  )
}

export default VisitDateP
