import React from 'react';
import propTypes from 'prop-types';
import './publisher-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

// Show details once BookCard is clicked
export class PublisherView extends React.Component {

  render() {
    const { publisher, onBackClick } = this.props;

    return (
      <Container fluid style={{ paddingTop: '.75rem' }}>
        <Row>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className='publisher-name'>
                  <span className='label'>Name: </span>
                  <span className='value'>{publisher.Name}</span>
                </Card.Title>
                <Card.Text className='publisher-olanguage'>
                  <span className='label'>Original Language: </span>
                  <span className='value'>{publisher.OLanguage}</span>
                </Card.Text>
                <Card.Text className='publisher-releaseyear'>
                  <span className='label'>Release Year: </span>
                  <span className='value'>{publisher.ReleaseYear}</span>
                </Card.Text>
                <Button variant='secondary' onClick={() => { onBackClick(); }}>Back</Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Container >
    )
  }
}

PublisherView.propTypes = {
  publisher: propTypes.shape({
    Name: propTypes.string.isRequired,
    OLanguage: propTypes.string.isRequired,
    ReleaseYear: propTypes.number.isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};