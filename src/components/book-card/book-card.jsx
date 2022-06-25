import React from 'react';
import propTypes from 'prop-types';
import { Button, Card, Row, Col, Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './book-card.scss';

export class BookCard extends React.Component {
  render() {
    const { book } = this.props;

    return (
      <Card style={{ marginTop: 50, marginBottom: 30 }} className='book-card-wrapper, mb3'>
        <Card.Body>
          <Row>
            <Col className='book-card mt-3'>
              <Figure>
                <Figure.Image
                  alt='Image of the book cover'
                  variant='top'
                  crossOrigin='Anonymous'
                  src={book.CoverURL} />

                {<Figure.Caption className='mt-3' >Genre:<br></br> {book.Genre}</Figure.Caption>}
                <Link to={`/books/${book._id}`}>
                  <Button className='mt-3' variant='secondary'>Open</Button>
                </Link>
              </Figure>
            </Col>
          </Row>
        </Card.Body>
      </Card >
    );
  }
}

BookCard.propTypes = {
  book: propTypes.shape({
    Genre: propTypes.string.isRequired,
    CoverURL: propTypes.string.isRequired
  }).isRequired
};