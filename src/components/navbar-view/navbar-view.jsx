import React from "react";
import './navbar-view.scss';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

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
        <Navbar.Brand className='navbar-logo' href='/'>MyQueerLibrary</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant='link' onClick={() => { this.onLoggedOut() }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href='/login'>Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href='/register'>Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}