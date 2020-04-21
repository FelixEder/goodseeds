
export const addPlant = (action) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        // unsure what state is in this case
        const firestore = getFirestore();
        firestore.collection('Users').doc(action.userID).update({
            Plants: firestore.FieldValue.arrayUnion(action.plant)
        }).then(() => {
            dispatch({type: 'ADD_PLANT', plant: action.plant});
        }).catch((err) => {
            console.log('error: ' + err);
            dispatch({type: 'ADD_PLANT_ERROR', err});
        })
    }
}
