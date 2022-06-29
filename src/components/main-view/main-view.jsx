import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';
import { AuthorView } from '../author-view/author-view';
import { PublisherView } from '../publisher-view/publisher-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      books: [],
      user: null,
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getBooks(authData.token);
  }

  getBooks(token) {
    axios.get('https://your-favorite-books.herokuapp.com/books', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          books: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { books, user } = this.state;
    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
              if (!user) {
                return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              }
              // Before the books have been loaded
              if (books.length === 0) return <div className='main-view' />
              return books.map(b => (
                <Col xs={12} md={6} lg={3} key={b._id}>
                  <BookCard book={b} />
                </Col>
              ))
            }} />

            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />

            <Route path='/books/:booksId' render={({ match, history }) => {
              if (!user) return <Col sm={6} md={4} lg={3}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (books.length === 0) return <div className='main-view' />;
              return <Col md={8}>
                <BookView book={books.find(b => b._id === match.params.booksId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/authors/:name' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (books.length === 0) return <div className='main-view' />;
              return <Col sm={6} md={4} lg={3}>
                <AuthorView author={books.find(b => b.Author.Name === match.params.name).Author} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/publishers/:name' render={({ match, history }) => {
              if (!user) return <Col><div className='main-view' />;
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              if (books.length === 0) return <div className='main-view' />;
              return <Col sm={6} md={4} lg={3}>
                <PublisherView publisher={books.find(b => b.Publisher.Name === match.params.name).Publisher} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Link to={`/users/${user}`} >{user}</Link>
            <Route path={`/users/${user}`} render={({ history }) => {
              if (!user) return <Redirect to='/' />
              return <Col>
                <ProfileView books={books} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

          </Row>
        </Container>
      </Router>
    );
  }
}

