import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MainHeader from '../include/MainHeader'
import SponsorFrombar from './SponsorFrombar'
import { useState } from 'react';


const SponsorFrom = () => {
    const [showError, setShowError] = useState(false);



  return (
    <>
      <MainHeader />
      <SponsorFrombar />
      <br />
      <br />
      <div className='container' style={{ }}>
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="sponsor_name">
      <Form.Label column sm={2}>
        성함
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="text"
          placeholder="신청자 본인의 이름을 기입해주세요"
          pattern="[ㄱ-ㅎㅏ-ㅣ가-힣]*"
          required
          isInvalid
          onFocus={() => setShowError(true)}
          onBlur={() => setShowError(false)}
        />
        <Form.Control.Feedback type="invalid" style={{ display: showError ? 'block' : 'none' }}>
          한글만 입력해주세요.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>



        <Form.Group as={Row} className="mb-3" controlId="sponsor_number">
            <Form.Label column sm={2}>
            연락처
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="tel" placeholder="- 를 제외하고 작성해주세요" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="sponsor_birth">
            <Form.Label column sm={2}>
            생년월일
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="date" placeholder="생년월일 9자리를 입력해주세요" />
            </Col>
        </Form.Group>


        <fieldset>
            <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
            후원방법
            </Form.Label>
            <Col sm={10}>
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

        <Form.Group as={Row} className="mb-3" controlId="sponsor_birth">
            <Form.Label column sm={2}>
            생년월일
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="date" placeholder="생년월일 9자리를 입력해주세요" />
            </Col>
        </Form.Group>
        

        <Form.Group as={Row} className="mb-3" controlId="sponsor_memo">
            <Form.Label column sm={2}>
            전달하고 싶은 말
            </Form.Label>
            <Col sm={10}>
            <Form.Control as="textarea" rows={3} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign in</Button>
            </Col>
        </Form.Group>
        </Form>
    </div>
    </>
  )
}

export default SponsorFrom