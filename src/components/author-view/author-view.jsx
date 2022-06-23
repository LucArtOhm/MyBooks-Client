import React from 'react';
import propTypes from 'prop-types';
import './author-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

// Show details once BookCard is clicked
export class AuthorView extends React.Component {

  render() {
    const { Author, onBackClick } = this.props;

    return (
      <Container fluid style={{ paddingTop: '.75rem' }}>
        <Row>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className='author-name'>
                  <span className='label'>Name: </span>
                  <span className='value'>{Author.Name}</span>
                </Card.Title>
                <Card.Text className='author-origin'>
                  <span className='label'>Origin: </span>
                  <span className='value'>{Author.Origin}</span>
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

AuthorView.propTypes = {
  Author: propTypes.shape({
    Name: propTypes.string.isRequired,
    Origin: propTypes.string.isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};