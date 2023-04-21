import React, { useState } from 'react'
import { Button, Col, Collapse, Fade, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import GoogleRecaptcha from '../google/GoogleRecaptcha';
import MainHeader from '../include/MainHeader';

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
  const [enterDate, setEnterDate] = useState(""); //입원일자

  const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
  const [showError2, setShowError2] = useState(false);//폼 검증 유효성 검사
  const [validated, setValidated] = useState(false); //폼 검증 유효성 검사

  /* 회원가입을 하기 위해서는 아이디 중복검사를 해야함 */
  const[check, setCheck] = useState(false);

  /* 아이디 중복 검사 결과내용 */
  const [open, setOpen] = useState(false);


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
        alert("아이디 중복 검사를 해주세요.")
      }

      event.preventDefault();

      //화면에 입력된 값을 DB로 보내는
      const member= {
        user_id: userId,
        user_pw: userPw,
        user_name: userName,
        user_birth: userBday,
        user_gender: userGender,
        user_tel: userTel,
        user_email: userEmail,
        user_enter: userEnter, 
        enter_date: enterDate,
      }
      console.log(member);
  };  // end of handleSubmit


  //아이디 유효성 검사
  const idCheck = () =>{
    console.log("아이디 중복검사 버튼 클릭")
      setOpen(!open)
      setCheck(!check)
  }

  //되돌아가기 버튼
  const joinBack = () =>{
    navigate('/')
  }


  return (
    <>
      <MainHeader/>
            <div className='sponContainer' >
                  <Form className='sponsor-form' noValidate validated={validated} onSubmit={handleSubmit} > 
                    <h3 className='sponsor-form-text'> 회원가입 </h3>
                    <br />
                    <br />
                          <Form.Group as={Row} className="mb-3" controlId="userId" > 
                                  <Form.Label column sm={2}>아이디</Form.Label>
                                  <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                                      <Form.Control 
                                      type="text"
                                      onChange={(e) => setUserId(e.target.value)}
                                      />
                                      <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                                        아이디를 입력해주세요.
                                      </Form.Control.Feedback>
                                      <Button variant='warning' style={{marginLeft: "10px", width: "40%"}} onClick={idCheck} aria-controls="idCheck-content" aria-expanded={open}>중복검사</Button>
                                  </Col>
                                  <Fade in={open}>
                                            <div id="idCheck-content" style={{display : "flex", justifyContent: "left", marginLeft:"120px" , color: check ? "green" : "red"}}>
                                                {check ? "사용할 수 있는 아이디입니다." : "이미 사용 중인 아이디입니다."}
                                            </div>
                                  </Fade>
                          </Form.Group>

                          <Form.Group as={Row} className="mb-3" controlId="userPw"> 
                                  <Form.Label column sm={2}>비밀번호</Form.Label>
                                  <Col sm={8}>
                                      <Form.Control 
                                      type="text"
                                      onChange={(e) => setUserPw(e.target.value)}
                                      />
                                      <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                                        특수문자 포함 6~8글자로 작성해주세요.
                                      </Form.Control.Feedback>
                                  </Col>
                          </Form.Group>

                          <Form.Group as={Row} className="mb-3" controlId="userName">  {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
                              <Form.Label column sm={2}>이름</Form.Label>
                              <Col sm={8}>
                                  <Form.Control
                                    type="text"
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
                          <Form.Group as={Row} className="mb-3" controlId="userRadios">
                          <Form.Label as="legend" column sm={2}>
                          성별
                          </Form.Label>
                          <Col sm={8}>
                              <Form.Check
                                type="radio"
                                label="남성"
                                name="userRadios" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                                id="userRadios1"   // label과 연결하는데 사용
                                value="남성"
                                onChange={(e) => setUserGender(e.target.value)}
                                required
                              />
                              <Form.Check
                                type="radio"
                                label="여성"
                                name="userRadios"
                                id="userRadios2"
                                value="여성"
                              />
                          </Col>
                          </Form.Group>
                      </fieldset>

                      <Form.Group as={Row} className="mb-3" controlId="sponsorNumber">
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

                      <Form.Group as={Row} className="mb-3" controlId="userName">  {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
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
                            <Form.Group as={Row} className="mb-3">
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

                      <Form.Group as={Row} className="mb-3" controlId="sponsorDate">
                          <Form.Label column sm={2}>
                          입원일자
                          </Form.Label>
                          <Col sm={8}>
                          <Form.Control 
                          type="date" 
                          placeholder="입원 신청일을 입력해주세요." 
                          required
                          value={enterDate}
                          onChange={(e) => setEnterDate(e.target.value)}
                          disabled={userEnter==='입원'?false:true}
                          />
                          </Col>
                      </Form.Group>
                      <br />
                      <br />
                      <Form.Group as={Row} className="mb-3" controlId="sponsor_Check">
                        <Form.Label column sm={5}>
                          개인정보 처리방침 안내
                        </Form.Label>

                      <Form.Check
                        required
                        label="아래 내용을 확인하였으며 개인정보 처리 방침안내의 내용에 동의합니다. (체크필수)"
                        feedback="동의 필수 항목입니다."
                        feedbackType="invalid"
                      />
                    </Form.Group>

                    {/* 구글 캡차 서비스 */}
                    <GoogleRecaptcha />
                      <br />

                      <Form.Group as={Row} className="mb-3" >
                          <Col sm={{ span: 10, offset: 3 }}>
                          <Button type="submit" variant="success" >작성완료</Button>{' '}
                          <Button variant="secondary" onClick={joinBack}>돌아가기</Button>{' '}
                          <Button type="reset" variant="secondary" value="Reset" >초기화</Button>
                          </Col>
                      </Form.Group>
                  </Form>
          </div>
    </>
  )
}

export default Register
