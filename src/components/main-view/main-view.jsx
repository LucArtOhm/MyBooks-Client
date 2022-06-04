import React from 'react';
import axios from 'axios';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';


export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      selectedBook: null
    }
  }

  componentDidMount() {
    axios.get('https://your-favorite-books.herokuapp.com/books')
      .then(response => {
        this.setState({
          books: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedBook(newSelectedBook) {
    this.setState({
      selectedBook: newSelectedBook
    });
  }

  render() {
    const { books, selectedBook } = this.state;

    if (books.length === 0) return <div className='main-view' />;

    return (
      <div className='main-view'>
        {selectedBook
          ? <BookView book={selectedBook} onBackClick={newSelectedBook => { this.setSelectedBook(newSelectedBook); }} />
          : books.map(book => (
            <BookCard key={book._id} book={book} onBookClick={(newSelectedBook) => { this.setSelectedBook(newSelectedBook) }} />
          ))
        }
      </div>
    );
  }
}

