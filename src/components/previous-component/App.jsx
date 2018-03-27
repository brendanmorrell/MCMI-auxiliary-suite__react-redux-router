import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import QuestionList from './QuestionList';
import '../styles/styles.scss';

const App = () => (
  <div>
    <Header />
    <QuestionList />
  </div>
);

const appRoot = document.getElementById('app');
ReactDOM.render(<App />, appRoot);
