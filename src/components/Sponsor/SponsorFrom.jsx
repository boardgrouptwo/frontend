import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MainHeader from '../include/MainHeader'
import Bottom from '../include/Bottom'
import GoogleRecaptcha from '../google/GoogleRecaptcha'
import KhSponorServicebar from '../khservice/KhSponorServicebar';
import InputGroup from 'react-bootstrap/InputGroup'
import "../css/spon.css"
import { useNavigate } from 'react-router-dom';
import { SponsorDB, sponsorInsertDB} from '../../service/SponsorDBLogic';
import { useSelector } from 'react-redux'
import { kakaoPayReady } from '../kakao/KakaoPay';
import { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import KhPrivacy from '../khservice/KhPrivacy';
import PaymentModal from '../payment/PaymentModal';
import { paymentImp } from '../../service/PaymentDBLogic';
import { async } from 'q';


const SponsorFrom = () => {
    const isLogin = useSelector(state => state.isLogin);  //로그인정보 가져오기
    const token = useSelector(state => state.token); 
    
    const navigate = useNavigate();
    // 초기값 설정
    const user = useSelector(state => state.nickname); //user 닉네임 가져오기
    const[sponsorId, setSponsorId]= useState(''); // 아이디
    const[sponsorName, setSponsorName]= useState(''); // 이름 
    const[sponsorNumber, setSponsorNumber]= useState('');  //전화번호
    const[sponsorDate, setsponsorDate]= useState(''); // 후원일자
    const [sponRadiosHuwon, setSponRadiosHuwon] = useState(''); // 일반후원.물품후원 선택 라디오 버튼
    const [sponsorMoney, setSponsorMoney] = useState(''); // 결제금액 
    const [sponsorPay, setSponsorPay] = useState("");  // 결제방법 라디오 버튼 
    const [sponOpen, setSponOpen] = useState(""); // 공개.비공개 라디오 버튼
    const [sponsorContent, setSponsorContent] = useState(''); //메모


    const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
    const [showError2, setShowError2] = useState(false);//폼 검증 유효성 검사
    const [showError3, setShowError3] = useState(false);//폼 검증 유효성 검사
    const [validated, setValidated] = useState(false); //폼 검증 유효성 검사


    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
      setModalOpen(true);
    }
    const closeModal = () => {
      setModalOpen(false);
    }

    useEffect(()=> {
      //로그인 한 사용자는 home으로 이동
      if(isLogin === true) {
        navigate("/loginError")
      }
    },[]);


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
        spon_number:sponsorNumber,
        spon_date: sponsorDate,
        spon_huwon: sponRadiosHuwon,
        spon_money: sponsorMoney,
        spon_pay: sponsorPay,
        spon_open: sponOpen,
        spon_content: sponsorContent,
      }
      console.log(member);


      // 카카오페이 결제 로직
      if (sponRadiosHuwon === "일반 후원" && sponsorPay === "홈페이지 결제") {
        console.log("test")
        openModal();

        const payForm = {
          pay_type: "후원",                      // 결제 타입
          user_id : user,                       // 사용자 정보
          user_tel: sponsorNumber,              // 사용자 연락처
          item_name : "기부",                    // 상품명
          total_amount : sponsorMoney,          // 결제 금액
          spon_open: sponOpen,                  // 익명 여부
          spon_content: sponsorContent,         // 후원 내용
          spon_pay: sponsorPay,                 // 결제 종류
        };

        const res = await kakaoPayReady(payForm, token);
        console.log(res.data)

        // 카카오페이 결제 성공 시 DB에 저장
        if (!res.data) {
          console.log("결제 실패하였습니다")
        } else {
          console.log("카카오결제 성공하였습니다")

          // 카카오페이 결제 팝업 출력
          const screenWidth = window.screen.width;
          const screenHeight = window.screen.height;
          const popupWidth = 430;
          const popupHeight = 500;
          
          const left = (screenWidth - popupWidth) / 2;
          const top = (screenHeight - popupHeight) / 2;
          
          window.open(res.data, 'Kakao Pay', `width=${popupWidth},height=${popupHeight},top=${top},left=${left},location=no,status=no,scrollbars=yes`);
        }
      } // end of 카카오페이 결제
      // 카카오페이 결제 이외 로직
      else {
        // 수정완료 ///////////////////////
        const res = await sponsorInsertDB(member, token)
        console.log(res + "," + res.data)
  
        if (!res.data){
            console.log("폼작성에 실패하였습니다")
        }else{
            console.log("폼작성 성공")
            //폼작성 성공시 작성성공 화면으로 이동
            navigate("/sponsor/success");
        }
      }
    };  // end of handleSubmit

    //되돌아가기 버튼
    const sponBack = () =>{
      navigate('/')
    }


  return (
    <>
      <MainHeader />
      <KhSponorServicebar />
      <br />
      <br />
      
      <div className='sponContainer' >
        <Form className='sponsor-form' noValidate validated={validated} onSubmit={handleSubmit} > 
          <h3 className='sponsor-form-text'>🌹 후원하기 🌹</h3>
<br />
<br />


        <Form.Group as={Row} className="mb-3" controlId="sponsorName">  {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
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



        <Form.Group as={Row} className="mb-3" controlId="sponsorNumber">
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
            value={sponsorNumber}
            onChange={(e) => setSponsorNumber(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" style={{ display: showError2 ? "block" : "none" }}>
          숫자만 입력해주세요.
        </Form.Control.Feedback>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="sponsorDate">
            <Form.Label column sm={2}>
            후원일자
            </Form.Label>
            <Col sm={8}>
            <Form.Control 
            type="date" 
            placeholder="후원 신청일을 입력해주세요." 
            required
            value={sponsorDate}
            onChange={(e) => setsponsorDate(e.target.value)}
            />
            </Col>
        </Form.Group>


        <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="sponRadios">
            <Form.Label as="legend" column sm={2}>
            후원방법
            </Form.Label>
            <Col sm={8}>
                <Form.Check
                  type="radio"
                  label="일반 후원"
                  name="sponRadios" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                  id="sponRadios1"   // label과 연결하는데 사용
                  value="일반 후원"
                  checked={sponRadiosHuwon === "일반 후원"}
                  onChange={(e) => setSponRadiosHuwon(e.target.value)}
                  required
                />
                <Form.Check
                  type="radio"
                  label="물품 후원"
                  name="sponRadios"
                  id="sponRadios2"
                  value="물품 후원"
                  checked={sponRadiosHuwon === "물품 후원"}
                  onChange={(e) => setSponRadiosHuwon(e.target.value)}
                />
            </Col>
            </Form.Group>
        </fieldset>

        <Form.Group as={Row} className= "mb-3" controlId="sponsorMoney">
          <Form.Label  column sm={2} >금액</Form.Label>
          <Col sm={8}>
          <InputGroup hasValidation>  {/* 유효성 검사 설정*/}

            <Form.Control
              type="text"
              pattern="[0-9]*"
              placeholder="1의 자리부터 작성해주세요"
              required
              onFocus={() => setShowError3(true)}
              onBlur={() => setShowError3(false)}
              value={sponsorMoney}
              onChange={(e) => setSponsorMoney(e.target.value)}
            />
            <InputGroup.Text id="sponsorMoney"> 원 </InputGroup.Text>
        <Form.Control.Feedback type="invalid" style={{ display: showError3 ? "block" : "none" }}> {/*폼 컨트롤이 틀릴 경우 피드백 요소 추가  */}
        숫자만 입력 가능합니다. 물품 후원일 경우 0을 입력하세요.
        </Form.Control.Feedback>
          </InputGroup>
          </Col>
        </Form.Group>


        <fieldset>
            <Form.Group as={Row} className="mb-3"  controlId="sponsorPay">
            <Form.Label as="legend" column sm={2}>
            입금방법
            </Form.Label>
            <Col sm={8}>
            <Form.Check
              type="radio"
              label="홈페이지 결제"
              name="payment"
              value="홈페이지 결제"
              id="payment1"   // label과 연결하는데 사용
              checked={sponsorPay === "홈페이지 결제"}
              onChange={(e) => setSponsorPay(e.target.value)}
              required
            />
            <Form.Check
              type="radio"
              label="방문 접수"
              name="payment"
              value="방문 접수"
              id="payment2"   // label과 연결하는데 사용
              checked={sponsorPay === "방문 접수"}
              onChange={(e) => setSponsorPay(e.target.value)}
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
              name="sponOpen"
              id="sponOpen1"
              value="공개"
              checked={sponOpen === '공개'} // 현재 선택된 값과 비교하여 체크 여부 결정
              onChange={(e) => setSponOpen(e.target.value)} // 상태 업데이트 함수
              required
            />
            <Form.Check
              type="radio"
              label="비공개"
              name="sponOpen"
              id="sponOpen2"
              value="비공개"
              checked={sponOpen === '비공개'}
              onChange={(e) => setSponOpen(e.target.value)}
            />
          </Col>
            </Form.Group>
        </fieldset>


          <Form.Group as={Row} className="mb-3" controlId="sponsorContent">
          <Form.Label column sm={2}>
            전하고 싶은 말
          </Form.Label>
          <Col sm={8}>
            <Form.Control 
            as="textarea" 
            rows={3} 
            value={sponsorContent} 
            onChange={(e) => setSponsorContent(e.target.value)} 
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

      {/* 구글 캡차 서비스 */}
      <GoogleRecaptcha />
<br />
        <Form.Group as={Row} className="mb-3" >
            <Col sm={{ span: 10, offset: 3 }}>
            <Button type="submit" variant="success" >작성완료</Button>{' '}
            <Button variant="secondary" onClick={sponBack}>돌아가기</Button>{' '}
            <Button type="reset" variant="secondary" value="Reset" >초기화</Button>
            </Col>
        </Form.Group>
        </Form>



        
    </div>
    </>
  )
}

export default SponsorFrom