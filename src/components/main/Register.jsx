import React, { useState } from 'react'
import { Accordion, Button, Col, Fade, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { duplicateDB, joinDB } from '../../service/MemberDBLogic';
import GoogleRecaptcha from '../google/GoogleRecaptcha';
import MainHeader from '../include/MainHeader';
import KhPrivacy from '../khservice/KhPrivacy';

const Register = () => {
  const navigate = useNavigate();


  // 초기값 설정
  const[userId, setUserId]= useState(''); // 아이디
  const[userPw, setUserPw]= useState(''); // 비밀번호
  const[userName, setUserName]= useState(''); // 이름 
  const[userBday, setUserBday]= useState(''); // 생일
  const[userGender, setUserGender]= useState(''); // 성별
  const[userTel, setUserTel]= useState('');  //전화번호
  const[userEmail, setUserEmail]= useState('');  //이메일
  const [userEnter, setUserEnter] = useState(""); //입원자 유무 라디오 버튼

  const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
  const [showError2, setShowError2] = useState(false);//폼 검증 유효성 검사
  const [validated, setValidated] = useState(false); //폼 검증 유효성 검사

  /* 회원가입을 하기 위해서는 아이디 중복검사를 해야함 */
  const[check, setCheck] = useState(false);

  /* 아이디 중복 검사 결과내용 */
  const [open, setOpen] = useState(false);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setCheck(false); // 아이디 변경 시 check 값 초기화
    setOpen(false); // 아이디 변경 시 open 값 초기화
  }

// 폼 제출 이벤트 처리
  const handleSubmit = async(event) => {   // form 컴포넌트에서 submit 할 때 실행됨

      const form = event.currentTarget;
      if (form.checkValidity() === false) { //유효 확인 실패 했을 경우
        event.preventDefault();  //이벤트 중단
        event.stopPropagation(); //이벤트 중단
      }
      setValidated(true);  // validated 변수를 true로 설정
      
      /* 아이디 중복검사를 안했으면 제출할 수 없음 */
      if(check === false){
        Swal.fire({
          icon: "warning",
          title: "아이디 중복검사를 해주세요",
          showCancelButton: false,
          confirmButtonText: "확인",
        })
      }

      event.preventDefault();

        //화면에 입력된 값을 DB로 보내는
        const member= {
          user_id: userId,
          password: userPw,
          user_name: userName,
          user_birth: userBday,
          user_gender: userGender,
          user_tel: userTel,
          user_email: userEmail,
          user_enter: userEnter
        }

      const res = await joinDB(member);

      /* 제출하기를 클릭했을 때 입원이면 elder정보 입력하는 폼으로 넘어가고 아니면 회원 가입 완료되게끔 처리 */
      if(check !== false){
          if(userEnter === "입원"){
            navigate('/elder', { state: { userId } })
          }
          else if(userEnter === "비입원"){
            Swal.fire({
              icon: "success",
              title: "회원가입을 축하드립니다! 로그인 페이지로 이동합니다",
              showCancelButton: false,
              confirmButtonText: "확인",
              customClass: {
                confirmButton: "my-confirm-button"
              }
            })
            navigate('/login')
          }
      }

  };  // end of handleSubmit


  //아이디 유효성 검사
  const idCheck = async () =>{
    const user = {
      user_id: userId
    }

    const res = await duplicateDB(user)

    if(res.data === 0) {      
      Swal.fire({
        icon: "success",
        title: "사용가능한 ID입니다",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })      
      setCheck(true)
      setOpen(true)
    } else {
      Swal.fire({
        icon: "warning",
        title: "아이디 중복입니다",
        showCancelButton: false,
        confirmButtonText: "확인",
      })
      setCheck(false)
      setOpen(true)
    }

  }//end of 아이디 유효성 검사

  /* 되돌아가기 버튼 */
  const joinBack = () =>{
    navigate('/')
  }

  /* 초기화 버튼 */
  const resetClick = () => {
    window.location.href = window.location.href;
  }


  return (
    <>
      <MainHeader/>
        <div className='sponContainer' >
          <Form className='sponsor-form' noValidate validated={validated} onSubmit={handleSubmit} > 
            <h3 className='sponsor-form-text'> <img src='/images/register.gif' style={{width:"11%"}}/> 회원가입 </h3>
            <br />
            <br />

            <Form.Group as={Row} className="mb-3" controlId="userId" > 
                  <Form.Label column sm={2}>아이디</Form.Label>
                  <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                    <Form.Control 
                    type="text"
                    onChange={handleUserIdChange}
                    />
                    <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                      아이디를 입력해주세요.
                    </Form.Control.Feedback>
                    <Button variant='warning' style={{marginLeft: "10px", width: "40%"}} onClick={idCheck} aria-controls="idCheck-content" aria-expanded={open}>중복검사</Button>
                  </Col>
                  <div style={{ display: open ? "block" : "none" }}>
                    <Fade in={open}>
                      <div id="idCheck-content" style={{display : "flex", justifyContent: "left", marginLeft:"120px" , color: check ? "green" : "red", height:"15px"}}>
                        {check ? "사용할 수 있는 아이디입니다." : "이미 사용 중인 아이디입니다."}
                      </div>
                    </Fade>
                  </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="password"> 
                    <Form.Label column sm={2}>비밀번호</Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                        type="password"
                        placeholder="영문, 특수문자 포함 6~8글자" 
                        onChange={(e) => setUserPw(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                          형식에 맞게 작성해주세요.
                        </Form.Control.Feedback>
                    </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="userName">  {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
              <Form.Label column sm={2}>이름</Form.Label>
              <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="ex)홍길동" 
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                    한글만 입력해주세요.
                  </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="userBday">
              <Form.Label column sm={2}>
              생년월일
              </Form.Label>
              <Col sm={8}>
                <Form.Control 
                type="date" 
                placeholder="생년월일을 입력해주세요." 
                required
                value={userBday}
                onChange={(e) => setUserBday(e.target.value)}
                />
              </Col>
            </Form.Group>

            <fieldset>
                <Form.Group as={Row} className="mb-3" controlId="userGender">
                <Form.Label as="legend" column sm={2}>
                성별
                </Form.Label>
                <Col sm={8}>
                    <Form.Check
                      type="radio"
                      label="남성"
                      name="userGender" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                      id="userGender1"   // label과 연결하는데 사용
                      value="남성"
                      onChange={(e) => setUserGender(e.target.value)}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="여성"
                      name="userGender"
                      id="userGender2"
                      value="여성"
                      onChange={(e) => setUserGender(e.target.value)}
                      required
                    />
                </Col>
                </Form.Group>
            </fieldset>

              <Form.Group as={Row} className="mb-3" controlId="userTel">
                  <Form.Label column sm={2}>연락처</Form.Label>
                  <Col sm={8}>
                  <Form.Control 
                  type="tel" 
                  placeholder="- 를 제외하고 작성해주세요" 
                  pattern="[0-9]*"
                  required
                  onFocus={() => setShowError2(true)}
                  onBlur={() => setShowError2(false)}
                  value={userTel}
                  onChange={(e) => setUserTel(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid" style={{ display: showError2 ? "block" : "none" }}>
                숫자만 입력해주세요.
              </Form.Control.Feedback>
                  </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="userEmail">  {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
                <Form.Label column sm={2}>이메일</Form.Label>
                <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Kh@example.com"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                      양식에 맞게 입력해주세요.
                    </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <fieldset>
                <Form.Group as={Row} className="mb-3" controlId="userEnter">
                  <Form.Label as="legend" column sm={2}>입원여부</Form.Label>
                  <Col sm={8}>
                    <Form.Check
                      type="radio"
                      label="입원"
                      name="userEnter"
                      id="userEnter1"
                      value="입원"
                      checked={userEnter === '입원'} // 현재 선택된 값과 비교하여 체크 여부 결정
                      onChange={(e) => setUserEnter(e.target.value)} // 상태 업데이트 함수
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="비입원"
                      name="userEnter"
                      id="userEnter2"
                      value="비입원"
                      checked={userEnter === '비입원'}
                      onChange={(e) => setUserEnter(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
              <br />
              
              <Form.Check
                  required
                  label="아래 내용을 확인하였으며 개인정보 처리 방침안내의 내용에 동의합니다. (체크필수)"
                  feedback="동의 필수 항목입니다."
                  feedbackType="invalid"
              />

              <Form.Group as={Row} className="mb-3" controlId="service_Check">
                  <Form.Label column sm={10}>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>개인정보 처리방침 안내</Accordion.Header>
                        <Accordion.Body> <KhPrivacy /></Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                </Form.Label>
              </Form.Group>

              <br />
            {/* 구글 캡차 서비스 */}
            <GoogleRecaptcha />
              <br />
              <br />

              <Form.Group as={Row} className="mb-3" >
                  <Col sm={{ span: 10, offset: 3 }}>
                  <Button type="submit" variant="success" >작성완료</Button>{' '}
                  <Button variant="secondary" onClick={joinBack}>돌아가기</Button>{' '}
                  <Button type="reset" variant="secondary"  onClick={resetClick} >초기화</Button>
                  </Col>
              </Form.Group>

          </Form>
      </div>
    </>
  )
}

export default Register
