import numberReducer from './numberReducer'
import arrayReducer from './arrayReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    number: numberReducer,
    // array: arrayReducer
})

export default rootReducer;