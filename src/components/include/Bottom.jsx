import React from 'react'
import { Navbar } from 'react-bootstrap'

const Bottom = () => {
  return (
    <Navbar className="navbar navbar-expand-sm bg-light justify-content-center" bg="dark" 
      style={{ 
        width: "100%",
        height: "auto",
        color: 'white',
        position: "relative",        
        bottom: "0",
        marginTop: "auto"
        
      }}>
      KH요양원 &copy; 2023
    </Navbar>
  )
}

export default Bottom
