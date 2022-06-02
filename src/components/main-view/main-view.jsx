import React from 'react';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [
        { _id: 1, Title: 'The extraordinary life of Alan Turing', Description: 'The story of Alan Turing is portrayed', CoverURL: 'https://www.penguin.co.uk/content/dam/prh/books/316/316558/9780241434017.jpg.transform/PRHDesktopWide_small/image.jpg' },
        { _id: 2, Title: 'The Christmas Truck', Description: 'A Christmas story full of adventure with Papa, Dad, an amzing kid, and grandma.', CoverURL: 'https://images.booksense.com/images/408/743/9780990743408.jpg' },
        { _id: 3, Title: 'And Tango Makes Three', Description: 'The true story of two male pinguins who became fathers in NYC', CoverURL: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-02/19/20/asset/9bc4c1b086f2/sub-buzz-374-1582143100-10.jpg?downsize=600:*&output-format=auto&output-quality=auto' }
      ]
    }
  }

  setSelectedBook(newSelectedBook) {
    this.setState({
      selectedBook: newSelectedBook
    });
  }

  render() {
    const { books, selectedBook } = this.state;

    if (books.length === 0) return <div className='main-view'>The list is empty!</div>;

    return (
      <div className='main-view'>
        {selectedBook
          ? <BookView book={selectedBook} onBackClick={newSelectedBook => { this.setSelectedBook(newSelectedBook); }} />
          : books.map(book => (
            <BookCard key={book._id} book={book} onBookClick={(book) => { this.setSelectedBook(book) }} />
          ))
        }
      </div>
    );
  }
}

