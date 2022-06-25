import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './profile-view.scss';

export function UpdateUserView(props) {
  const { user } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be at least 3 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Enter a valid e-mail address' });
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const token = localStorage.getItem('token');
      axios.put(`https://your-favorite-books.herokuapp.com/users${user.Username}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          console.log(response.data);
          alert('Profile was successfully updated.');
          window.open('/users/:username', '_self');
        })
        .catch(error => {
          console.error(error);
          alert('Unable to update profile.');
        });
    }
  };


  return (
    <Container id="update-form">
      <Row>
        <Col /* sm="10" md="8" lg="6" */>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Edit Profile</Card.Title>
                <Form>
                  <Form.Group controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder='Enter a username' />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group className='mt-3' controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength='8'
                      placeholder='Password must be 6 or more characters' />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group className='mt-3' controlId='formEmail'>
                    <Form.Label>E-mail address:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email address' />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group className='mt-3' controlId='formBirthday' >
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='text'
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      required
                      placeholder='YYYY-MM-DD' />
                    {values.birthdayErr && <p>{values.birthdayErr}</p>}
                  </Form.Group>

                  <Button
                    className='mt-4'
                    variant='secondary'
                    type='submit'
                    onClick={handleSubmit}>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>

        </Col>
      </Row>
    </Container>
  )
}