import React from 'react';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import Router from './Router';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
