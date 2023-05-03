import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Datetime from "react-datetime";
import ScheduleRow from "./ScheduleRow";
import { scheduleInsertDB, scheduleListDB, scheduleSearchListDB } from "../../service/ScheduleDBLogic";
import { useSelector } from "react-redux";
import Adminbar from "../admin/Adminbar";
import MainHeader from "../include/MainHeader";

const ScheduleList = () => {
  const admin=useSelector(state=>state.user_type)

//월간일정 관리자관리
const token = useSelector(state => state.token); 
const user = useSelector(state => state.user_type); 
const [cal_title,setCal_title]=useState("")
const [cal_content,setCal_content]=useState('')
const [cal_start,setCal_start]=useState(0)
const [cal_end,setCal_end]=useState(0)
  //오늘 이전 날짜 비활성화
  const yesterday = moment().subtract(1, "day");
  const valid = (current) => {
    return current.isAfter(yesterday);
  };

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); //모달창 닫기
  const handleShow = () => setShow(true); //모달창 열기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page_num = searchParams.get("page");

  //페이징 처리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [perPage, setPerPage] = useState(10); // 페이지당 게시글 수
  const MAX_PAGE_ITEMS = 5; // 페이지네이션에서 최대로 보일 페이지 수
  const [total, setTotal] = useState(0); // 전체 게시글 수
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const groupSize = Math.ceil(MAX_PAGE_ITEMS / 2);
  const groupIndex = Math.floor((currentPage - 1) / MAX_PAGE_ITEMS);
  const startPage = groupIndex * MAX_PAGE_ITEMS + 1;
  const endPage = startPage + MAX_PAGE_ITEMS - 1;
  const groups = Array.from(
    { length: Math.ceil(totalPages / MAX_PAGE_ITEMS) },
    (_, index) => {
      const start = index * MAX_PAGE_ITEMS;
      return pageNumbers.slice(start, start + MAX_PAGE_ITEMS);
    }
  ).filter(
    (group) =>
      group.includes(startPage) ||
      group.includes(endPage) ||
      (group[0] <= startPage && group[group.length - 1] >= endPage)
  );
  const [pageNum, setPageNum] = useState({
    page: page_num,
  });
  //페이지이동
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate("/calendar?page=" + pageNumber);
  };
  // 검색어
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((e) => {
    setSearch(e);
  }, []);
  useEffect(() => {
    if (page_num !== null) {
      setCurrentPage(parseInt(page_num));
    }
    setPageNum({ page: page_num });
    const newPageNum = { page: page_num };
    const boardList = async () => {
      const res = await scheduleListDB();
      const list = [];
      res.data.forEach((item) => {
        const obj = {
          cal_no: item.cal_no,
          cal_title: item.cal_title,
          cal_content: item.cal_content,
          cal_start: item.cal_start,
          cal_end: item.cal_end,
        };
        list.push(obj);
      });
      setTotal(res.data[0].total_count);
      //setTotal(100)
      setScheduleList(list);
    };
    boardList();
  }, [page_num, currentPage]);

  //검색 로직
  const noticeSearch = () => {
    if (search === "") {
      alert("검색어를 입력하세요");
    } else {
      const sear = {
        search,
      };
      const scheduleSearchList = async () => {
        const res = await scheduleSearchListDB(sear);
        const list = [];
        res.data.forEach((item) => {
          const obj = {
            cal_no: item.cal_no,
            cal_title: item.cal_title,
            cal_content: item.cal_content,
            cal_start: item.cal_start,
            cal_end: item.cal_end,
          };
          list.push(obj);
        });
        setScheduleList(list);
      };
      console.log(scheduleList);
      scheduleSearchList();
    }
  };
  //화면에 입력받은 정보 담기
  const [formState, setFormState] = useState({
    cal_content: '',
  });

  // textarea을 cal_content에 추가하기
  const handleChangeForm = (event) => {
    const { name, value } = event.target;
  setFormState((prev) => ({ ...prev, [name]: value }));
  
  if (name === "cal_title") {
    setCal_title(value);
  } else if (name === "cal_content") {
    setCal_content(value);
  }
  };
  //바뀐정보 실제로 추가되는 부분
  
  //메모정보 가져오기
  const [schedules, setSchedules] = useState({});
  const [scheduleList, setScheduleList] =  useState([])

  const handleFetchScheduleList = async () => {
    // FormData.js:88 Uncaught (in promise) TypeError: target must be an objectat toFormData (toFormData.js:88:1)에러 잡기
    
    try {
      const res = await scheduleListDB({ user }, token);
      console.log(res.data);
      const list = [];
      res.data.forEach((item) => {
        const obj = {
          cal_no: item.product_no,
          cal_title: item.product_title,
          cal_content:item.product_content,
          cal_start: item.cal_start,
          cal_end: item.cal_end,
        };
        list.push(obj);
      });
      console.log(cal_title);
      console.log(cal_content)
      console.log(scheduleList)
      setScheduleList(list);
    } catch (error) {
      console.log(error);
    }
  };
   
