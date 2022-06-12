import React from 'react';
import propTypes from 'prop-types';

// Show details once BookCard is clicked
export class BookView extends React.Component {

  render() {
    const { book, onBackClick } = this.props;

    return (
      <div className='book-view'>
        <div className='book-cover'>
          <img crossOrigin="anonymous" src={book.CoverURL} />
        </div>
        <div className='book-title'>
          <span className='label'>Title: </span>
          <span className='value'>{book.Title}</span>
        </div>
        <div className='book-description'>
          <span className='label'>Description: </span>
          <span className='value'>{book.Description}</span>
        </div>
        <div className='book-author'>
          <span className='label'>Author: </span>
          <span className='value'>{book.Author.Name}</span>
        </div>
        <div className='book-illustrator'>
          <span className='label'>Illustrator: </span>
          <span className='value'>{book.Illustrator}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
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