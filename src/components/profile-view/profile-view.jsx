import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Col, Container, Row, Button, CardGroup, Card, Form } from 'react-bootstrap';

import { FavoriteBooksView } from './favorite-books-view';
import { UpdateUserView } from './update-user-view';
/* import { UserInfoView } from './update-user-view'; */
import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [books, setBooks] = useState(props.books);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteBooks(response.data.favoriteBooks)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleDelete = () => {
    axios.delete(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`)
        localStorage.clear();
        window.open('/register', '_self');
      }).
      catch(error => console.error(error))
  }

  return (
    <Container id="profile-form">
      <Row className='mt-5'>
        <Col /* sm="10" md="8" lg="6" */>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>MY PROFILE</Card.Title>
                <Form>
                  <Form.Group controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={user.Username} />
                  </Form.Group>

                  <Form.Group className='mt-3' controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={'******'} />
                  </Form.Group>

                  <Form.Group className='mt-3' controlId='formEmail'>
                    <Form.Label>E-mail address:</Form.Label>
                    <Form.Control
                      type='email'
                      value={user.Email} />
                  </Form.Group>

                  <Form.Group className='mt-3' controlId='formBirthday' >
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='text'
                      value={user.Birthday}
                      placeholder='YYY-MM-DD' />
                  </Form.Group>
                  <Row className='mt-5'><h4>My Favorite Books</h4></Row>
                  <Form.Group className='mt-3'>
                    <FavoriteBooksView
                      books={books}
                      favoriteBooks={favoriteBooks}
                      currentUser={currentUser}
                      token={token} />
                  </Form.Group>

                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>

        <Col>
          <UpdateUserView user={user} />
        </Col>
        {/*    <Col>
          <UserInfoView user={user} />
        </Col> */}
      </Row>

      <Button
        style={{ marginTop: 100, marginBottom: 50, }}
        className='mt-5'
        variant="warning"
        onClick={handleDelete}>
        Delete Profile
      </Button>

    </Container>
  )
}