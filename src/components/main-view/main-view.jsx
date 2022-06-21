import React from 'react';
import axios from 'axios';

// Add components
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';
import { Container, Row, Col } from 'react-bootstrap';

import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      books: [],
      selectedBook: null,
      user: null,
      registered: null // This will help to toggle the registration view
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getBooks(accessToken);
    }
  }

  // When a book is clicked, this function is invoked and updates the state of the `selectedBook` property to that book
  setSelectedBook(book) {
    this.setState({
      selectedBook: book
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getBooks(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getBooks(token) {
    axios.get('https://your-favorite-books.herokuapp.com/books', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          books: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegistration(registered) {
    this.setState({
      registered
    })
  }

  render() {
    const { books, selectedBook, user, registered } = this.state;

    <button onClick={() => { this.onLoggedOut() }}>Logout</button>

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView

    if (!user) {
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
    }

    if (!registered) return <RegistrationView onRegistration={(registered) => this.onRegistration(registered)} />;

    // Before the books have been loaded
    if (books.length === 0) return <div className='main-view' />;

    return (
      <Container>
        <div className='main-view'>
          {selectedBook
            ? (
              <Row className='main-view justify-content-md-center'>
                <Col>
                  <BookView book={selectedBook} onBackClick={newSelectedBook => { this.setSelectedBook(newSelectedBook); }} />
                </Col>
              </Row>
            )
            : (
              <Row className=''>
                {books.map(book => (
                  <Col sm={6} md={4} lg={3}>
                    <BookCard key={book._id} book={book} onBookClick={(newSelectedBook) => { this.setSelectedBook(newSelectedBook) }} />
                  </Col>
                ))
                }
              </Row>
            )
          }
        </div>
      </Container>
    );
  }
}

