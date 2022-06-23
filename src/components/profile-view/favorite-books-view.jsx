import React from 'react';
import axios from 'axios';
import { Row, Col, Button, Figure, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

function FavoriteBooksView({ favoriteBooksList }) {
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://your-favorite-books.herokuapp.com/users/${localStorage.getItem('user')}/books/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Books</h4>
          </Col>
        </Row>

        <Row>
          {favoriteBooksList.map((CoverURL, Title, _id) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className='fav-books'>
                <Figure>
                  <Link to={`/books/${_id}`}>
                    <Figure.Imgage
                      src={CoverURL}
                      alt={Title}
                    />
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                  </Link>
                </Figure>

                <Button
                  variant='secondary'
                  onClick={() => removeFav(books._id)}>
                  Remove
                </Button>
              </Col>
            )
          })
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FavoriteBooksView