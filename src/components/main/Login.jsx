import React from 'react'
import {Col, Input, Row, Button} from "antd"

const Login = () => {
  return (
    <div>
      <Row align="middle">
        <Col spen={24}>
          <Row>
            <Col spen={12}></Col>
            <Col spen={12}>
              <div>My Books</div>
              <div>Please Note Your Opinion</div>
              <div/>
              <div>
                Email
                  <span> *</span>
              </div>
              <div>
                <Input placeholder="Email" autoComplete="email" name="email" />
              </div>
              <div>
                Password
                  <span> *</span>
              </div>
              <div>
                <Input type="password" autoComplete="current-password" name="email" />
              </div>
              <div>
                <Button size="large">Sign In</Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Login
