// Action connected to reviewReducer.
export const addReview = (reviewData) => {
    console.log("dispatching addReviewAction");
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        console.log('I am here?');
        const firestore = getFirestore();
        const timeStamp = firestore.Timestamp.fromDate(new Date());
        const newReviewDoc = firestore.collection('Review').doc();
        newReviewDoc.set({
            plantID: reviewData.plantID,
            username: reviewData.username,
            rating: reviewData.rating,
            timeStamp: timeStamp,
            reviewText: reviewData.reviewText,
        })/*
        firestore.collection('Review').add({
            plantID: reviewData.plantID,
            username: reviewData.username,
            rating: reviewData.rating,
            timeStamp: timeStamp,
            reviewText: reviewData.reviewText,
        })*/.then(() => {
            console.log('Do i get here?');
            dispatch({type: 'ADD_REVIEW', reviewData})
        }).catch((err) => {
            console.log(err);
            dispatch({type: 'ADD_REVIEW_ERROR', err})
        })
    }
}