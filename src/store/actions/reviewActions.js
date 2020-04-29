// Action to add review into firestore
export const addReview = (reviewData, plantID) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const timeStamp = firestore.Timestamp.fromDate(new Date());
        reviewData.timeStamp = timeStamp;
        const plantReviewDocRef = firestore.collection('Plants').doc(plantID);
        if (!plantReviewDocRef) {
            // if the document does not exists create a new
            plantReviewDocRef.set({
                Reviews: [],
                average_rating: 0
            })
        }
        let newAverageRating = plantReviewDocRef.get().then((documentSnapShot) => {
            let data = documentSnapShot.data();
            let currentAverageRating = parseInt(data.average_rating);
            let numbOfReviews = parseInt(data.Reviews.length);
            numbOfReviews += 1;
            // caluculate new average
            newAverageRating = currentAverageRating + ((parseInt(reviewData.rating) - currentAverageRating) / numbOfReviews);
            return newAverageRating;
        }).then((rating) => {
            plantReviewDocRef.update({
                Reviews: firestore.FieldValue.arrayUnion(JSON.stringify(reviewData)),
                average_rating: rating
            }).then(() => {
                dispatch({type: 'ADD_REVIEW', reviewData})
            }).catch((err) => {
                console.log(err);
                dispatch({type: 'ADD_REVIEW_ERROR', err})
            })

        })
        
    }
}
