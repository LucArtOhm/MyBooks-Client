import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Card, Container, Col, Row, Form } from "react-bootstrap";
import propTypes from "prop-types";
import axios from "axios";

import './login-view.scss'


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr('Username must be at least 3 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr('Password must be at least 5 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://your-favorite-books.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('No such user')
        });
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <Card style={{ marginTop: 100, marginBottom: 50, width: '30' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '' }}>Please Login</Card.Title>
              <Form className='login-border'>
                <Form.Group className='mt-4' controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control style={{ fontSize: '16px' }} type='text' placeholder='Enter Username' value={username} onChange={e => setUsername(e.target.value)} />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className='mt-3' controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control style={{ fontSize: '16px' }} type='password' placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
              </Form><br></br>
              <Row className='btns mt-2'>
                <Button variant='secondary' type='submit' onClick={handleSubmit}>Submit</Button>

              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row >
    </Container >
  );
}

LoginView.propTypes = {
  login: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired
  }),
  onLoggedIn: propTypes.func
};