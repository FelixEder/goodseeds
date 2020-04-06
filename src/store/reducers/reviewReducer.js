// reducer connected to addReview action.
const reviewReducer = (state = [],action) => {
    switch (action.type){
        case 'ADD_REVIEW':
            // add review action update state?
        case 'ADD_REVIEW_ERROR':
            //signal error adding review
        default:
            return state;
    }
}