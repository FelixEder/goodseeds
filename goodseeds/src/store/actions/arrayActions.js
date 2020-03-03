export const createArray = (array) => {
    return (dispatch, getState) => {
        // make async call to db
        dispatch({ type: 'CREATE_ARRAY', array })
    }
};
