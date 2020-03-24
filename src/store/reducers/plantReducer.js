
const plantReducer = (state, action) => {
    switch (action.type){
        case 'ADD_PLANT':
            // add plant action dispatch update state.

        case 'ADD_PLANT_ERROR':
            // signal error when adding plant. 
        case 'WATERED_PLANT':

        case 'WATERED_PLANT_ERROR':

        default:
            return state;    
    }
}