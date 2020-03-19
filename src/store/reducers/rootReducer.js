import numberReducer from './numberReducer'
import arrayReducer from './arrayReducer'
import plantReducer from './plantReducer'
import reviewReducer from './reviewReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    number: numberReducer,
    // array: arrayReducer
    plant: plantReducer,
    review: reviewReducer
})

export default rootReducer;