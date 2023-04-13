import React, { useEffect, useState } from 'react'
import { authLogic } from '../../service/authLogic'

const Auth = () => {

  const [userAuth, setUserAuth] = useState([{}]);
  useEffect(() => {
    const auth = async() => {
      const res = await authLogic()
      console.log(res);      
      setUserAuth(res);
    } 
    auth()   
  },[])

  return (
    <div>
      <pre>{JSON.stringify(userAuth, null, 2)}</pre>
    </div>
  )
}

export default Auth
