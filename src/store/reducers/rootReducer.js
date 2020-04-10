
import authReducer from './authReducer'
import numberReducer from './numberReducer';
import searchResultsReducer from './searchResultsReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    number: numberReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducer,
    searchResults: searchResultsReducer
})

export default rootReducer;
