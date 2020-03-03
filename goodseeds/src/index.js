import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import rootReducer from './store/reducers/rootReducer'

// Redux-react imports
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'react-thunk'

// Firebase imports
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'

// var admin = require("firebase-admin");
var serviceAccount = require("./config/serviceAccountKey.json");
const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })));

firebase.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://goodseeds-6ae68.firebaseio.com"
  }
)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
