export const createNumber = (number) => {
    return (dispatch, getState) => {
        // make async call to db
        dispatch({type: 'CREATE_NUMBER', number})
    }
};