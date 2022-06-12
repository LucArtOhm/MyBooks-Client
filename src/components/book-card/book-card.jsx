import React from 'react';
import propTypes from 'prop-types';

export class BookCard extends React.Component {
  render() {
    const { book, onBookClick } = this.props;

    return (
      <div onClick={() => onBookClick(book)} className='book-card'>{book.Title}</div>
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