
export const addPlant = (action) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        // unsure what state is in this case
        const firestore = getFirestore();
        const userDoc = firestore.collection('Users').doc(action.userID);
        userDoc.get()
        .then(doc => {
          if (!doc.data().plants.some(plant => { return JSON.parse(plant).id === action.plantID; })) {
            userDoc.update({
              plants: firestore.FieldValue.arrayUnion(JSON.stringify({id: action.plantID, lastWatered: null, waterPeriod: null}))
            });
          } else {
            throw "Plant already exists in garden";
          }
        })
        .then(() => {
            dispatch({type: 'ADD_PLANT', plant: action.plantID});
        }).catch((err) => {
            console.log('error: ' + err);
            dispatch({type: 'ADD_PLANT_ERROR', err});
        })
    }
}
