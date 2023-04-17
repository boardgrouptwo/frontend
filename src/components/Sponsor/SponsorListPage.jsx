import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainHeader from '../include/MainHeader'
import SponsorListbar from './SponsorListbar';
import SponsorCard from './SponsorCard';
import SponsorList from './SponsorList';
import Bottom from '../include/Bottom';
import { sponsorListDB } from '../../service/SponsorDBLogic';
import NoticeRow from '../board/notice/NoticeRow'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import SponsorRow from './SponsorRow';


/* use effect 로 값을 담아와서 card와 list에 넘겨주기 */
const SponsorListPage = () => {

  const cardImgStyle = {
    maxWidth: "100%",
    height: "auto"
}

    // 게시글 목록
    const [cardList, setCardList] = useState([])
    const [sponList, setSponList] = useState([])


    useEffect(() =>{    /* 값을 가져오는 역할 */
      const boardList = async() => {
      const res = await sponsorListDB()
      const list = []
      res.data.forEach((item) => {
        const obj = {
          user_id: item.user_id,
          spon_money: item.spon_money,
          spon_content: item.spon_content,
          spon_open: item.spon_open    
        }
        list.push(obj)
        console.log(list)
      })
      if(list.length > 3) {   
        setCardList(list.slice(0, 3))  /* 3개만 card */
        setSponList(list.slice(3))   /* 네 번째 요소부터 마지막 요소까지 list */
      } else {
        setCardList(list)
      }
    }
    boardList();
  },[])

  return (
    <>
      <MainHeader />
      <SponsorListbar/>
      <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>     
        <h2 style={{marginTop: "30px", textAlign: "center"}}>🌠이번달 베스트 후원인🌠</h2>

 {/* ========================== sponsorCard ========================== */}     
        <div className='container' style={{position: "relative" }}>
        <Row xs={1} md={3} className="g-4">
        {cardList.map((item, idx) => (
            <Col>
              <Card className='sponCard'>
              <Card.Img variant="top" src={`\\images\\spon\\spon${idx}.png`} style={cardImgStyle} />

              <Card.Body style={{textAlign: "center"}}>
                  <Card.Title>{item.user_id} 후원자님</Card.Title>
                  <Card.Text>
                  {item.spon_money}\
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
{/* ========================== sponsorCard ========================== */}

{/* ========================== sponsorList ========================== */}
    <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>     
        <h2 style={{marginTop: "30px", textAlign: "center"}}>🌞 명예의 전당 🌞</h2> 

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
            {sponList.map((board,index) => (
              <SponsorRow key={index} board={board} index={index}/>
            ))}
            </tbody>
          </Table> 
          <hr />    
          <div className='booklist-footer'>

          </div>
        </div>
      </div>
{/* ========================== sponsorList ========================== */}
      </div>
      <br />
      <br />
      <Bottom /> 
    </>
  )
}

export default SponsorListPage
