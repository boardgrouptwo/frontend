import React, { useEffect } from 'react'
import Adminbar from '../admin/Adminbar';
import Bottom from '../include/Bottom';
import { Button, Form, InputGroup, Pagination, Row, Table } from 'react-bootstrap';
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
  console.log(search);

  // DB서버에서 받아온 정보 담기
  // 배열 타입 [{},{},{}] -> List<Map>, List<VO>
  const [ listBody, setListBody ] = useState([]);
  const [ user_id, setUserId ] = useState();                // 사용자 ID
  const [ user_name, setUserName ] = useState();            // 사용자 이름
  const [ spon_number, setSponNumber ] = useState();        // 전화번호
  const [ start_date, setStartDate ] = useState();          // 후원일
  const [ end_date, setEndDate ] = useState();
  const [ spon_huwon, setSponHuwon ] = useState();          // 후원종류
  const [ spon_money, setMoney ] = useState();              // 후원금액
  const [ spon_pay, setSponPay ] = useState();              // 결제방법
  const [ spon_open, setSponOpen ] = useState();            // 익명여부
  const [ spon_content, setSponContent ] = useState();      // 후원내용

  // 테이블 컬럼 정보
  const listHeaders = ["후원일", "후원자명", "후원금액", "후원종류", "결제방법", "익명여부", "후원내용"];
  const HeaderWidth = ["20%", "10%", "10%", "10%", "10%", "10%", "30%"];

  // 후원 리스트 출력
  const listItemsElements = listBody.map((listItem, index) => {
    console.log("listItemsElements 호출");

    return (
      <SponsorStatistic key={index} listItem={listItem} />
    )
  })


  ////////////////////////// 페이징 ///////////////////////
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 게시글 수
  const MAX_PAGE_ITEMS = 5; // 페이지네이션에서 최대로 보일 페이지 수
  const [totalItems, setTotalItems] = useState(0); // 전체 게시글 수
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const groupSize = Math.ceil(MAX_PAGE_ITEMS / 2);
  const groupIndex = Math.floor((currentPage - 1) / MAX_PAGE_ITEMS);
  const startPage = groupIndex * MAX_PAGE_ITEMS + 1;
  const endPage = startPage + MAX_PAGE_ITEMS - 1;

  const groups = Array.from({ length: Math.ceil(totalPages / MAX_PAGE_ITEMS) }, (_, index) => {
    const start = index * MAX_PAGE_ITEMS;
    return pageNumbers.slice(start, start + MAX_PAGE_ITEMS);
  }).filter(group => group.includes(startPage) || group.includes(endPage) || (group[0] <= startPage && group[group.length - 1] >= endPage));
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page_num = searchParams.get('page');

  const[pageNum, setPageNum] = useState({
    page: page_num,
  })
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate("/sponsor/management?page="+pageNumber)
  }
  ////////////////////////// 페이징 ///////////////////////





  // 경로 설정
  const setPath = () => {
    // console.log(search);
    // let path;

    // // 앞에서 조회한 적이 있을 때 기존에 쿼리스트링 삭제 후 다시 쿼리스트링 만들어야한다
    // if (search.match('condition')) {
    //   path = location.pathname+
    //     search.replace(
    //       `&${search.split('&')
    //         .filter((item) => { 
    //           return item.match('page') 
    //         })
    //       }&${search.split('&')
    //         .filter((item) => { 
    //           return item.match('content') 
    //         })
    //       }`,
    //       `&condition=${tTitle}&content=${content}`
    //     ).replace(
    //       `&${search.split('&')
    //         .filter((item) => { 
    //           return item.match('page') 
    //         })
    //       }`
    //       ,'&page=1&'
    //     )
    // } else {
    //   path = location.pathname+search+`?condition=${tTitle}&content=${content}`
    // }

    // console.log(path)///qna/list?condition=제목&content=내용

    // return path;
  }









  useEffect(() => {
    // 쿼리스트링 분해
    search.split('&').forEach((item, index) => {
      // item = user_name=이름, user_id=아이디, ...
      if (item.match("user_name")) {
        setUserName(item.split("=")[1])
      } else if (item.match("user_id")) {
        setUserId(item.split("=")[1])
      } else if (item.match("spon_pay")) {
        setSponPay(item.split("=")[1])
      } else if (item.match("spon_open")) {
        setSponOpen(item.split("=")[1])
      } else if (item.match("spon_huwon")) {
        setSponHuwon(item.split("=")[1])
      } else if (item.match("start_date")) {
        setStartDate(item.split("=")[1])
      } else if (item.match("end_date")) {
        setEndDate(item.split("=")[1])
      }
    })

    setPageNum({page: page_num})

    // 후원 통계 출력
    const payList = async() => {
      const list = [];

      const sponlist = {
        page: page_num,
        user_id: user_id, 
        user_name: user_name, 
        spon_number: spon_number, 
        start_date: start_date, 
        end_date: end_date, 
        spon_huwon: spon_huwon, 
        spon_money: spon_money,
        spon_pay: spon_pay,
        spon_open: spon_open,
        spon_content: spon_content,
      }

      const res = await sponStatisticDB(sponlist, token);
      console.log(res.data);

      const datas = res.data;
      datas.forEach((item, index) => {
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
      setTotalItems(datas[0].total_count); // 검색된 후원 건수

      setListBody(list);  
    }

    payList();
  }, [currentPage, page_num])



  return (
    <>
    <MainHeader />
      <Adminbar />
      <div className="container" style={{position: "relative"}}>
        <div className="page-header">
          <h2 style={{margin: "30px, 0px"}}>후원내역</h2>
          <hr />
            {/* 검색 조건 */}
            <Form noValidate>
              <Row className="mb-3">
                {/* 회원 이름 */}
                <Col>
                  <Form.Group controlId="user_name">
                    <Form.Label>회원 이름</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="회원 이름"
                      onChange={(e) => setUserName(e.target.value)} 
                    />
                  </Form.Group>
                </Col>

                {/* 회원 ID */}
                <Col>
                  <Form.Group controlId="user_id">  
                    <Form.Label>회원 ID</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="회원 ID" 
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                {/* 결제방법 */}
                <Col>
                  <Form.Group controlId="spon_pay">
                    <Form.Label>결제방법</Form.Label>
                    <div style={{display: "flex"}}>
                      <Form.Check 
                        type="radio" 
                        name="payRadios" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                        id="payRadios1" 
                        label="홈페이지" 
                        value="홈페이지"
                        onChange={(e) => setSponPay(e.target.value)}
                        style={{marginRight: "10px"}} 
                      />
                      <Form.Check 
                        type="radio" 
                        name="payRadios"
                        id="payRadios2"
                        value="방문"
                        label="방문" 
                        onChange={(e) => setSponPay(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* 익명여부 */}
                <Col>
                <Form.Group controlId="spon_open">
                  <Form.Label>익명여부</Form.Label>
                    <div style={{display: "flex"}}>
                      <Form.Check 
                        type="radio" 
                        name="openRadios" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                        id="openRadios1" 
                        label="공개" 
                        value="공개"
                        onChange={(e) => setSponOpen(e.target.value)}
                        style={{marginRight: "10px"}} 
                      />
                      <Form.Check 
                        type="radio" 
                        name="openRadios"
                        id="openRadios2"
                        value="비공개"
                        label="비공개"
                        onChange={(e) => setSponOpen(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </Col>

                {/* 후원 종류 */}
                <Col>
                  <Form.Group controlId="spon_huwon">
                    <Form.Label>후원 종류</Form.Label>
                    <div style={{display: "flex"}}>
                      <Form.Check 
                        type="radio" 
                        name="huwonRadios" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                        id="huwonRadios1" 
                        label="일반" 
                        value="일반"
                        onChange={(e) => setSponHuwon(e.target.value)}
                        style={{marginRight: "10px"}} 
                      />
                      <Form.Check 
                        type="radio" 
                        name="huwonRadios"
                        id="huwonRadios2"
                        value="물품"
                        label="물품" 
                        onChange={(e) => setSponHuwon(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </Col>

                {/* 후원 날짜 */}
                <Col>
                  <Form.Label>후원 날짜</Form.Label>
                    <div style={{display: "flex",width: "200px", marginRight: "10px"}} >
                      <Form.Group controlId="start_date">
                          <Form.Control 
                            type="date" 
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                      </Form.Group>
                      <Form.Label style={{margin: "5px"}}>~</Form.Label>
                      <Form.Group controlId="end_date">
                          <Form.Control 
                            type="date" 
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                      </Form.Group>
                    </div>
                </Col>
              </Row>
              <hr />
              <Button 
                style={{backgroundColor: "#2C786C", borderColor: "white"}} 
                onClick={() => {
                  //navigate(setPath());
                }} 
              >검색</Button>
          </Form>
          <br />
          <br />



          {/* 통계 출력 */}
          <div className="row" style={{paddingBottom: "50px"}}>
            <Table bordered hover>
              {/* 컬럼명 */}
              <thead style={{backgroundColor: "#F5F5F5"}}>
                <tr style={{textAlign: "center"}}>
                  {
                    listHeaders.map((listHeader, index) => 
                      <th key={index} style={{width: HeaderWidth[index], textAlign: "center"}}>{listHeader}</th>
                    )
                  }     
                </tr>
              </thead>
              {/* DB반환값 출력 */}
              <tbody>
                {listItemsElements}         
              </tbody>
            </Table>
            <hr style={{marginTop: "30px"}} />
          </div>
        </div>

        {/* 페이징 처리 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: '50px' }}>
            <Pagination>
              <Pagination.First onClick={() => handlePageClick(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} />
              {
                groups.map((group, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Pagination.Ellipsis
                        disabled={currentPage < group[0]}
                        onClick={() => handlePageClick(group[0] - 1)}
                      />
                    )}
                    {group.map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageClick(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}
                    {index < groups.length - 1 && (
                      <Pagination.Ellipsis
                        disabled={currentPage >= group[group.length - 1]}
                        onClick={() => handlePageClick(group[group.length - 1] + 1)}
                      />
                    )}
                  </React.Fragment>
                ))
              }
            <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      </div>
      <Bottom />
    </>
  )
}

export default SponsorManagement
