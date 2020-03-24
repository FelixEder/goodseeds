
export const addPlant = (plant) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        // unsure what state is in this case
        const firestore = getFirestore();
        const state = getState();
        firestore.collection('Users').doc(state.userID).update({
            Plants: firestore.FieldValue.arrayUnion(plant)
        }).then(() => {
            dispatch({type: 'ADD_PLANT', plant});
        }).catch((err) => {
            console.log('error: ' + err);
            dispatch({type: 'ADD_PLANT_ERROR', err});
        })
    }
}

export const waterPlant = (waterAction) => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firestore = getFirestore();
        const timeSinceWatered = waterAction.time;
        const plantID = waterAction.plantID;
        const state = getState();
        var userDoc = firestore.collection('Users').doc(state.userID);
        var plants = userDoc.get().then((doc) => {
            if(doc.exists) {
                return doc.Plants;
            } else {
                console.log('no such document exists');
            }
        })
        plants = updateWateredTime(plants,waterAction)
        firestore.collection('Users').doc(state.userID).set({
            plants: plants
        }).then(() => {
            dispatch({type: 'WATERED_PLANT', })
        }).catch((err) => {
            dispatch({type:'WATERED_PLANT_ERROR', err })
        })
    }
}


const updateWateredTime = (plants,waterAction) => {
  const plant = plants.find(plant => plant.plantID === waterAction.plantID);
  const updatedPlant = {...plant ,timeSinceWatered: waterAction.time};
  plants = plants.map(plant => {
     return plant.plantID === waterAction.plantID? updatedPlant: plant 
    })
  return plants;  
} 