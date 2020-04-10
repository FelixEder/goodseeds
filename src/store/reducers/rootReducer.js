import numberReducer from './numberReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'


const rootReducer = combineReducers({
    number: numberReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducer
})

export default rootReducer;