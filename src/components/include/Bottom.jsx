import React from 'react'
import { Navbar } from 'react-bootstrap'

const Bottom = () => {
  return (
    <Navbar className="navbar navbar-expand-sm bg-light justify-content-center" bg="dark" 
      style={{ 
        width: "100%",
        color: 'white',
        position: "absolute",
        bottom: "0" 
      }}>
      KH요양원 &copy; 2023
    </Navbar>
  )
}

export default Bottom
