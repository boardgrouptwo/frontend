import React, { useEffect, useState } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../../include/MainHeader';
import styled from 'styled-components';
import { Button, Col, Row } from 'react-bootstrap';

const CONTAINER = styled.div`
  padding-left: 20%;
  padding-top: 2%;
  display: flex;
  
`

// TODO: 작성 필요!!!

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ orderInfo, setOrderInfo ] = useState({});     // 주문정보

  /* 폼 검증 유효성 검사 */
  const [ checkbox1, setCheckbox1 ] = useState(false);
  const [ checkbox2, setCheckbox2 ] = useState(false);
  const [ checkbox3, setCheckbox3 ] = useState(false);
  const [ checkbox4, setCheckbox4 ] = useState(false);

  // 초기값 설정
  const[userId, setUserId]= useState(''); // 아이디
  const[userPw, setUserPw]= useState(''); // 비밀번호
  const[userName, setUserName]= useState(''); // 이름 
  const[userAddr, setUserAddr]= useState(''); // 이름 
  const[userBday, setUserBday]= useState(''); // 생일
  const[userGender, setUserGender]= useState(''); // 성별
  const[userTel, setUserTel]= useState('');  //전화번호
  const[userEmail, setUserEmail]= useState('');  //이메일
  const [userEnter, setUserEnter] = useState(""); //입원자 유무 라디오 버튼

  const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
  const [showError2, setShowError2] = useState(false);//폼 검증 유효성 검사
  const [validated, setValidated] = useState(false); //폼 검증 유효성 검사


  useEffect(() => {
    setOrderInfo({
      product_title: location.state.product_title,      // 상품명
      product_price: location.state.price,              // 상품금액
      product_date: location.state.product_date,        // 상품등록일
      product_hit: location.state.product_hit,          // 상품조회수
      product_image: location.state.product_image,      // 상품이미지명
    });
  }, [location.state]);

  console.log(orderInfo);


  const onClickPayment = () => {

  }
  // 뒤로 가기
  const orderBack = () => {
    navigate('/')
  }
  // 초기화 버튼
  const resetClick = () => {
    window.location.href = window.location.href;
  }
  const handleSubmit = async(event) => {
    const form = event.currentTarget;

    event.preventDefault();

  }




  return (
    <>
      <MainHeader />
      <div className='sponContainer' >

        <Form className='sponsor-form' noValidate validated={validated} onSubmit={handleSubmit} > 
          <h3 className='sponsor-form-text'> Order/Payment </h3>
          <br />
          <br />
          <h5 className='sponsor-form-text'> 배송정보 </h5>
          <div style={{border: "1px solid black"}}>
            {/* 이름 */}
            <Form.Group as={Row} className="mb-3" controlId="userName">
              <Form.Label column sm={2}>이름</Form.Label>
              <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                <Form.Control 
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
                {/* <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}> */}
                <Form.Control type="invalid" style={{ display: showError ? "block" : "none" }}>
                  이름을 입력해주세요.
                </Form.Control>
              </Col>
            </Form.Group>
            {/* 연락처 */}
            <Form.Group as={Row} className="mb-3" controlId="userTel">
              <Form.Label column sm={2}>연락처</Form.Label>
              <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                <Form.Control 
                  type="text"
                  onChange={(e) => setUserTel(e.target.value)}
                />
                {/* <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}> */}
                <Form.Control type="invalid" style={{ display: showError ? "block" : "none" }}>
                  연락처를 입력해주세요.
                </Form.Control>
              </Col>
            </Form.Group>
            {/* 주소 */}
            <Form.Group as={Row} className="mb-3" controlId="userAddr">
              <Form.Label column sm={2}>주소</Form.Label>
              <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                <Form.Control 
                  type="text"
                  onChange={(e) => setUserAddr(e.target.value)}
                />
                <Form.Control type="invalid" style={{ display: showError ? "block" : "none" }}>
                  주소를 입력해주세요.
                </Form.Control>
              </Col>
            </Form.Group>
            {/* 배송 요청사항 */}
            <Form.Group as={Row} className="mb-3" controlId="userAddr">
              <Form.Label>배송 요청사항</Form.Label>
              {/* 콤보박스 */}
              {/* 
                배송 시 요청사항을 선택해주세요
              */}
              <Form.Control as="select">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </Form.Control>
            </Form.Group>
          </div>
          <br />

          <h5 className='sponsor-form-text'> 상품정보 </h5>
          <div style={{border: "1px solid black"}}>
            {/* 상품정보 */}
            <Row>
              <Col xs={3}>
                <img src="product-image.jpg" alt="Product" />
              </Col>
              <Col>
                <h6>상품명</h6>
                <p>상품 가격</p>
                <p>상품 정보</p>
              </Col>
            </Row>
            {/* 배송안내 */}
            <div>
              · 기본적으로 대한민국 내 제주도 및 도서 산간 지역 포함 전 지역, 전 상품 무료배송입니다.
              · 해외 배송 상품이나 일부 업체의 경우, 교환/환불 시 반송료가 다를 수 있으며 상품 페이지에 별도 표기되어 있습니다
            </div>
          </div>
          <br />

          <h5 className='sponsor-form-text'> 결제정보 </h5>
          <div style={{border: "1px solid black"}}>
            {/* 결제수단 */}
            <div>
              결제 수단
            </div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>결제 수단</Form.Label>
                  {/*<div>
                      결제 종류 
                    <div>카드</div>
                    <div>가상계좌</div>
                    <div>계좌이체</div>
                    <div>휴대폰</div>
                  </div>
                  <div>
                    <div>카카오페이</div>
                    <div>삼성페이</div>
                    <div>네이버페이</div>
                    <div>페이코</div>
                  </div>*/}
                  <table>
                    <tr>
                      <td>
                        <Form.Check
                          type="radio"
                          name="paymentType"
                          label="카드"
                        />
                      </td>
                      <td>
                        <p>카드</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          type="radio"
                          name="paymentType"
                          label="카카오페이"
                        />
                      </td>
                      <td>
                        <p>카카오페이</p>
                      </td>
                    </tr>
                  </table>
                </Form.Group>
              </Col>
              <Col>
              {/* 안내 */}
                <Form.Group>
                  <Form.Label>안내</Form.Label>
                  <p>안내 Details</p>
                </Form.Group>
              </Col>
            </Row>

            <div>
              품절 시 환불 안내
            </div>
            <div>
            결제하신 수단으로 취소됩니다.
            · 입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. 이에 품절 시 빠르게 환불 처리해드립니다.
            · 현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다. 은행명, 계좌번호, 예금주명을 정확히 기재 부탁드립니다.
            · 환불 받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불 처리됩니다.
            </div>

            <div>
              주문자 동의
            </div>
            <Form.Group>
              <Form.Label>전체 동의하기</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Information 2</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="전체 동의하기"
                  checked={checkbox1}
                  onChange={(e) => setCheckbox1(e.target.checked)}
                />
                <Form.Check
                  type="checkbox"
                  label="[필수] 개인정보 수집 및 이용 동의"
                  checked={checkbox2}
                  onChange={(e) => setCheckbox2(e.target.checked)}
                  disabled={!checkbox1}
                />
                <Form.Check
                  type="checkbox"
                  label="[필수] 개인정보 제 3자 제공 동의"
                  checked={checkbox3}
                  onChange={(e) => setCheckbox3(e.target.checked)}
                  disabled={!checkbox1}
                />
                <Form.Check
                  type="checkbox"
                  label="[필수] 전자결제대행 이용 동의"
                  checked={checkbox4}
                  onChange={(e) => setCheckbox4(e.target.checked)}
                  disabled={!checkbox1}
                />
              </div>
            </Form.Group>
          </div>

          {/* 결제 버튼 */}
          <Form.Group as={Row} className="mb-3" >
            <Col sm={{ span: 10, offset: 3 }}>
              <Button type="submit" variant="success" >결제</Button>{' '}
              <Button variant="secondary" onClick={orderBack}>돌아가기</Button>{' '}
              <Button type="reset" variant="secondary"  onClick={resetClick} >초기화</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>  
    </>
  )
}

export default OrderPage
