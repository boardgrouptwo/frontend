import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Datetime from "react-datetime";
import ScheduleRow from "./ScheduleRow";
import { scheduleListDB, scheduleSearchListDB } from "../../service/ScheduleDBLogic";

const ScheduleList = () => {

  //오늘 이전 날짜 비활성화
  const yesterday = moment().subtract(1, "day");
  const valid = (current) => {
    return current.isAfter(yesterday);
  };

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); //모달창 닫기
  const handleShow = () => setShow(true); //모달창 열기

  const [m_start, setM_start] = useState(0);
  const [m_end, setM_end] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page_num = searchParams.get("page");

  //게시글 목록
  const [scheduleList, setScheduleList] = useState([]);

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
          cal_title: item.notice_title,
          cal_content: item.notice_content,
          cal_date: item.notice_date,
        };
        list.push(obj);
      });
      setTotal(res.data[0].total_count);
      //setTotal(100)
      setScheduleList(list);
    };
    boardList();
  }, [page_num, currentPage]);
  const [schedule, setSchedule] = useState({});
  const handleStart = (date) => {
    console.log(date);
    const cal_start = moment(date._d).format("YYYY-MM-DD, a h:mm");
    console.log(m_start);
    setM_start(m_start);
  };

  const getScheduleList = () => {};
  const handleEnd = (date) => {
    console.log(date);
    const cal_start = moment(date._d).format("YYYY-MM-DD, a h:mm");
    console.log(m_end);
    setM_end(m_end);
  };

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
  const handleChangeForm = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    //console.log("폼내용 변경 발생 name:",event.target.name)
    //console.log("폼내용 변경 발생 name:",event.target.value)
    console.log(schedule);
    setSchedule({
      ...schedule,
      cal_no: Date.now(), // 십진수로 가져간다
      [event.target.name]: event.target.value,
    });
    console.log(schedule);
  };
  //바뀐정보 실제로 추가되는 부분
  const scheduleAdd = (event) => {
    //버블링막자
    event.preventDefault();
    console.log(schedule);
    const pmemo = {
      cal_no: schedule.cal_no,
      cal_title: schedule.cal_title,
      cal_writer: schedule.cal_writer,
      cal_content: schedule.cal_content,
      cal_start: schedule.cal_start, //빈문자열이나 null값이 들어가지 않도록 조심
      cal_end: schedule.cal_end,
    };
    console.log(pmemo);
    /*   set(ref(database,'memo/'+memo.m_no),pmemo); */
    handleClose();
  };
  //메모정보 가져오기
  const [schedules, setSchedules] = useState({});
  /* useEffect(()=>{
    const startCountRef=ref(database,'memo')
    onValue(startCountRef,(snapshot)=>{
      const data = snapshot.val()
      setMemos(data)
      return ()=>off(startCountRef)
    })
  },[]) */

  return (
    <>
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
              <option value="m_title">일정명</option>
              <option value="m_writer">작성자</option>
              <option value="m_content">내용</option>
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
                <th>작성자</th>
                <th>일정시간</th>
              </tr>
            </thead>
            <tbody>
              {schedules && //데이터가 한건도 없는 경우를 고려
                Object.keys(schedules).map((key) => (
                  <ScheduleRow key={key} schedule={schedules[key]} />
                ))}
            </tbody>
          </Table>
          <hr />
          <div className="booklist-footer">
            <Button variant="warning" onClick={getScheduleList}>
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
                  name="m_title"
                  onChange={handleChangeForm}
                  placeholder="Enter 일정명"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="boardWriter">
              <Form.Label className="col-sm-2 col-form-label">
                등록자
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="m_writer"
                  onChange={handleChangeForm}
                  className="form-control form-control-sm"
                  placeholder="Enter 작성자"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="edit-start">
              <Form.Label className="col-sm-2 col-form-label">시작</Form.Label>
              <div className="col-sm-10">
                <Datetime
                  dateFormat="YYYY-MM-DD"
                  isValidDate={valid}
                  name="m_start"
                  onChange={handleStart}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="edit-end">
              <Form.Label className="col-sm-2 col-form-label">끝</Form.Label>
              <div className="col-sm-10">
                <Datetime
                  dateFormat="YYYY-MM-DD"
                  isValidDate={valid}
                  name="m_end"
                  onChange={handleEnd}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="boardContent">
              <Form.Label className="col-sm-2 col-form-label">내용</Form.Label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  name="m_content"
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
          <Button variant="primary" onClick={scheduleAdd}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ========================== [[ 글등록 Modal ]] ========================== */}
    </>
  );
};

export default ScheduleList;
