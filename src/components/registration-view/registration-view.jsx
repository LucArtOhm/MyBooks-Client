import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Row, Col, Container, Card, CardGroup } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

//user registration form taking necessary user details
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://your-favorite-books.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email
    })
      .then(response => {
        const data = reponse.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('Error registering the user');
        alert("Something wasn/'t entered right");
      });
  }; */

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register!</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder='Enter a Username'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='text'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      placeholder='Your password must be 8 or more characters'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='text'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email address'
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='text'
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      placeholder='Enter a Birthday'
                    />
                  </Form.Group>
                </Form><br></br>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
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
    Email: propTypes.string.isRequired,
    Birthday: propTypes.number.isRequired,
  }),
  onRegistration: propTypes.func.isRequired,
};