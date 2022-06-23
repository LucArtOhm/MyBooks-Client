import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

import './book-view.scss';

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
                  <Link to={`/authors/${book.Author.Name}`}>
                    <Button variant='link'>Author</Button>
                  </Link>
                </Card.Text>
                <Card.Text className='book-publisher'>
                  <span className='label'>Publisher: </span>
                  <span className='value'>{book.Publisher.Name}</span>
                  <Link to={`/publishers/${book.Publisher.Name}`}>
                    <Button variant='link'>Publisher</Button>
                  </Link>
                </Card.Text>
                <Button onClick={() => { onBackClick(); }}>Back</Button>
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