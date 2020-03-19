
export const addPlant = (plant) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        // unsure what state is in this case
        const firestore = getFirestore();
        const state = getState();
        firestore.collection('Users').doc(state.userID).update({
            plants: firestore.FieldValue.arrayUnion(plant)
        }).then(() => {
            dispatch({type: 'ADD_PLANT', plant});
        }).catch((err) => {
            console.log('error: ' + err);
            dispatch({type: 'ADD_PLANT_ERROR', err});
        })
    }
}