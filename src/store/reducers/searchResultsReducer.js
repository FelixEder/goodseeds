const searchResultsReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.results;
        default:
            return state;
    }
}

export default searchResultsReducer;
