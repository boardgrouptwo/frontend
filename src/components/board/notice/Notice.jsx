import React, { useCallback, useEffect, useState } from 'react'
import { Button, Pagination, Table } from 'react-bootstrap'
import Bottom from '../../include/Bottom'
import MainHeader from '../../include/MainHeader'
import NoticeRow from './NoticeRow'
import "../../css/notice.css"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Noticebar from './Noticebar'
import { noticeListDB, noticeSearchListDB } from '../../../service/NoticeDBLogic'
import { useSelector } from 'react-redux'

const Notice = () => {
  const navigate = useNavigate();

  const user = useSelector(state => state.user_type); 

  // 게시글 목록
  const [noticeList, setNoticeList] = useState([])

  // 페이징 처리(구현중....)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [perPage, setPerPage] = useState(10); // 페이지당 게시글 수
  const MAX_PAGE_ITEMS = 5; // 페이지네이션에서 최대로 보일 페이지 수
  const [total, setTotal] = useState(0); // 전체 게시글 수
  const totalPages = Math.ceil(total / perPage);

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
    navigate("/notice?page="+pageNumber)
  }


  // 검색어
  const [search, setSearch] = useState("")
  const handleSearch = useCallback((e) => {
    setSearch(e)
  },[])

  useEffect(() =>{    
    setPageNum({page: page_num})
    const newPageNum = {page: page_num}
    const boardList = async() => {
    const res = await noticeListDB(newPageNum)
    const list = []
    res.data.forEach((item) => {
      const obj = {
        notice_no: item.notice_no,
        notice_title: item.notice_title,
        notice_content: item.notice_content,
        notice_date: item.notice_date,
        notice_hit: item.notice_hit        
      }
      list.push(obj)
    })    
    setTotal(res.data[0].total_count)
    //setTotal(100)
    setNoticeList(list)   
  }
  boardList();
  
},[page_num,currentPage])

  //검색 로직
  const noticeSearch = () => {    
    if(search === "") {
      alert("검색어를 입력하세요")      
    } else {
      const sear = {
        search
      }
      const noticeSearchList = async() => {
        const res = await noticeSearchListDB(sear)
        const list = []
        res.data.forEach((item) => {
          const obj = {
            notice_no: item.notice_no,
            notice_title: item.notice_title,
            notice_content: item.notice_content,
            notice_date: item.notice_date,
            notice_hit: item.notice_hit
          }
          list.push(obj)
        })
        setNoticeList(list)         
      }
      console.log(noticeList)
      noticeSearchList()
    }


  }

  return (
    <>
      <MainHeader/>
      <Noticebar/>
      <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>     
        <h2 style={{marginTop: "30px"}}>공지사항</h2> 
        <div className="row">
          <div className="col-5" >
            <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                  aria-label="검색어를 입력하세요" aria-describedby="btn_search" onChange={(e)=>{handleSearch(e.target.value)}}/>
          </div>                    
          <div className="col-3">
            <Button style={{marginRight : "20px"}}variant='primary' id="btn_search" onClick={noticeSearch}>검색</Button>
            
            {
              (user==="ADMIN") ? (
                <Button variant="success" onClick={()=>{navigate(`/notice/write`)}}>
                  글쓰기              
                </Button> 
              ) : (<div></div>)              
            }

          </div>
        </div> 
        <div className='book-list' style={{paddingBottom: "50px"}}>
          <Table striped bordered hover >
            <thead>
              <tr style={{textAlign: "center"}}>
                <th style={{width: "100px"}}>NO</th>
                <th style={{width: "200px"}}>제목</th>
                <th style={{width: "200px"}}>등록일</th>
                <th style={{width: "100px"}}>조회수</th>
              </tr>
            </thead>
            <tbody >
            {noticeList.map((board,index) => (
              <NoticeRow key={index} board={board} pageNum={pageNum} />
            ))}
            </tbody>
          </Table> 
          <hr />    
          <div className='booklist-footer'>

          </div>
        </div>
      </div>

      {/* 페이징 처리 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: '50px' }}>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ flexShrink: 1 }}>     
        <Pagination>
          <Pagination.First onClick={() => handlePageClick(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} />
          {groups.map((group, index) => (
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
          ))}
          <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
        </div>
  <div style={{ flexGrow: 1 }}></div>
</div>
      <Bottom /> 
    </>
  )
}

export default Notice

