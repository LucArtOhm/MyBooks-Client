import React from 'react';
import propTypes from 'prop-types';
import './book-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

// Show details once BookCard is clicked
export class BookView extends React.Component {

  render() {
    const { book, onBackClick } = this.props;

    return (
      <Container fluid style={{ paddingTop: '.75rem' }}>
        <Row>
          <CardGroup>
            <Card>
              <Card.Img variant='top' crossOrigin='Anonymous' src={book.CoverURL} />
              <Card.Body>
                <Card.Title className='book-title'>
                  <span className='label'>Title: </span>
                  <span className='value'>{book.Title}</span>
                </Card.Title>
                <Card.Text className='book-description'>
                  <span className='label'>Description: </span>
                  <span className='value'>{book.Description}</span>
                </Card.Text>
                <Card.Text className='book-author'>
                  <span className='label'>Author: </span>
                  <span className='value'>{book.Author.Name}</span>
                </Card.Text>
                <Card.Text className='book-illustrator'>
                  <span className='label'>Illustrator: </span>
                  <span className='value'>{book.Illustrator}</span>
                </Card.Text>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Container >
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