// Action to add review into firestore
export const addReview = (reviewData, plantID) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const timeStamp = new Date();
        // Add timestamp of review to the data.
        reviewData.timeStamp = timeStamp;
        const plantReviewDocRef = firestore.collection('Plants').doc(plantID);

        plantReviewDocRef.get()
            .then((documentSnapShot) => {
                // check if the document exists, if not create a new document and insert first review, if it does exists update the average and insert new review
                if(documentSnapShot.exists) {
                        let data = documentSnapShot.data();
                        let currentAvgRating = parseFloat(data.avg_rating);
                        let numbOfReviews = parseInt(data.reviews.length);
                        // calculate new average
                        let newAverageRating = (numbOfReviews * currentAvgRating + reviewData.rating) / (numbOfReviews + 1);
                        // insert new avg_rating and review
                        plantReviewDocRef.update({
                            reviews: firestore.FieldValue.arrayUnion(JSON.stringify(reviewData)),
                            avg_rating: newAverageRating
                        }).then(() => {
                            dispatch({type: 'ADD_REVIEW', reviewData})
                        }).catch((err) => {
                            console.log(err);
                            dispatch({type: 'ADD_REVIEW_ERROR', err})
                        });
                } else {
                     // if the document does not exists create a new with the initial review
                    plantReviewDocRef.set({
                        reviews: [JSON.stringify(reviewData)],
                        avg_rating: reviewData.rating
                    }).then(() => {
                        dispatch({type: 'ADD_REVIEW', reviewData})
                    }).catch((err) => {
                        console.log(err);
                        dispatch({type: 'ADD_REVIEW_ERROR', err})
                    });
                }
            })
    }
}
