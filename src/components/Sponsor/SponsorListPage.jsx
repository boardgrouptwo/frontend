import React, { useEffect, useState } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainHeader from '../include/MainHeader'
import KhSponorServicebar from '../khservice/KhSponorServicebar';
import Bottom from '../include/Bottom';
import { sponsorListDB } from '../../service/SponsorDBLogic';
import { Table } from 'react-bootstrap';
import SponsorRow from './SponsorRow';
import SponsorTotal from './SponsorTotal';



/* use effect 로 값을 담아와서 card와 list에 넘겨주기 */
const SponsorListPage = () => {

  const cardImgStyle = {
    maxWidth: "100%",
    height: "auto"
}

    // 게시글 목록
    const [cardList, setCardList] = useState([])
    const [sponList, setSponList] = useState([])
    const [totalList, setTotalList] = useState([])


    

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
        setTotalList(list)
      if(list.length > 3) {   
        setCardList(list.slice(0, 3))  /* 3개만 card */
        setSponList(list.slice(3))   /* 네 번째 요소부터 마지막 요소까지 list */
      } else {
        setCardList(list)
      }
    }
    boardList();
  },[])

  /* 카드 뒤집기 효과 */
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <MainHeader />
      <KhSponorServicebar />
      <div className='container' style={{position: "relative" }}>
        <SponsorTotal totalList={totalList}/>
        <img src='/images/line1.png' style={{width:"60%", marginLeft:"20%"}}/>
        <h2 style={{marginTop: "30px", textAlign: "center"}}> 명예의 전당</h2>
                {/* ========================== sponsorCard ========================== */}     
            <div className='sponcontainer' style={{position: "relative" }}>
              <Row xs={1} md={3} className="g-4">
                {cardList.map((item, idx) => (
              <Col>
              {/* ==============클릭시 카드 뒤집기 효과 =================*/}
                <Flippy
                flipOnHover={false}
                flipOnClick={true}
                flipDirection="horizontal"
                isFlipped={item.isFlipped}
                onClick={() => handleClick(idx)}
                
                >
                <FrontSide className="sponCard">

                      <Card.Img variant="top" src={`\\images\\spon\\spon${idx}.png`} style={cardImgStyle} />
                      <Card.Body style={{textAlign: "center"}}>
                        <br />
                        <Card.Title>{item.spon_open==='공개' ? item.user_id : '익명의' } 후원자님</Card.Title>
                        <Card.Text>
                          {item.spon_money.toLocaleString()}원
                        </Card.Text>
                      </Card.Body>

                  </FrontSide >
                  <BackSide  className="sponBackCard" style={{backgroundColor: "#4a9e5c"}}>
                    {/* 카드 뒷면 */}
                    <Card  className="sponCardBack">
                      <Card.Body 
                        style={{padding:"10%"}} 
                      >
                      <Card.Title>후원자의 한마디</Card.Title>
                      <br />
                        <Card.Text style={{height: "100%", padding: "0px"}}>
                          <h4>{item.spon_content}</h4>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </BackSide>
                </Flippy>
              </Col>
            ))}
          </Row>
        </div>

        {/* ========================== sponsorCard ========================== */}
        
<br />
<hr />
{/* ========================== sponsorList ========================== */}
    <div className='container' style={{position: "relative" }}>
        <div className="page-header" >
        </div>

        <h2 style={{marginTop: "30px", textAlign: "center"}}> 올해의 후원인</h2> 
        <br />
        <div className='book-list' style={{paddingBottom: "50px"}}>
          <Table bordered hover >
            <thead style={{backgroundColor:"#F5F5F5"}}>
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
