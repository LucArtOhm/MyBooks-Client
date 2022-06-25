import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './navbar-view.scss';

export function NavbarView({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className='main-nav' sticky='top' bg='dark' expand='lg' variant='dark'>
      <Container className='navbar-container'>
        <Navbar.Brand as={Link} to={'/'}>MY QUEER LIBRARY</Navbar.Brand>
        {/*  <Navbar.Brand className='navbar-logo' href='/'>MY QUEER LIBRARY</Navbar.Brand> */}
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {isAuth() && (
              <Nav.Link as={Link} to={`/`}>Books</Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/`}>Login</Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/register`}>Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}