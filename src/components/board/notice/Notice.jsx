import React, { useCallback, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Bottom from '../../include/Bottom'
import MainHeader from '../../include/MainHeader'
import NoticeRow from './NoticeRow'
import "../../css/notice.css"
import { Link, useNavigate } from 'react-router-dom'
import Noticebar from './Noticebar'
import { noticeListDB, noticeSearchListDB } from '../../../service/NoticeDBLogic'

const Notice = () => {

/* 

수정 테스트수정ㅗㅍ려ㅐㅅ화ㅗㅠㅓㅏㅣ

ㅓㅏㅣㅘㅣㅗㅕㅐ혀ㅑ호ㅓㅏ
ㅏㅓㅔ;ㅓㅔㅓㅏㅣ;ㅓㅏ
1*/









  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([])
  const [search, setSearch] = useState("")

  const handleSearch = useCallback((e) => {
    setSearch(e)
  },[])

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
      <div className='container'>
        <div className="page-header">
        </div>     
        <h2 style={{marginTop: "30px"}}>공지사항</h2> 
        <div className="row">
          <div className="col-5" >
            <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                  aria-label="검색어를 입력하세요" aria-describedby="btn_search" onChange={(e)=>{handleSearch(e.target.value)}}/>
          </div>                    
          <div className="col-3">
            <Button variant='primary' id="btn_search" onClick={noticeSearch}>검색</Button>
          </div>
        </div> 
        <div className='book-list'>
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
              <NoticeRow key={index} board={board} />
            ))}
            </tbody>
          </Table> 
          <hr />    
          <div className='booklist-footer'>
            <Button variant="success" onClick={()=>{navigate(`/notice/write`)}}>
                글쓰기              
            </Button> 
          </div>
        </div>
      </div>

      <Bottom/> 
    </>
  )
}

export default Notice
