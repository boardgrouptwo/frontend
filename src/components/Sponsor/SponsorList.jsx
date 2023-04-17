/* import React, { useCallback, useEffect, useState } from 'react'
import { Button, Pagination, Table } from 'react-bootstrap'

import NoticeRow from '../board/notice/NoticeRow'

import "../css/notice.css"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { noticeSearchListDB, sponsorListDB } from '../../service/SponsorDBLogic'

const SponsorList = () => {
  const navigate = useNavigate();

  const user = useSelector(state => state.user_type); 
  const token = useSelector(state => state.token); 


  return (
    <>
      <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>     
        <h2 style={{marginTop: "30px", textAlign: "center"}}>🌞 이번달 후원인 🌞</h2> 

        <div className='book-list' style={{paddingBottom: "50px"}}>
          <Table striped bordered hover >
            <thead>
              <tr style={{textAlign: "center"}}>
                <th style={{width: "50px"}}>순위</th>
                <th style={{width: "150px"}}>후원자명</th>
                <th style={{width: "100px"}}>후원금액</th>
                <th style={{width: "300px"}}>전하고 싶은 말</th>
              </tr>
            </thead>
            <tbody >
            {sponsorList.map((board,index) => (
              <NoticeRow key={index} board={board}/>
            ))}
            </tbody>
          </Table> 
          <hr />    
          <div className='booklist-footer'>

          </div>
        </div>
      </div>

    </>
  )
}

export default SponsorList

 */