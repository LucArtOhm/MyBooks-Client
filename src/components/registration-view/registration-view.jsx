import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Row, Col, Container, Card, CardGroup } from 'react-bootstrap';
/* import { Link } from "react-router-dom"; */

import './registration-view.scss';
import axios from 'axios';

//user registration form taking necessary user details
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // Validate user inputs
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
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email address');
      isReq = false;
    }
    return isReq;
  }

  const handleRegistration = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://your-favorite-books.herokuapp.com/users',
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Your registration has been successfully processed. You can now proceed to login.");
          window.open("/", "_self"); // The '_self' allows the next page to open in the same window
        })
        .catch(e => {
          console.log('No such user');
          alert("Your registration has NOT been successfully processed. Please try again.");
          window.open("/register", "_self");
        });
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <CardGroup>
            <Card style={{ marginTop: 100, marginBottom: 50, width: '30' }}>
              <Card.Body>
                <Card.Title>Please Register!</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      style={{ fontSize: '16px' }}
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder='Enter a Username'
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group className='mt-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      style={{ fontSize: '16px' }}
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={5}
                      placeholder='Password must be 5 or more characters'
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Form.Group className='mt-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      style={{ fontSize: '16px' }}
                      type='text'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email address'
                    />
                    {emailErr && <p>{emailErr}</p>}
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className='mt-3'>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      style={{ fontSize: '16px' }}
                      type='text'
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      placeholder='YYYY-MM-DD'
                    />
                  </Form.Group>
                </Form><br></br>
                <Button variant='secondary' type="submit" onClick={handleRegistration}>Submit</Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.propTypes = {
  registered: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired
  }),
  /* onRegistration: propTypes.func.isRequired, */
};