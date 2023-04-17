import React, { useCallback, useState } from 'react'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import { Form, Button, Col, Row } from 'react-bootstrap'
import "../css/findId.css"
import { Link } from 'react-router-dom'

const FindIdPassword = () => {

  const[name,setName] = useState("") 
  const[number,setNumber] = useState("")

  const handleName = useCallback((e) => {
    setName(e)
  },[])
  const handleNumber = useCallback((e) => { 
    setNumber(e)
  },[])

  const handleSubmit = (event) => {
    console.log(event)
  }
  
  return (
    <>
      <MainHeader/>
      <div className="css-mainid">
      <h3 style={{fontWeight: "bold", marginLeft: "15%"}}>회원 정보 찾기</h3>
      <Form className='id-form' onSubmit={handleSubmit}>
        <div style={{ display: "inline-block" }}>
          <div className={window.location.pathname.includes('/findId') ? 'css-selectid' : 'css-select'}>
            <Link to="/findId?type=id" className="css-link">
              <span className="txt_tab">아이디 찾기</span>
            </Link>
          </div>
        </div>
        <div style={{ display: "inline-block" }}>
        <div className={window.location.pathname.includes('/findPw') ? 'css-selectpw' : 'css-select'}>
            <Link to="/findId?type=pw" className="css-link">
              <span className="txt_tab">비밀번호 찾기</span>
            </Link>           
          </div>
        </div>  
        <Form.Group className="mb-3" controlId="sponsor_number" 
          style={{ 
            marginTop: "20px",
            marginLeft: "50px",
            width: "300px",            
          }}>
          <div>
            <Form.Label>이름</Form.Label>
            <Form.Control type="name" placeholder="이름을 작성해주세요" onChange={(e) => { handleName(e.target.value) }} />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="sponsor_number" 
          style={{ 
            marginTop: "20px",
            marginLeft: "50px",
            width: "300px",            
          }}>
          <div>
            <Form.Label>전화번호</Form.Label>
            <Form.Control type="name" placeholder="전화번호를 작성해주세요" onChange={(e) => { handleName(e.target.value) }} />
          </div>
        </Form.Group>

          <Button type="submit" 
            style={{
              marginTop: "30px",
              marginLeft: "30px",
              width: "350px",
              height: "50px",
              backgroundColor:"#4a9e5c",
              fontWeight: "bold",
              border: "none"
              
            }}
            variant="success">찾기</Button>
        </Form>
      </div>
      {/* <Bottom/> */}
    </>
  )
}

export default FindIdPassword
