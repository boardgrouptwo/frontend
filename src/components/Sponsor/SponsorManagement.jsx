import React, { useEffect } from 'react'
import Adminbar from '../admin/Adminbar';
import Bottom from '../include/Bottom';
import { Button, Form, InputGroup, Row, Table } from 'react-bootstrap';
import MainHeader from '../include/MainHeader';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { sponStatisticDB } from '../../service/SponsorDBLogic';
import SponsorStatistic from './SponsorStatistic';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';

const SponsorManagement = () => {
  const userId = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 
  // 화면 전환 시 필요한 훅
  const navigate = useNavigate();
  // URL주소
  const search = decodeURIComponent(useLocation().search);
  // DB서버에서 받아온 정보 담기
  // 배열 타입 [{},{},{}] -> List<Map>, List<VO>
  const [ listBody, setListBody ] = useState([]);
  // pay_type 구분 라벨
  const [ payTypes ] = useState(["전체", "결제", "후원"]);
  // pay_type 상태 관리
  const [ pTitle, setPTitle ] = useState("전체");
  // 사용자 ID
  const [ user_id, setUserId ] = useState();
  // 사용자 이름
  const [ user_name, setUserName ] = useState();
  // 전화번호
  const [ spon_number, setSponNumber ] = useState();
  // 후원일
  const [ spon_date, setSponDate ] = useState();
  // 후원종류
  const [ spon_huwon, setSponHuwon ] = useState();
  // 후원금액
  const [ spon_money, setMoney ] = useState();
  // 결제방법
  const [ spon_pay, setSponPay ] = useState();
  // 익명여부
  const [ spon_open, setSponOpen ] = useState();
  // 후원내용
  const [ spon_content, setSponContent ] = useState();


  const listHeaders = ["후원일", "후원자명", "후원금액", "후원종류", "결제방법", "익명여부", "후원내용"];
  const HeaderWidth = ["20%", "10%", "10%", "10%", "10%", "10%", "30%"];

  // listBody(컬럼명)는 상태 훅이다
  const listHeadersElements = listHeaders.map((listHeader, index) => 
    listHeader === "결제내용" ?
      <th key={index} style={{borderStyle: "solid", width: HeaderWidth[index], paddingLeft: "40px"}}>{listHeader}</th>
      : <th key={index} style={{width: HeaderWidth[index], textAlign: "center"}}>{listHeader}</th>
  )

  // 결제 리스트 출력
  const listItemsElements = listBody.map((listItem, index) => {
    console.log("listItemsElements 호출");

    return (
      // <SponsorStatistic key={index} listItem={listItem} pageNum={pageNumbers} />
      <SponsorStatistic key={index} listItem={listItem} />
    )
  })

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };


  useEffect(() => {
    const payList = async() => {
      // 콤보박스 내용 -> 원비, 후원 중 하나
      // 사용자가 입력한 키워드
      // http://localhost:3000/paymentdetail?pay_type=전체|결제|후원
      // [0] : ?pay_type=전체|결제|후원
      // [1] : 
      const pay_type = search.split("&").filter((item) => {
        return item.match("pay_type")
      })[0]?.split("=")[1];
      console.log("조회 타입 : " + pay_type);

      // 쿼리스트링 없을 경우 "전체" 출력
      setPTitle(pay_type||"전체");
      console.log("사용자ID ===> " + userId);

      const sponlist = {
        user_id: user_id, 
        user_name: user_name, 
        spon_number: spon_number, 
        spon_date: spon_date, 
        spon_huwon: spon_huwon, 
        spon_money: spon_money,
        spon_pay: spon_pay,
        spon_open: spon_open,
        spon_content: spon_content,
      }

      const res = await sponStatisticDB(sponlist);
      console.log(res.data);

      const list = [];

      const datas = res.data;
      datas.forEach((item, index) => {
        console.log(item)

        const obj = {
          user_name: item.user_name, 
          spon_number: item.spon_number, 
          spon_date: item.spon_date, 
          spon_huwon: item.spon_huwon, 
          spon_money: item.spon_money,
          spon_pay: item.spon_pay,
          spon_open: item.spon_open,
          spon_content: item.spon_content,
        }

        list.push(obj);
      })

      // 데이터 셋 변화에 따라 리렌더링 할 것과 기존에 DOM을 그냥 출력하는 것 - 비교 알고리즘
      setListBody(list);  
    }

    payList();
  // }, [setListBody, setPTitle, page, search])
  }, [setListBody])



  return (
    <>
      <Form>
      <Row>
        <Col>
          <Form.Group controlId="memberName">
            <Form.Label>Member Name</Form.Label>
            <Form.Control type="text" placeholder="Enter member name" />
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Member ID</Form.Label>
          <Form.Control type="text" placeholder="Enter member ID" />
        </Col>
        <Col>
          <Form.Label>Payment Method</Form.Label>
          <div style={{display: "flex"}}>
            <Form.Check type="radio" id="r1" label="Option 1" style={{marginRight: "10px"}} />
            <Form.Check type="radio" id="r2" label="Option 2" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Anonymous</Form.Label>
          <div style={{display: "flex"}}>
            <Form.Check type="radio" id="r3" label="Option 1" style={{marginRight: "10px"}}  />
            <Form.Check type="radio" id="r4" label="Option 2" />
          </div>
        </Col>
        <Col>
          <Form.Label>Sponsorship Type</Form.Label>
          <div style={{display: "flex"}}>
            <Form.Check type="radio" id="r5" label="Option 1" style={{marginRight: "10px"}}  />
            <Form.Check type="radio" id="r6" label="Option 2" />
          </div>
        </Col>
        <Col>
          <Form.Label>Sponsorship Date</Form.Label>
          <div style={{display: "flex",width: "200px", marginRight: "10px"}} >
            <Form.Control type="date" />
            <Form.Control type="date" />
          </div>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default SponsorManagement
