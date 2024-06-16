import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Authcontext } from '../context/Authcontext';

const NavBar = () => {
  const { user, logoutuser } = useContext(Authcontext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img 
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-3PCmvhXZmaGP4x5GiRt22i4Ufj87XcsCAFdvxbqew&s'} 
            alt='Logo' 
            style={{ height: '40px', width: '40px' }} // Set your desired height and width
          />
          Chat App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <span className='navbar-text mr-3'>
                  Signed in as {user?.name}
                </span>
                <Nav.Link onClick={logoutuser}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
                <Nav.Link as={Link} to="/Login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
