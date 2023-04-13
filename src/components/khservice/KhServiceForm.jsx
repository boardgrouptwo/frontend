import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MainHeader from '../include/MainHeader'
import GoogleRecaptcha from '../google/GoogleRecaptcha'
import InputGroup from 'react-bootstrap/InputGroup'
import "../css/spon.css"
import { useNavigate } from 'react-router-dom';
import KhServiceFrombar from './KhServiceFrombar';
import { useSelector } from 'react-redux'
import { serviceInsertDB, seviceInsertDB } from '../../service/KhServiceDBLogic';


const KhServiceForm = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.nickname); //user 닉네임 가져오기
    // 초기값 설정
    const[serviceId, setServiceId]= useState(''); // 아이디
    const[serviceName, setServiceName]= useState(''); // 이름 
    const[serviceNumber, setServiceNumber]= useState('');  //연락처
    const[serviceDate, setServiceDate]= useState(''); // 방문날짜
    const [serviceRadios, setServiceRadios] = useState(''); // 신청목적 선택 라디오 버튼
    const [servicePerson, setServicePerson] = useState(''); // 방문인원
    const [serviceMemo, setServiceMemo] = useState(''); //메모

    const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
    const [showError2, setShowError2] = useState(false);//폼 검증 유효성 검사
    const [showError3, setShowError3] = useState(false);//폼 검증 유효성 검사
    const [validated, setValidated] = useState(false); //폼 검증 유효성 검사


// 폼 제출 이벤트 처리
    const handleSubmit = async(event) => {   // form 컴포넌트에서 submit 할 때 실행됨
      const form = event.currentTarget;
      if (form.checkValidity() === false) { //유효 확인 실패 했을 경우
        event.preventDefault();  //이벤트 중단
        event.stopPropagation(); //이벤트 중단
      }
      setValidated(true);  // validated 변수를 true로 설정

      event.preventDefault();

      const member= {
        user_id: user,
        service_date: serviceDate,
        service_number: serviceNumber,
        service_radios: serviceRadios,
        service_person: servicePerson,
        service_memo: serviceMemo,
    }

    console.log(member);

    // 수정필요 ///////////////////////
    const res = await serviceInsertDB(member)
    console.log(res + "," + res.data)

    if (!res.data){
        console.log("폼작성에 실패하였습니다")
    }else{
        console.log("폼작성 성공")
        //폼작성 성공시 작성성공 화면으로 이동
        navigate("/service/success");
    }

    };

    //되돌아가기 버튼
    const serviceBack = () =>{
      navigate('/')
    }
    //구글 캡차 서비스
    const onChange = (value) => {
        console.log('Captcha value:', value);
        }


  return (
    <>
      <MainHeader />
      <KhServiceFrombar />
      <br />
      <br />
      
      <div className='sponContainer' >
        <Form className='service-form' noValidate validated={validated} onSubmit={handleSubmit} > 
          <h3 className='service-form-text'>자원봉사 신청</h3>
<br />
<br />

    <Form.Group as={Row} className="mb-3" controlId="serviceName">  {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
      <Form.Label column sm={2}>
        성함
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          type="text"
          defaultValue={user} 
          disabled={true}
        />
        <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
          한글만 입력해주세요.
        </Form.Control.Feedback>
      </Col>
    </Form.Group>



        <Form.Group as={Row} className="mb-3" controlId="serviceNumber">
            <Form.Label column sm={2}>
            연락처
            </Form.Label>
            <Col sm={8}>
            <Form.Control 
            type="tel" 
            placeholder="- 를 제외하고 작성해주세요" 
            pattern="[0-9]*"
            required
            onFocus={() => setShowError2(true)}
            onBlur={() => setShowError2(false)}
            value={serviceNumber}
            onChange={(e) => setServiceNumber(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" style={{ display: showError2 ? "block" : "none" }}>
          숫자만 입력해주세요.
        </Form.Control.Feedback>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="serviceDate">
            <Form.Label column sm={2}>
            방문일자
            </Form.Label>
            <Col sm={8}>
            <Form.Control 
            type="date" 
            placeholder="방문일을 입력해주세요" 
            required
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            min={new Date().toISOString().slice(0,10)}   /*  달력에서 오늘 이전의 날짜는 선택할 수 없게 설정 */
            />
            </Col>
        </Form.Group>


        <Form.Group as={Row} className= "mb-3" controlId="servicePerson">
          <Form.Label  column sm={2} >인원</Form.Label>
          <Col sm={8}>
          <InputGroup hasValidation>  {/* 유효성 검사 설정*/}
            <Form.Control
              type="text"
              pattern="[0-9]*"
              placeholder="인원수를 숫자로 작성해주세요"
              required
              onFocus={() => setShowError3(true)}
              onBlur={() => setShowError3(false)}
              value={servicePerson}
              onChange={(e) => setServicePerson(e.target.value)}
            />
            <InputGroup.Text id="servicePerson"> 명 </InputGroup.Text>
        <Form.Control.Feedback type="invalid" style={{ display: showError3 ? "block" : "none" }}> {/*폼 컨트롤이 틀릴 경우 피드백 요소 추가  */}
        숫자만 입력 가능합니다. 인원이 정해지지 않은 경우 대략적인 인원수를 입력하세요.
        </Form.Control.Feedback>
          </InputGroup>
          </Col>
        </Form.Group>


        <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="serviceRadios">
            <Form.Label as="legend" column sm={2}>
            신청목적
            </Form.Label>
            <Col sm={8}>
                <Form.Check
                  type="radio"
                  label="봉사시간"
                  name="serviceRadios" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                  id="serviceRadios1"   // label과 연결하는데 사용
                  value="봉사시간"
                  checked={serviceRadios === "봉사시간"}
                  onChange={(e) => setServiceRadios(e.target.value)}
                  required
                />
                <Form.Check
                  type="radio"
                  label="체험활동"
                  name="serviceRadios"
                  id="serviceRadios2"
                  value="체험활동"
                  checked={serviceRadios === "체험활동"}
                  onChange={(e) => setServiceRadios(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="정기봉사"
                  name="serviceRadios"
                  id="serviceRadios3"
                  value="정기봉사"
                  checked={serviceRadios === "정기봉사"}
                  onChange={(e) => setServiceRadios(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="입소자의 보호자"
                  name="serviceRadios"
                  id="serviceRadios4"
                  value="입소자의 보호자"
                  checked={serviceRadios === "입소자의 보호자"}
                  onChange={(e) => setServiceRadios(e.target.value)}
                />
            </Col>
            </Form.Group>
        </fieldset>





          <Form.Group as={Row} className="mb-3" controlId="serviceMemo">
          <Form.Label column sm={2}>
            자기소개
          </Form.Label>
          <Col sm={8}>
            <Form.Control 
            as="textarea" 
            rows={3} 
            value={serviceMemo} 
            onChange={(e) => setServiceMemo(e.target.value)} 
            />
          </Col>
        </Form.Group>

<br />
<br />
<br />
        <Form.Group as={Row} className="mb-3" controlId="service_Check">
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
            <Button variant="secondary" onClick={serviceBack}>돌아가기</Button>{' '}
            <Button type="reset" variant="secondary" value="Reset" >초기화</Button>
            </Col>
        </Form.Group>
        </Form>



        
    </div>
    
    </>
  )
}

export default KhServiceForm