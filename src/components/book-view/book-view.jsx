import React from 'react';

export class BookView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { book, onBackClick } = this.props;

    return <div className='book-view'>
      <div className='book-cover'>
        <img src={book.CoverURL} />
      </div>
      <div className='book-title'>
        <span className='label'>Title: </span>
        <span className='value'>{book.Title}</span>
      </div>
      <div className='book-description'>
        <span className='label'>Description:</span>
        <span className='value'>{book.Description}</span>;
      </div>
      <button onClick={() => { onBackClick(null); }}>Back</button>
    </div>
  }
}

