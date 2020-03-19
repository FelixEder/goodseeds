export const getPlants = (username) => {
    
}

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

export const addReview = (reviewData) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const state = getState();
        firestore.collection('Review').add({
            plantID: reviewData.plantID,
            username: reviewData.username,
            rating: reviewData.rating,
            timeStamp: reviewData.timeStamp,
            reviewText: reviewData.reviewText,
        }).then(() => {
            dispatch({type: 'ADD_REVIEW', reviewData})
        }).catch((err) => {
            dispatch({type: 'ADD_REVIEW_ERROR', err})
        })
    }
}