//날짜 이벤트
    const handleStart = (date) => {
      const cal_start = moment(date).format("YYYY-MM-DD");
      console.log(cal_start);
      setCal_start(cal_start);
    };
  const handleEnd = (date) => {
    const cal_end = moment(date).format("YYYY-MM-DD");
    console.log(cal_end);
    setCal_end(cal_end);
  };
  
  const scheduleInsert=async(event)=>{
   //event.preventDefault();
    const schedule={
      cal_title:cal_title,
      cal_content:cal_content,
      cal_start:cal_start,
      cal_end:cal_end
    }
    console.log(token);
    console.log(cal_start)
    console.log(cal_end)
    console.log(cal_content)
    console.log(cal_title)
    const res = await scheduleInsertDB(schedule,token);
    console.log(res)
    handleClose(false);
    if (res.status === 200) {
      alert('신청이 완료되었습니다.');
    }
  }
  
  return (
    <>
    <MainHeader/>
    <Adminbar/>
    
      <div className="container">
        <div className="page-header">
          <h2>
            <small>일정목록</small>
          </h2>
          <hr />
        </div>

        <div className="row">
          <div className="col-3">
            <select id="gubun" className="form-select" aria-label="분류선택">
              <option defaultValue>분류선택</option>
              <option value="cal_title">일정명</option>
              <option value="cal_content">내용</option>
            </select>
          </div>
          <div className="col-6">
            <input
              type="text"
              id="keyword"
              className="form-control"
              placeholder="검색어를 입력하세요"
              aria-label="검색어를 입력하세요"
              aria-describedby="btn_search"
            />
          </div>
          <div className="col-3">
            <Button variant="danger" id="btn_search" onClick={(e)=>{handleSearch(e.target.value)}}>
              검색
            </Button>
          </div>
        </div>

        <div className="book-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>일정명</th>
                <th>일정내용</th>
                <th>일정날짜</th>
              </tr>
            </thead>
            <tbody>
              {scheduleList && //데이터가 한건도 없는 경우를 고려
                scheduleList.map((schedules)=> (
                  <ScheduleRow key={schedules.cal_no} schedule={schedules} />
                ))}
                
            </tbody>
          </Table>
          <hr />
          <div className="booklist-footer">
            <Button variant="warning" onClick={() => handleFetchScheduleList()}>
              전체조회
            </Button>
            &nbsp;
            <Button variant="success" onClick={handleShow}>
              글쓰기
            </Button>
          </div>
        </div>
      </div>
      {/* ========================== [[  일정등록 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>새로운 일정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_memo">
            <Form.Group className="mb-3 row" controlId="mTitle">
              <Form.Label className="col-sm-2 col-form-label">
                일정명
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  className="form-control form-control-sm"
                  type="text"
                  name="cal_title"
                  onChange={handleChangeForm}
                  placeholder="Enter 일정명"
                />
              </div>
            </Form.Group>
           
            <Form.Group className="mb-3 row" controlId="edit-start">
              <Form.Label className="col-sm-2 col-form-label">시작</Form.Label>
              <div className="col-sm-10">
                <Datetime
                 input={false}
                 timeFormat=""
                  dateFormat="YYYY-MM-DD"
                  isValidDate={valid}
                  name="cal_start"
                  onChange={handleStart}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="edit-end">
              <Form.Label className="col-sm-2 col-form-label">끝</Form.Label>
              <div className="col-sm-10">
                <Datetime
                 input={false}
                 timeFormat=""
                  dateFormat="YYYY-MM-DD"
                  isValidDate={valid}
                  name="cal_end"
                  onChange={handleEnd}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="boardContent">
              <Form.Label className="col-sm-2 col-form-label">내용</Form.Label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  name="cal_content"
                  onChange={handleChangeForm}
                  rows="3"
                ></textarea>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={scheduleInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ========================== [[ 글등록 Modal ]] ========================== */}
    </>
  );
};

export default ScheduleList;
