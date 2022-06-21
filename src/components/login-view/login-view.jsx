import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Card, Container, Col, Row, Form } from "react-bootstrap";
import propTypes from "prop-types";
import axios from "axios";

import './login-view.scss'
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <Container className='body'>
      <Row className='justify-content-md-center'>
        <Col md={8} className=''>
          <Card style={{ marginTop: 100, marginBottom: 50, width: '30' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '2r' }}>Please Login</Card.Title>
              <Form className='login-border'>
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
              </Form><br></br>
              <Row className='btns'>
                <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
                <Button variant='outline-primary' type='submit' onClick={handleSubmit}>Sign up!</Button>
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