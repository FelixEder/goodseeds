import plantReducer from './plantReducer'
import reviewReducer from './reviewReducer'
import numberReducer from './numberReducer';
import arrayReducer from './arrayReducer';
import searchResultsReducer from './searchResultsReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'


const rootReducer = combineReducers({
    number: numberReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    // array: arrayReducer
    plant: plantReducer,
    review: reviewReducer,
    searchResults: searchResultsReducer

})

export default rootReducer;
