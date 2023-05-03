import React, { useCallback, useState } from 'react'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import { Form, Button, Col, Row, Modal } from 'react-bootstrap'
import "../css/findId.css"
import { Link } from 'react-router-dom'
import { findUserId } from '../../service/MemberDBLogic'
import { MyLabel } from '../css/FormStyle'

const FindId = () => {

  const[name,setName] = useState("") 
  const[number,setNumber] = useState("")
  const[findUser, setFindUser] = useState("")

  const [showModal, setShowModal] = useState(false);
  const [failModal, setFailShowModal] = useState(false);

  // 모달 열기, 닫기
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false)
  };

  const failcloseModal = () => {
    setFailShowModal(false)
  };

  const handleName = useCallback((e) => {
    setName(e)
  },[])
  const handleNumber = useCallback((e) => { 
    setNumber(e)
  },[])

  const handleSubmit = async (event) => {
    const form = event.currentTarget;    
    if (form.checkValidity() === false) { //유효 확인 실패 했을 경우
      event.preventDefault();  //이벤트 중단
      event.stopPropagation(); //이벤트 중단
    }
    event.preventDefault();
    const user = {
      user_name: name,
      user_tel: number
    }

    const res = await findUserId(user)
    if(res.data !== '') {
      setFindUser(res.data.user_id)
      setShowModal(true)
    } else {      
      setFailShowModal(true)
    }
    
  }
  
  return (
    <>
      <MainHeader/>
      <div className="css-mainid">
      <h3 style={{fontWeight: "bold", marginLeft: "15%"}}>회원 정보 찾기</h3>
      <Form className='id-form' onSubmit={handleSubmit}>
        <div style={{ display: "inline-block" }}>
          <div className={window.location.pathname.includes('/findId') ? 'css-selectid' : 'css-select'}>
            <Link to="/findId" className="css-link">
              <span className="txt_tab">아이디 찾기</span>
            </Link>
          </div>
        </div>
        <div style={{ display: "inline-block" }}>
        <div className={window.location.pathname.includes('/findPw') ? 'css-selectpw' : 'css-select'}>
            <Link to="/findPw" className="css-link">
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
            <Form.Control type="name" placeholder="전화번호를 작성해주세요" onChange={(e) => { handleNumber(e.target.value) }} />
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
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>ID 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{fontWeight: "bold"}}>
            찾고 있는 id는 : {findUser} 입니다.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={failModal} onHide={failcloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>이름이나 전화번호를 확인하세요</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={failcloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>


      {/* <Bottom/> */}
    </>
  )
}

export default FindId
