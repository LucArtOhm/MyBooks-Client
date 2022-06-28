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
                <Card.Text className='book-illustrator'>
                  <span className='label'>Illustrator: </span>
                  <span className='value'>{book.Illustrator}</span>
                </Card.Text>
                <Card.Text className='book-reading-age'>
                  <span className='label'>Reading Ages: </span>
                  <span className='value'>{book.ReadingAge}</span>
                </Card.Text>
                <Card.Text className='book-digital-version'>
                  <span className='label'>Digital Version: </span>
                  <span className='value'>{book.DigitalVersion}</span>
                </Card.Text>
                <Card.Text className='book-author'>
                  <Link to={`/authors/${book.Author.Name}`}>
                    <Button variant='light' size='sm'>Author</Button>
                  </Link>
                </Card.Text>
                <Card.Text className='book-publisher'>
                  <Link to={`/publishers/${book.Publisher.Name}`}>
                    <Button variant='light' size='sm'>Publisher</Button>
                  </Link>
                </Card.Text>
                <Button variant='secondary' onClick={() => { onBackClick(null); }}>Back</Button>
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
  }).isRequired
};