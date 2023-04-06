import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MainHeader from '../include/MainHeader'
import SponsorFrombar from './SponsorFrombar'
import InputGroup from 'react-bootstrap/InputGroup'
import "../css/spon.css"


const SponsorFrom = () => {
    const [showError, setShowError] = useState(false);

    const [validated, setValidated] = useState(false); //폼 검증 유효성 검사

    const handleSubmit = (event) => {   // form 컴포넌트에서 submit 할 때 실행됨
      const form = event.currentTarget;
      if (form.checkValidity() === false) { //유효 확인 실패 했을 경우
        event.preventDefault();  //이벤트 중단
        event.stopPropagation(); //이벤트 중단
      }
      setValidated(true);  // validated 변수를 true로 설정
    };


  return (
    <>
      <MainHeader />
      <SponsorFrombar />
      <br />
      <br />
      
      <div className='sponContainer' style={{ }}>
        <Form className='sponsor-form' noValidate validated={validated} onSubmit={handleSubmit}>
          <h3 className='sponsor-form-text'>후원하기</h3>
<br />
<br />
        <Form.Group as={Row} className="mb-3" controlId="sponsor_name">
      <Form.Label column sm={2}>
        성함
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          type="text"
          placeholder="신청자 본인의 이름을 기입해주세요"
          pattern="[ㄱ-ㅎㅏ-ㅣ가-힣]*"
          required
          isInvalid
          onFocus={() => setShowError(true)}
          onBlur={() => setShowError(false)}
        />
        <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
          한글만 입력해주세요.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>



        <Form.Group as={Row} className="mb-3" controlId="sponsor_number">
            <Form.Label column sm={2}>
            연락처
            </Form.Label>
            <Col sm={8}>
            <Form.Control type="tel" placeholder="- 를 제외하고 작성해주세요" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="sponsor_birth">
            <Form.Label column sm={2}>
            생년월일
            </Form.Label>
            <Col sm={8}>
            <Form.Control type="date" placeholder="생년월일 9자리를 입력해주세요" />
            </Col>
        </Form.Group>


        <fieldset>
            <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
            후원방법
            </Form.Label>
            <Col sm={8}>
                <Form.Check
                type="radio"
                label="일반 후원"
                name="sponRadios"  //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                id="sponRadios1"  // label과 연결하는데 사용
                />
                <Form.Check
                type="radio"
                label="물품 후원"
                name="sponRadios"
                id="sponRadios2"
                />
            </Col>
            </Form.Group>
        </fieldset>

        <Form.Group as={Row} className= "mb-3" controlId="sponsor_money">
          <Form.Label  column sm={2} >금액</Form.Label>
          <Col sm={8}>
          <InputGroup hasValidation>  {/* 유효성 검사 설정*/}
            <InputGroup.Text id="sponsor_money"> \ </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="1의 자리부터 작성해주세요"
              required
            />
            <Form.Control.Feedback type="invalid">   {/*폼 컨트롤이 틀릴 경우 피드백 요소 추가  */}
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
          </Col>
        </Form.Group>


        <fieldset>
            <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
            입금방법
            </Form.Label>
            <Col sm={8}>
                <Form.Check
                type="radio"
                label="홈페이지 결제"
                name="sponPay"  //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                id="sponPay1"  // label과 연결하는데 사용
                />
                <Form.Check
                type="radio"
                label="방문 접수"
                name="sponPay"
                id="sponPay2"
                />
            </Col>
            </Form.Group>
        </fieldset>


        <fieldset>
            <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
            익명여부
            </Form.Label>
            <Col sm={8}>
                <Form.Check
                type="radio"
                label="공개"
                name="sponOpen"  //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                id="sponOpen1"  // label과 연결하는데 사용
                />
                <Form.Check
                type="radio"
                label="비공개"
                name="sponOpen"
                id="sponOpen2"
                />
            </Col>
            </Form.Group>
        </fieldset>


        <Form.Group as={Row} className="mb-3" controlId="sponsor_memo">
            <Form.Label column sm={2}>
            전하고 싶은 말
            </Form.Label>
            <Col sm={8}>
            <Form.Control as="textarea" rows={3} />
            </Col>
        </Form.Group>

<br />
<br />
<br />
        <Form.Group as={Row} className="mb-3" controlId="sponsor_Check">
          <Form.Label column sm={5}>
            개인정보 처리방침 안내
          </Form.Label>

        <Form.Check
          required
          label="아래 내용을 확인하였으며 개인정보 처리 방침안내의 내용에 동의합니다. (체크필수)"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
<br />
        <Form.Group as={Row} className="mb-3" >
            <Col sm={{ span: 10, offset: 3 }}>
            <Button type="submit" variant="success">작성완료</Button>{' '}
            <Button type="submit" variant="secondary">돌아가기</Button>{' '}
            <Button type="reset" variant="secondary" value="Reset" >초기화</Button>
            </Col>
        </Form.Group>
        </Form>



        
    </div>
    
    </>
  )
}

export default SponsorFrom