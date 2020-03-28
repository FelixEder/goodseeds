import React from 'react';
import './App.css';
import Router from './Router';
import getJWTToken from './api/trefleAuth';

function App() {
  console.log("Hej");
  if (!localStorage.getItem('token'))
    getJWTToken();
  return (
    <Router />
  );
}

export default App;
