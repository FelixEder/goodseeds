import React from 'react';
import './App.css';
import Router from './Router';
const firebase = require("firebase");

function App() {
  var authTrefleApi = firebase.functions().httpsCallable('authTrefleApi');
  authTrefleApi().then(function(result) {
    console.log("Got result from backend");
    console.log(result);
  });
  return (
    <Router />
  );
}

export default App;
