import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function NavbarPanel() {
  const {cart} = useSelector(state => state);
  return (
    <>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#" className='logo'>Sawan Shree</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
            <Nav.Link to="/" as={Link}>Product</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
               <Nav.Link to="/cart" as={Link}><i className="fa-solid fa-cart-shopping fa-lg" style={{color:'#74C0FC'}}></i> <span className='numberItem'>{cart.length}</span></Nav.Link>
            </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavbarPanel