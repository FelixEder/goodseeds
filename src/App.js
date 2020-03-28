import React from 'react';
import './App.css';
import Router from './Router';
import getJWTToken from './api/trefleAuth';

function App() {
  //TODO Reactive the line below to re-use tokens to check expiration.
  //if (!localStorage.getItem('token'))
    getJWTToken();
  return (
    <Router />
  );
}

export default App;
