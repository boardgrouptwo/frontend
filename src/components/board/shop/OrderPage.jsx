import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../../include/MainHeader';
import styled from 'styled-components';
import { Accordion, Button, Col, Form, Row, Table } from 'react-bootstrap';
import { userInfoDB } from '../../../service/MemberDBLogic';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import KhPrivacy from '../../khservice/KhPrivacy';
import { kakaoPayReady } from '../../kakao/KakaoPay';

const OrderDiv = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid black;
`
const RawTitleH5 = styled.h5`
  text-align: left;
  margin-bottom: 10px;
`
const OrderRawDiv = styled.div`
  margin-bottom: 10px;
`

// TODO: 작성 필요!!!

const OrderPage = () => {
  const userid = useSelector(state => state.userid);     // 사용자 아이디
  const token = useSelector(state => state.token); 

  const location = useLocation();
  const navigate = useNavigate();
  const [ orderInfo, setOrderInfo ] = useState({});     // 주문정보

  // 사용자 정보 객체
  const [ userInfo, setUserInfo ] = useState({});

  /* 폼 검증 유효성 검사 */
  const [ checkbox1, setCheckbox1 ] = useState(false);
  const [ checkbox2, setCheckbox2 ] = useState(false);
  const [ checkbox3, setCheckbox3 ] = useState(false);
  const [ checkbox4, setCheckbox4 ] = useState(false);

  // 초기값 설정
  const[userId, setUserId]= useState(''); // 아이디
  const[userName, setUserName]= useState(''); // 이름 
  const[userAddr, setUserAddr]= useState(''); // 주소 
  const[requestText, setRequestText]= useState('직접 받을게요'); // 배송요청사항
  const[userTel, setUserTel]= useState('');  //전화번호
  const[payType, setPayType]= useState('');  //결제타입
  
  const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
  const [showError2, setShowError2] = useState(false);//폼 검증 유효성 검사
  const [validated, setValidated] = useState(false); //폼 검증 유효성 검사

  // 회원가입을 하기 위해서는 아이디 중복검사를 해야함
  const[check, setCheck] = useState(false);

  console.log(orderInfo);

  
  const onClickPayment = () => {
    
  }
  // 뒤로 가기
  const orderBack = () => {
    window.history.back();
  }
  // 초기화 버튼
  const resetClick = () => {
    window.location.href = window.location.href;
  }
  
  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    
    // //유효 확인 실패 했을 경우
    // if (form.checkValidity() === false) { 
    //   event.preventDefault();  //이벤트 중단
    //   event.stopPropagation(); //이벤트 중단
    // }
    // setValidated(true);  // validated 변수를 true로 설정

    // // 동의를 안했으면 제출할 수 없음
    // if(check === false){
    //   Swal.fire({
    //     icon: "warning",
    //     title: "구매동의 해주세요",
    //     showCancelButton: false,
    //     confirmButtonText: "확인",
    //   })
    // }
    // event.preventDefault();
    
    const order = {
      user_id: userInfo.user_id,
      user_name: userInfo.user_name,
      user_tel: userInfo.user_tel,
      user_email: userInfo.user_email,
      user_addr: userAddr,
      req_text: requestText,
      item_name: orderInfo.product_title,
      total_amount: orderInfo.product_price,
      method: payType,
      pay_type: "결제",
    }
    console.log(order)

    if (order.method === "kakao") {
      console.log("카카오페이")

      const res = await kakaoPayReady(order);
      console.log(res.data)

      if (!res.data) {
        console.log("결제 실패하였습니다")
      } else {
        console.log("카카오결제 성공하였습니다")

        // 카카오페이 결제 팝업 출력
        window.open(res.data,'카카오페이','width=430,height=500,top=50%,left=50%,location=no,status=no,scrollbars=yes');
      }
    }
  } // end of handleSubmit
  

  useEffect(() => {
    // 주문정보 가져오기
    setOrderInfo({
      product_title: location.state.product_title,      // 상품명
      product_price: location.state.product_price,              // 상품금액
      product_date: location.state.product_date,        // 상품등록일
      product_hit: location.state.product_hit,          // 상품조회수
      product_image: location.state.product_image,      // 상품이미지명
    });

    // 사용자 정보 가져오기
    const FindUserInfo = async () => {
      console.log("FindUserInfo 호출")

      const user = {
        user_id: userid,
      }

      const res = await userInfoDB(user, token);
      console.log(res.data);

      const obj = {
        user_id: res.data.user_id,
        user_name: res.data.user_name,
        user_birth: res.data.user_birth,
        user_gender: res.data.user_gender,
        user_tel: res.data.user_tel,
        user_email: res.data.user_email,
        user_enter: res.data.user_enter,
        user_type: res.data.user_type,
        user_profile_url: res.data.user_profile_url,
        user_memo: res.data.user_memo,
      }

      setUserInfo(obj)
    }

    FindUserInfo();
    console.log(userInfo);
  }, [location.state]);

  
  

  return (
    <>
      <MainHeader />
      <div className='sponContainer' >

        <Form className='sponsor-form' style={{padding: "10%"}} noValidate validated={validated} onSubmit={handleSubmit} > 
          <h3 className='sponsor-form-text'><img src='/images/register.gif' style={{width:"11%"}}/> Order/Payment </h3>
          <br />
          <br />
          {/* 배송정보 */}
          <RawTitleH5 className='sponsor-form-text'> 배송정보 </RawTitleH5>
          <OrderDiv>
            <OrderRawDiv>
              {/* 이름 */}
              <Form.Group as={Row} className="mb-3" controlId="userName">
                <Form.Label column sm={2}>이름</Form.Label>
                <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control 
                    type="text"
                    defaultValue={userInfo.user_name}
                    onChange={(e) => {userInfo.user_name = e.target.value}}
                  />
                  {/* <Form.Control.Feedback type="invalid" style={{ display: userInfo.user_name ? "none" : "block" }}>
                    이름을 입력해주세요.
                  </Form.Control.Feedback> */}
                </Col>
              </Form.Group>
              {/* 연락처 */}
              <Form.Group as={Row} className="mb-3" controlId="userTel">
                <Form.Label column sm={2}>연락처</Form.Label>
                <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control 
                    type="text"
                    defaultValue={userInfo.user_tel}
                    onChange={(e) => {userInfo.user_tel = e.target.value}}
                  />
                  {/* <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                    연락처를 입력해주세요.
                  </Form.Control> */}
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
                  {/* <Form.Control type="invalid" style={{ display: showError ? "block" : "none" }}>
                    주소를 입력해주세요.
                  </Form.Control> */}
                </Col>
              </Form.Group>
              {/* 배송 요청사항 */}
              <Form.Group as={Row} className="mb-3" controlId="requestText">
                <Form.Label column sm={2}>배송 요청사항</Form.Label>
                <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control 
                    as="select"
                    onChange={(e) => setRequestText(e.target.value)}
                  >
                    <option>배송 시 요청사항을 선택해주세요</option>
                    <option>직접 받을게요</option>
                    <option>경비실에서 찾을게요</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </OrderRawDiv>
          </OrderDiv>

          {/* 상품정보 */}
          <RawTitleH5 className='sponsor-form-text'> 상품정보 </RawTitleH5>
          <OrderDiv>
            <OrderRawDiv>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>상품이미지</th>
                    <th>상품명</th>
                    <th>상품가격</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img 
                        style={{ width: "50px", height: "50px", textAlign: "center" }}
                        src={`http://localhost:3000/images/shop/${orderInfo.product_image}`}
                        alt={orderInfo.product_title} 
                      />
                    </td>
                    <td>{orderInfo.product_title}</td>
                    <td>{orderInfo.product_price}</td>
                  </tr>
                </tbody>
              </Table>
            </OrderRawDiv>
          </OrderDiv>

          {/* 결제정보 */}
          <RawTitleH5 className='sponsor-form-text'> 결제정보 </RawTitleH5>
          <OrderDiv>
            <OrderRawDiv>
              <fieldset>
                <Form.Group as={Row} className="mb-3" controlId="payType">
                  <Form.Label>결제 수단</Form.Label>
                  <Row>
                    <Col>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="카드"
                        id="paymentType1"
                        value="card"
                        onChange={(e) => {
                          setPayType(e.target.value);
                        }}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="카카오페이"
                        id="paymentType2"
                        value="kakao"
                        onChange={(e) => {
                          setPayType(e.target.value);
                        }}
                      />
                    </Col>
                    {/* 
                    <Col>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="가상계좌"
                        id="paymentType3"
                        value="virt"
                        onChange={(e) => {
                          setPayType(e.target.value);
                        }}
                      />
                    </Col>
                    */}
                  </Row>
                  {/* 
                  <Row>
                    <Col>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="카드"
                        id="paymentType1"
                        value="card"
                        onChange={(e) => {
                          setPayType(e.target.value);
                        }}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="카카오페이"
                        id="paymentType2"
                        value="kakao"
                        onChange={(e) => {
                          setPayType(e.target.value);
                        }}
                      />
                    </Col>
                    
                    <Col>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="가상계좌"
                        id="paymentType3"
                        value="virt"
                        onChange={(e) => {
                          setPayType(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                  */}
                </Form.Group>
              </fieldset>
            </OrderRawDiv>
            <hr />
            <OrderRawDiv>
              <Form.Label>품절 시 환불 안내</Form.Label>
              <div style={{fontSize: "13px", color: "gray"}}>
                결제하신 수단으로 취소됩니다.<br />
                · 입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. 이에 품절 시 빠르게 환불 처리해드립니다.<br />
                · 현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다. 은행명, 계좌번호, 예금주명을 정확히 기재 부탁드립니다.<br />
                · 환불 받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불 처리됩니다.<br />
              </div>
            </OrderRawDiv>
          </OrderDiv>

          {/* 결제 동의 */}
          <RawTitleH5>결제 동의</RawTitleH5>
          <OrderDiv style={{padding: "5% 30%"}}>
              <OrderRawDiv style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Form.Group as={Row} className="mb-3" controlId="service_Check">
                  <Form.Check
                    type="checkbox"
                    label="전체 동의하기"
                    checked={checkbox1}
                    onChange={(e) => {
                      setCheckbox1(e.target.checked);
                      setCheckbox2(e.target.checked);
                      setCheckbox3(e.target.checked);
                      setCheckbox4(e.target.checked);
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    label="[필수] 개인정보 수집 및 이용 동의"
                    checked={checkbox2}
                    onChange={(e) => setCheckbox2(e.target.checked)}
                    feedback="필수 동의 항목입니다."
                    feedbackType="invalid"
                  />
                  <Form.Check
                    type="checkbox"
                    label="[필수] 개인정보 제 3자 제공 동의"
                    checked={checkbox3}
                    onChange={(e) => setCheckbox3(e.target.checked)}
                    feedback="필수 동의 항목입니다."
                    feedbackType="invalid"
                  />
                  <Form.Check
                    type="checkbox"
                    label="[필수] 전자결제대행 이용 동의"
                    checked={checkbox4}
                    onChange={(e) => setCheckbox4(e.target.checked)}
                    feedback="필수 동의 항목입니다."
                    feedbackType="invalid"
                  />
                  {/* <Form.Check
                    required
                    label="아래 내용을 확인하였으며 개인정보 처리 방침안내의 내용에 동의합니다. (체크필수)"
                    feedback="필수 동의 항목입니다."
                    feedbackType="invalid"
                  />
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>개인정보 처리방침 안내</Accordion.Header>
                      <Accordion.Body> <KhPrivacy /></Accordion.Body>
                    </Accordion.Item>
                  </Accordion> */}
                </Form.Group>
              </OrderRawDiv>
          </OrderDiv>

          {/* 결제 버튼 */}
          <Col sm={{ span: 10, offset: 4 }}>
            <Button onClick={handleSubmit} >결제</Button>{' '}
            <Button variant="secondary" onClick={orderBack}>돌아가기</Button>{' '}
            <Button type="reset" variant="secondary"  onClick={resetClick} >초기화</Button>
          </Col>
        </Form>
      </div>  
    </>
  )
}

export default OrderPage
