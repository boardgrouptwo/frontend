import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import MainHeader from '../../include/MainHeader'

const ShopAdd = () => {

  const handleSubmit = () => {

  }

  return (
    <>
      <MainHeader/>
      <div className='sponContainer' style={{ }}>
      <Form className='sponsor-form' onSubmit={handleSubmit}>
          <h3 className='sponsor-form-text'>상품등록</h3>
        <Form.Group as={Row} className="mb-3" controlId="sponsor_number">
          <Form.Label column sm={2}>
            상품명
          </Form.Label>
          <Col sm={8}>
          <Form.Control type="tel" placeholder="상품명을 작성해주세요" />
          </Col>
        </Form.Group>
      </Form>

      </div>
    </>
  )
}

export default ShopAdd
