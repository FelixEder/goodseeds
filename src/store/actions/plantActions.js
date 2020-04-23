// this action is connected to the plantReducer.
// waterAction = {userID, plantID}
export const waterPlant = (waterAction) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userDoc = firestore.collection('Users').doc(waterAction.userID);
        userDoc.get()
              .then(doc => {
                userDoc.update({
                  plants: doc.data().plants.map(plant => {
                    return JSON.parse(plant).id === waterAction.plantID
                    ? JSON.stringify({id: JSON.parse(plant).id, lastWatered: new Date(), waterPeriod: JSON.parse(plant).waterPeriod})
                    : plant
                  })
                });
              })
              .then(() => {
                dispatch({type: 'WATER_PLANT'});
              })
              .catch(err => {
                dispatch({type: 'WATER_PLANT_ERROR', err});
              });
    }
}

export const updateWaterPeriod = (action) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userDoc = firestore.collection('Users').doc(action.userID);
        userDoc.get()
              .then(doc => {
                userDoc.update({
                  plants: doc.data().plants.map(plant => {
                    return JSON.parse(plant).id === action.plantID
                    ? JSON.stringify({id: JSON.parse(plant).id, lastWatered: JSON.parse(plant).lastWatered, waterPeriod: action.waterPeriod})
                    : plant
                  })
                });
              })
              .then(() => {
                dispatch({type: 'UPDATE_WATER_PERIOD'});
              })
              .catch(err => {
                dispatch({type: 'UPDATE_WATER_PERIOD_ERROR', err});
              });
    }
}
