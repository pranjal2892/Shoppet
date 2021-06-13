import React from 'react'
import {Navbar, Nav,Form, FormControl, Button} from 'react-bootstrap';
import image from '../../public/logo.png';


export class Headers extends React.Component{
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={image}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
      </Navbar>
      </div>
    )
  }
}