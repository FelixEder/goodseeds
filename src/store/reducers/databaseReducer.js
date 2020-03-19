

const addPlantReducer = (state, action) => {
    switch (action.type){
        case 'ADD_PLANT':
            // add plant action dispatch update state.

        case 'ADD_PLANT_ERROR':
            // signal error when adding plant. 

        default:
            return state;    
    }
}

const addReviewReducer = (state,action) => {
    switch (action.type){
        case 'ADD_REVIEW':
            // add review action update state?
        case 'ADD_REVIEW_ERROR':
            //signal error adding review
        default:
            return state;
    }
}