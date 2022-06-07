import React from 'react';
import axios from 'axios';

// Add components
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      books: [],
      selectedBook: null,
      user: null,
      showRegistrationForm: false // This will help to toggle the registration view
    };
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

  // When a book is clicked, this function is invoked and updates the state of the `selectedBook` property to that book
  setSelectedBook(book) {
    this.setState({
      selectedBook: book
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(user) {
    this.setState({
      user
    })
  }

  toggleRegisterView(e) {
    e.preventDefault();
    this.setState({
      showRegistrationForm: !this.state.showRegistrationForm,
      user: !this.state.user
    })
  }

  render() {
    const { books, selectedBook, user, showRegistrationForm } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView

    if (!user) return
    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} clickHandler={(e) => this.toggleRegisterView(e)} />;

    // Before the books have been loaded
    if (books.length === 0) return <div className='main-view' />;

    if (!showRegistrationForm) return <RegistrationView onRegistration={(user) => this.onRegistration(user)} clickHandler={(e) => this.toggleRegisterView(e)} />;

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

