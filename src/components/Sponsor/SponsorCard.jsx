import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SponsorCard = () => {
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
                  <Card.Title>김후원</Card.Title>
                  <Card.Text>
                    후원금액 
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