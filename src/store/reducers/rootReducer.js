import numberReducer from './numberReducer';
import arrayReducer from './arrayReducer';
import searchResultsReducer from './searchResultsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    number: numberReducer,
    // array: arrayReducer
    searchResults: searchResultsReducer
})

export default rootReducer;
