// Action connected to reviewReducer.
export const addReview = (reviewData, plantID) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const timeStamp = firestore.Timestamp.fromDate(new Date());
        reviewData.timeStamp = timeStamp;
        const plantReview = firestore.collection('Review').doc(plantID);
        plantReview.update({
            Reviews: firestore.FieldValue.arrayUnion(JSON.stringify(reviewData))
        }).then(() => {
            dispatch({type: 'ADD_REVIEW', reviewData})
        }).catch((err) => {
            console.log(err);
            dispatch({type: 'ADD_REVIEW_ERROR', err})
        })
    }
}
