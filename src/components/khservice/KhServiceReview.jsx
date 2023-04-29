import React from 'react'
import MainHeader from '../include/MainHeader'
import KhSponorServicebar from './KhSponorServicebar'
import KhServiceCard from './KhServiceCard'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'

const KhServiceReview = () => {
    const navigate = useNavigate();

    
  // 검색어
  const [search, setSearch] = useState("")
  const handleSearch = useCallback((e) => {
    setSearch(e)
  },[])

      //검색 로직
  const noticeSearch = () => {    
/*     if(search === "") {
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
    } */
  }


  return (
    <>
      <MainHeader />
      <KhSponorServicebar />
      <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>     
        <h2 style={{marginTop: "30px"}}> 봉사활동 리뷰 게시판 </h2> 
        <div className="row">
          <div className="col-5" >
            <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                  aria-label="검색어를 입력하세요" aria-describedby="btn_search" onChange={(e)=>{handleSearch(e.target.value)}}/>
          </div>                    
          <div className="col-3">
            <Button style={{marginRight : "20px"}}variant='primary' id="btn_search" onClick={noticeSearch}>검색</Button>
            

                <Button variant="success" onClick={()=>{navigate(`/service/review/write`)}}>
                  글쓰기              
                </Button> 
     

          </div>
        </div> 
        <br />
        <KhServiceCard />

        </div>
    </>
  )
}

export default KhServiceReview
