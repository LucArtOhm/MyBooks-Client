import React from 'react';
import propTypes from 'prop-types';
import './book-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

// Show details once BookCard is clicked
export class BookView extends React.Component {

  render() {
    const { book, onBackClick } = this.props;

    return (
      <Container>
        <Row className='book-view'>
          <div className='book-cover'>
            <img crossOrigin="anonymous" src={book.CoverURL} />
          </div>
        </Row>
        <Row className='book-title'>
          <span className='label'>Title: </span>
          <span className='value'>{book.Title}</span>
        </Row>
        <Row className='book-description'>
          <span className='label'>Description: </span>
          <span className='value'>{book.Description}</span>
        </Row>
        <Row className='book-author'>
          <span className='label'>Author: </span>
          <span className='value'>{book.Author.Name}</span>
        </Row>
        <Row className='book-illustrator'>
          <span className='label'>Illustrator: </span>
          <span className='value'>{book.Illustrator}</span>
        </Row>
        <Row>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
        </Row>
      </Container>
    )
  }
}

BookView.propTypes = {
  book: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Author: propTypes.shape({
      Name: propTypes.string.isRequired
    }),
    Illustrator: propTypes.string.isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};