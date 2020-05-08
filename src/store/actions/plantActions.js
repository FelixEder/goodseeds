
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

export const removePlant = (action) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const userDoc = firestore.collection('Users').doc(action.userID);
    userDoc.get()
      .then((documentSnapshot) => {
        if(documentSnapshot.exists) {
          let data = documentSnapshot.data();
          let plantArray = data.plants;
          // remove the plant from the users profile
          var newPlantArray = plantArray.filter(plant => JSON.parse(plant).id !== action.plantID);
          userDoc.update({
            plants: newPlantArray
          }).then(() => {
            dispatch({type: 'REMOVED_PLANT'})
          }).catch(err => {
            dispatch({type: 'REMOVED_PLANT_ERROR', err})
          })
        }
      })
  }
}
