import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Router from './Router';

// Get token
import getJWTToken from './api/trefleAuth';

// Root reducer
import rootReducer from './store/reducers/rootReducer'

// Redux-react imports
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

// Firebase imports
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore'
import { getFirebase, isLoaded } from 'react-redux-firebase'

// Config import
import firebaseConfig from './config/FirebaseConfig.js'
import firebase from 'firebase/app'

// Some themes
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Fetch tokens
//getJWTToken();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5aab61'
    },
    secondary: {
      main: '#25523B'
    }
  }
});

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, firebaseConfig)
  )
);

const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
  userProfile: 'users', // where profiles are stored in database
  // presence: 'presence', // where list of online users is stored in database
  // sessions: 'sessions'
}

// Used to create loading screen while auth is loading
function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
    return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>, 
  document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
