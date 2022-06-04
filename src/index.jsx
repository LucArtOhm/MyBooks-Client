import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss``
import './index.scss';

// Main component (will eventually use all the others)
class MyBooksApplication extends React.Component {

  constructor() {
    super();
    // Code executed right when the component is created in the memory
  }

  render() {
    return <div>Hello World</div>;
  }

  componentDidMount() {
    // Code executed right after the component is added to the DOM
  }

  componentDidUpdate() {
    // Code executed right after component's state or props are changed
  }

  componentWillUnmount() {
    // Code executed just before the moment the component gets removed from DOM
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyBooksApplication), container);