import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

import './book-card.scss';

export class BookCard extends React.Component {
  render() {
    const { book, onBookClick } = this.props;

    return (
      <Card className='book-card-wrapper, mb3'>
        <Card.Img alt='Image of the book cover' variant='top' style={{}} crossOrigin='Anonymous' src={book.CoverURL} />
        <Card.Body>
          <Card.Title>{book.Title}</Card.Title>
          <Card.Text>{book.Description}</Card.Text>
          <Button variant='outline-secondary' onClick={() => onBookClick(book)} >Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

BookCard.propTypes = {
  book: propTypes.shape({
    Title: propTypes.string.isRequired,
    ReadingAge: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.string.isRequired,
    Illustrator: propTypes.string.isRequired,
    CoverURL: propTypes.string.isRequired,
    DigitalVersion: propTypes.bool.isRequired,
    Author: propTypes.shape({
      Name: propTypes.string.isRequired,
      Origin: propTypes.string.isRequired
    }),
    Publisher: propTypes.shape({
      Name: propTypes.string.isRequired,
      OLanguage: propTypes.string.isRequired,
      ReleaseYear: propTypes.number.isRequired
    })
  }).isRequired,
  onBookClick: propTypes.func.isRequired
};