export const createNumber = (number) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to db
        dispatch({ type: 'CREATE_NUMBER', number })
    }
};
