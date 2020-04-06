
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
// this action is connected to the plantReducer.
export const waterPlant = (waterAction) => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firestore = getFirestore();
        var userDoc = firestore.collection('Users').doc(waterAction.userID);
        var plants = userDoc.get().then((doc) => {
            if(doc.exists) {
                return doc.Plants;
            } else {
                console.log('no such document exists');
            }
        })
        // update plantobject in array and then update the whole array to a new array
        plants = updateWateredTime(plants,waterAction)
        // insert the updated array into the user document.
        firestore.collection('Users').doc(waterAction.userID).update({
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