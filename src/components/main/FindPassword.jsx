import React, { useCallback, useState } from 'react'
import Bottom from '../include/Bottom'
import MainHeader from '../include/MainHeader'
import { Form, Button, Col, Row, Modal } from 'react-bootstrap'
import "../css/findId.css"
import { Link } from 'react-router-dom'
import { chagnePwDB, findUserPw } from '../../service/MemberDBLogic'
import { MyInput, MyLabel } from '../css/FormStyle'

const FindPassword = () => {

  const[id,setId] = useState("") 
  const[name,setName] = useState("")

  const [showModal, setShowModal] = useState(false);
  const [failModal, setFailShowModal] = useState(false);

  // 모달 열기, 닫기
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false)
    setFindUser({user_password: ''})
  };

  // 패스워드 찾기
  const [findUser, setFindUser] = useState({
    user_id: '',
    user_password: '',
  });

  const failcloseModal = () => {
    setFailShowModal(false)
  };

  const handleId = useCallback((e) => {
    setId(e)
  },[])
  const handleName = useCallback((e) => { 
    setName(e)
  },[])

  const handleSubmit = async(event) => {
    const form = event.currentTarget;    
    if (form.checkValidity() === false) { //유효 확인 실패 했을 경우
      event.preventDefault();  //이벤트 중단
      event.stopPropagation(); //이벤트 중단
    }
    event.preventDefault();
    const user = {
      user_id: id,
      user_name: name
    }

    const res = await findUserPw(user)
    console.log(res.data);
    if(res.data === 0) {
      setFailShowModal(true)
    } else {
      setFindUser({
        user_id: id,
        user_password: '',
      })
      setShowModal(true)
    }
  }

  const changePassword = (e) => {
    const password = e.currentTarget.id;
    const value = e.target.value;
    setFindUser({...findUser, [password]: value});
  };

  const changePw = async () => {
    console.log(findUser)
    const res = await chagnePwDB(findUser);
    if(res.data === 1) {
      alert("비밀번호가 변경되었습니다")
      setShowModal(false)
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
            <Form.Label>아이디</Form.Label>
            <Form.Control type="id" placeholder="아이디를 작성해주세요" onChange={(e) => { handleId(e.target.value) }} />
          </div>
        </Form.Group>
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
          <Modal.Title>패스워드 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyLabel htmlFor="mem_pw"> 새로운 패스워드를 입력하세요    
          <MyInput type="mem_pw" id="user_password" name="mem_pw" placeholder="패스워드를 입력해주세요." 
            onChange={(e)=>changePassword(e)}/>   
          </MyLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={changePw}>
            입력
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={failModal} onHide={failcloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>아이디나 이름을 확인하세요</Modal.Title>
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

export default FindPassword
