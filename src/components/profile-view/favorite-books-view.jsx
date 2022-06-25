import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteBooksView(props) {
  const { books, favoriteBooks, currentUser, token } = props;

  const favoriteBooksId = favoriteBooks.map(m => m._id)

  const favoriteBooksList = books.filter(m => {
    return favoriteBooksId.includes(m._id)
  })

  const handleBookDelete = (bookId) => {
    axios.delete(`https://your-favorite-books.herokuapp.com/users/${currentUser}/books/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The book was successfully deleted.`)
        window.open('/users/:username', '_self');
      }).
      catch(error => console.error(error))
  }

  return (
    <Fragment>
      {favoriteBooksList.length === 0 ? (
        <p>You have no favorite books yet.</p>
      ) : (
        favoriteBooksList.map((book) => {
          return (
            <Col xs={10} sm={8} md={6} lg={4} >
              <Card id="book-card">
                <Link to={`/books/${book._id}`}>
                  <Card.Img variant="top" src={book.CoverURL} />
                </Link>
                <Card.Body>
                  <Card.Title>{book.Title}</Card.Title>
                  <Card.Text>{book.Description}</Card.Text>
                  <Link to={`/books/${book._id}`}>
                    <Button className="button" variant="outline-primary" size="sm">Open</Button>
                  </Link>
                  <Button
                    className="button ml-2"
                    variant="outline-primary"
                    size="sm" onClick={() => { handleBookDelete(book._id) }} >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })
      )
      }

    </Fragment>
  )
}
