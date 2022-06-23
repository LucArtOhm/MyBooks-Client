import React from 'react';
import propTypes from 'prop-types';
import './publisher-view.scss';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';

// Show details once BookCard is clicked
export class PublisherView extends React.Component {

  render() {
    const { Publisher, onBackClick } = this.props;

    return (
      <Container fluid style={{ paddingTop: '.75rem' }}>
        <Row>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className='publisher-name'>
                  <span className='label'>Name: </span>
                  <span className='value'>{Publisher.Name}</span>
                </Card.Title>
                <Card.Text className='publisher-olanguage'>
                  <span className='label'>Original Language: </span>
                  <span className='value'>{Publisher.OLanguage}</span>
                </Card.Text>
                <Card.Text className='publisher-releaseyear'>
                  <span className='label'>Release Year: </span>
                  <span className='value'>{Publisher.OLanguage}</span>
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

PublisherView.propTypes = {
  Publisher: propTypes.shape({
    Name: propTypes.string.isRequired,
    OLanguage: propTypes.string.isRequired,
    ReleaseYear: propTypes.string.isRequired
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};