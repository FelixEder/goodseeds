import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'
import { addReview } from '../store/actions/reviewActions'

const PlantDetails = ({uid,reviews, user, addReview}) => {
  let {id} = useParams();
  return(
    <div className='plant-details'>
      <span className='plant-title'>
        Funny plant
        <h1>{id}</h1>
      </span>
      {/* Reviews */}

        <AddReviewComponent user={user} addReview={addReview}/>

      { reviews ? 
              <div className='plant-reviews'>
              {reviews.map(review => (
                <div className='plant-review'>
                  <span className='plant-review-rating'>
                    Rating: {review.rating}
                  </span>

                  <span className='plant-review-text'>
                    Review text: {review.reviewText}
                  </span>

                  <span className='plant-review-user'>
                    {review.user}
                  </span>
                </div>
              ))}
            </div>
            : null}
    </div>
  );
}
// componen that adds a form of adding a review to this plant
const AddReviewComponent = ({user, addReview}) => {
  // take plantID from route
  let { id } = useParams();
  
  const username = user ? user[0].name : null;
  console.log('username here: ' + username);
  let rating;
  let reviewText;
  return (
    <div>
      <form id='addReviewForm'>
        <h1>Add your review on this plant!</h1>
        <label>write your review here:</label><br/>
        <textarea form='addReviewForm' id='reviewText'></textarea><br/>
        <label for='rating'> rate the plant (between 1 and 5)</label>
        <input id='rating' type='number' name='rating' min='1' max='5'></input>
        </form>
        <input type='submit' value='Add review' onClick={(event) => {
          // send the complete review data to the action
          rating = document.getElementById('rating').value;
          rating = parseInt(rating);
          reviewText =document.getElementById('reviewText').value;
          if(reviewText !== null && rating !== null && username !== null){
            const reviewData = {
              plantID: id, 
              username: username,
              rating: rating,
              reviewText: reviewText,
            } 
            // dispatch action with reviewdata
            addReview(reviewData);
          }
        }}/>
      
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (reviewData) => dispatch(addReview(reviewData))
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    reviews: state.firestore.ordered.Review,
    uid: state.firebase.auth.uid,
    user: state.firestore.ordered.Users
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if(!props.uid) return [];
    return [{collection: 'Review'}, {collection: 'Users', doc: props.uid}]
  }),
)(PlantDetails)
