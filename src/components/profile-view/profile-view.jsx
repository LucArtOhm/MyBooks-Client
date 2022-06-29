import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Col, Container, Row, Button, CardGroup, Card, Form } from 'react-bootstrap';

import { FavoriteBooksView } from './favorite-books-view';
import { UpdateUserView } from './update-user-view';
import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [books, setBooks] = useState(props.books);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  console.log(books)

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    axios.get(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setUser(response.data);
        setFavoriteBooks(response.data.favoriteBooks)
        setBooks(response.data.books)
        console.log(response.data)
      })
      .catch(error => console.error(error))
  }

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
        <Col sm="10" md="8" lg="6">
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>MY INFO: </Card.Title>
                <p className='mt-4'>Name: {user.Username}</p>
                <p>E-mail: {user.Email}</p>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col>
          <UpdateUserView user={user} />
        </Col>
      </Row>
      <Row className='mt-5'><h4>My Favorite Books</h4></Row>
      <Form.Group className='mt-3'>
        {
          books && favoriteBooks && (
            <FavoriteBooksView
              books={books}
              favoriteBooks={favoriteBooks}
              currentUser={currentUser}
              token={token} />
          )}
      </Form.Group>
      <Button
        style={{ marginTop: 100, marginBottom: 50, marginRight: 30 }}
        className='mt-5'
        variant="warning"
        size='sm'
        onClick={handleDelete}>
        Delete Profile
      </Button>

    </Container>
  )
}