// Action connected to reviewReducer.
export const addReview = (reviewData) => {
    console.log("dispatching addReviewAction");
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
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