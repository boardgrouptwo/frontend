import React, { useState } from 'react'
import { Accordion, Button, Col, Fade, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import GoogleRecaptcha from '../google/GoogleRecaptcha';
import MainHeader from '../include/MainHeader';
import { elderInsertDB, elderJoinDB } from '../../service/ElderDBLogic';
import KhPrivacy from '../khservice/KhPrivacy';

const Elder = () => {
  const navigate = useNavigate();

  // 초기값 설정
  const[elderId, setElderId]= useState(''); // 어르신 아이디 - 사용자가 입력하는 것이 아니라 자동으로 부여되는 고유한 값
  // user테이블에도 elder_id를 주고 user테이블의 elder_id와 elder테이블의 elder_id가 같으면 그 유저의 어르신으로 처리

  const[elderName, setElderName]= useState(''); // 어르신 이름 
  const[elderAge, setElderAge]= useState(''); // 어르신 나이
  const[elderGender, setElderGender]= useState(''); // 어르신성별
  const [elderStatus, setElderStatus] = useState("입원"); //어르신 입원 여부
  const [attDate, setAttDate] = useState(""); //입원일
  const [disDate, setDisDate] = useState(""); //퇴원일 - 회원 탈퇴 할 때 입력받기

  const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
  const [showError2, setShowError2] = useState(false);//폼 검증 유효성 검사
  const [validated, setValidated] = useState(false); //폼 검증 유효성 검사

  /*  어르신 아이디 중복검사용 */
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

      event.preventDefault();

        //화면에 입력된 값을 DB로 보내는
        const elder= {
          elder_name: elderName,
          elder_age: elderAge,
          elder_gender: elderGender,
          elder_status: elderStatus, 
          att_date : attDate,
          dis_date: disDate
        }
        console.log(elder);

      const res = await elderJoinDB(elder);
      
      Swal.fire({
        icon: "success",
        title: "입소자 정보 입력 완료",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })
      
      /* 어르신 입소정보 입력 완료시 내 정보로 이동 */
      navigate('/mypage')

  };  // end of handleSubmit



  /* 초기화 버튼 */
  const resetClick = () => {
    window.location.href = window.location.href;
  }


  return (
    <>
      <MainHeader/>
        <div className='sponContainer' >
          <Form className='sponsor-form' noValidate validated={validated} onSubmit={handleSubmit} > 
            <h3 className='sponsor-form-text'> <img src='/images/elder.gif' style={{width:"11%"}}/> 입소자 정보 입력 </h3>
            <br />
            <br />

              <Form.Group as={Row} className="mb-3" controlId="elderName">  {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
                <Form.Label column sm={2}>이름</Form.Label>
                <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="ex)홍길동" 
                      onChange={(e) => setElderName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                      한글만 입력해주세요.
                    </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="elderAge">
                <Form.Label column sm={2}>
                생년월일
                </Form.Label>
                <Col sm={8}>
                  <Form.Control 
                  type="date" 
                  placeholder="생년월일을 입력해주세요." 
                  required
                  value={elderAge}
                  onChange={(e) => setElderAge(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <fieldset>
                  <Form.Group as={Row} className="mb-3" controlId="elderGender">
                  <Form.Label as="legend" column sm={2}>
                  성별
                  </Form.Label>
                  <Col sm={8}>
                      <Form.Check
                        type="radio"
                        label="남성"
                        name="elderGender" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                        id="elderGender1"   // label과 연결하는데 사용
                        value="남성"
                        onChange={(e) => setElderGender(e.target.value)}
                        required
                      />
                      <Form.Check
                        type="radio"
                        label="여성"
                        name="elderGender"
                        id="elderGender2"
                        value="여성"
                        onChange={(e) => setElderGender(e.target.value)}
                        required
                      />
                  </Col>
                  </Form.Group>
              </fieldset>

              <fieldset>
                <Form.Group as={Row} className="mb-3" controlId="elderStatus">
                  <Form.Label as="legend" column sm={2}>입원여부</Form.Label>
                  <Col sm={8}>
                    <Form.Check
                      type="radio"
                      label="입원"
                      name="elderStatus"
                      id="elderStatus1"
                      value="입원"
                      checked={elderStatus === '입원'} // 현재 선택된 값과 비교하여 체크 여부 결정
                      onChange={(e) => setElderStatus(e.target.value)} // 상태 업데이트 함수
                      required
                      disabled={true}
                    />
                    <Form.Check
                      type="radio"
                      label="퇴원"
                      name="elderStatus"
                      id="elderStatus2"
                      value="퇴원"
                      checked={elderStatus === '퇴원'} // 현재 선택된 값과 비교하여 체크 여부 결정
                      onChange={(e) => setElderStatus(e.target.value)} // 상태 업데이트 함수
                      required
                      disabled={true}
                    />
                  </Col>
                </Form.Group>
              </fieldset>

              <Form.Group as={Row} className="mb-3" controlId="attDate">
                <Form.Label column sm={2}>
                입원일
                </Form.Label>
                <Col sm={8}>
                  <Form.Control 
                  type="date" 
                  placeholder="입원일을 선택해주세요." 
                  required
                  value={attDate}
                  onChange={(e) => setAttDate(e.target.value)}
                  />
                </Col>
              </Form.Group>

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
                  <Col sm={{ span: 10, offset: 4 }}>
                  <Button type="submit" variant="success" >제출하기</Button>{' '}
                  <Button type="reset" variant="secondary"  onClick={resetClick} >초기화</Button>
                  </Col>
              </Form.Group>
          </Form>
      </div>
    </>
  )
}

export default Elder
