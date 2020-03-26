import numberReducer from './numberReducer'
import arrayReducer from './arrayReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'


const rootReducer = combineReducers({
    number: numberReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
    // array: arrayReducer
})

export default rootReducer;