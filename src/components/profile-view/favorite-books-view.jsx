import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteBooksView(props) {
  const { books, favoriteBooks, currentUser, token } = props;

  const favoriteBooksId = favoriteBooks.map(b => b._id)

  const favoriteBooksList = books.filter(b => {

    return favoriteBooksId.includes(b._id)
  })

  const handleBookDelete = (bookId) => {
    axios.delete(`https://your-favorite-books.herokuapp.com/users/${currentUser}/books/${book_id}`, {
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
              <Card>
                <Link to={`/books/${book_id}`}>
                  <Card.Img variant="top" src={book.CoverURL} />
                </Link>
                <Card.Body>
                  <Card.Title>{book.Title}</Card.Title>
                  <Card.Text>{book.Description}</Card.Text>
                  <Link to={`/books/${book_id}`}>
                    <Button className="button" variant="outline-primary" size="sm">Open</Button>
                  </Link>
                  <Button
                    className="button ml-2"
                    variant="outline-primary"
                    size="sm" onClick={() => { handleBookDelete(book_id) }} >
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