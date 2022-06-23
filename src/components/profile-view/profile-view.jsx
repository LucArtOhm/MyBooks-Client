import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Button, Col, Container, Row, Card } from 'react-bootstrap';

import FavoriteBooksView from './favorite-books-view';
import UserInfoView from './user-info-view';
import UpdateUserView from './update-user-view';

import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState(props.User);
  const [books, setBooks] = useState(props.Books);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const favoriteBooksList = books.filter((books) => {
    axios.get(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteBooksList(response.data.FavoriteBooksList)
      })
      .catch(error => console.error(error))
  })

  const getUser = () => {
    axios.get(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteBooks(response.data.FavoriteBooks)
      })
      .catch(error => console.error(error))
  }

  const handleSubmit = (e) => {
    axios.post(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteBooks(response.data.FavoriteBooks)
      })
      .catch(error => console.error(error))
  }

  const removeFav = (id) => {
    axios.delete(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setRemoveFav(response.data.removeFav)
      })
      .catch(error => console.error(error))
  }

  const handleUpdate = (e) => {
    axios.put(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setUpdateUser(response.data.UpdateUser)
      })
      .catch(error => console.error(error))
  }

  const handleDelete = () => {
    axios.delete(`https://your-favorite-books.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert('Your account was successfully deleted. Thank you for using our services!')
        localStorage.clear();
        window.open('/register', '_self');
      }).
      catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfoView name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>

        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUserView user={user} setUser={setUser} />
              {/* <UpdateUserView handleSubmit={handleSubmit} handleUpdate={handleUpdate} /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteBooks favoriteBooksList={favoriteBooksList} />

      {/* <Button className="d-block mt-5" variant="warning" onClick={handleDelete}>Delete profile</Button> */}
    </Container>
  )
}