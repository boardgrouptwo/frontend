import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Bottom from '../../include/Bottom'
import MainHeader from '../../include/MainHeader'
import NoticeRow from './NoticeRow'
import "../../css/notice.css"
import { Link } from 'react-router-dom'
import Noticebar from './Noticebar'
import { noticeListDB } from '../../../service/NoticeDBLogic'

const Notice = () => {

  const [noticeList, setNoticeList] = useState([])

  useEffect(() =>{
    const boardList = async() => {
    const res = await noticeListDB()
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
  boardList();
  
},[])

  const reactSearch = () => {
    console.log(noticeList)
  }

  return (
    <>
      <MainHeader/>
      <Noticebar/>
      <div className='container'>
        <div className="page-header">
        </div>     
        <h2 style={{marginTop: "30px"}}>공지사항</h2> 
        <div className="row">
          <div className="col-5" >
            <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                  aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
          </div>                    
          <div className="col-3">
            <Button variant='primary' id="btn_search" onClick={reactSearch}>검색</Button>
          </div>
        </div> 
        <div className='book-list'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>NO</th>
                <th>제목</th>
                <th>등록일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
            {noticeList.map((board,index) => (
              <NoticeRow key={index} board={board} />
            ))}
            </tbody>
          </Table> 
          <hr />    
          <div className='booklist-footer'>
            <Button variant="success">
              <Link to="/notice/write">
                글쓰기              
              </Link>
            </Button> 
          </div>
        </div>
      </div>

      <Bottom/> 
    </>
  )
}

export default Notice
