import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SponsorCard = ({board}) => {
    const cardImgStyle = {
        maxWidth: "100%",
        height: "auto"
    }

    return (
      <div className='container' style={{position: "relative" }}>
        <Row xs={1} md={3} className="g-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Col>
              <Card className='sponCard'>
                <Card.Img variant="top" src="\images\spon\first.png" style={cardImgStyle} />
                <Card.Body>
                  <Card.Title>{board.user_id}</Card.Title>
                  <Card.Text>
                    {board.spon_pay} 
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      );
    }

export default SponsorCard