// Action to add review into firestore
export const addReview = (reviewData, plantID) => {
    return (dispatch,getState,{getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const timeStamp = new Date();
        reviewData.timeStamp = timeStamp;
        const plantReviewDocRef = firestore.collection('Plants').doc(plantID);

        plantReviewDocRef.get()
            .then((documentSnapShot) => {
                // check if the document exists, if not create a new document and insert fisrt review, if it does exists update the average and insert new review
                if(documentSnapShot.exists) {
                        let data = documentSnapShot.data();
                        let currentAvgRating = parseFloat(data.avg_rating);
                        let numbOfReviews = parseInt(data.reviews.length);
                        console.log('numbof reviews: ' + numbOfReviews);
                        console.log('current avg rating: ' + currentAvgRating);
                        console.log('rating comming in: ' + reviewData.rating);
                        const difference = parseFloat((reviewData.rating - currentAvgRating) / (numbOfReviews + 1));
                        // calculate new average
                        let newAverageRating = currentAvgRating + difference;
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
