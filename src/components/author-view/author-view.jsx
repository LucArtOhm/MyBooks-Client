import React from 'react';
import propTypes from 'prop-types';
import './author-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

// Show details once BookCard is clicked
export class AuthorView extends React.Component {

  render() {
    const { author, onBackClick } = this.props;

    return (
      <Container fluid style={{ paddingTop: '.75rem' }}>
        <Row>
          <Col>
            <CardGroup className=''>
              <Card style={{ marginTop: 100, marginBottom: 50 }}>
                <Card.Body>
                  <Card.Title className='author-name'>
                    <span className='label'>Name: </span>
                    <span className='value'>{author.Name}</span>
                  </Card.Title>
                  <Card.Text className='author-origin'>
                    <span className='label'>Origin: </span>
                    <span className='value'>{author.Origin}</span>
                  </Card.Text>
                  <Button variant='secondary' onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container >
    )
  }
}

AuthorView.propTypes = {
  author: propTypes.shape({
    Name: propTypes.string.isRequired,
    Origin: propTypes.string.isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};