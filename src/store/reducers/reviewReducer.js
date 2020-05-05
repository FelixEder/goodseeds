// reducer connected to addReview action.
const reviewReducer = (state = [],action) => {
    switch (action.type){
        case 'ADD_REVIEW':
            console.log('review Added');
            // add review action update state?
        case 'ADD_REVIEW_ERROR':
            console.log('error when adding review');
            //signal error adding review
        default:
            return state;
    }
}