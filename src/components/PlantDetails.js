import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'
import { addReview } from '../store/actions/reviewActions'

const PlantDetails = ({auth,reviews, users}) => {
  return(
    <div className='plant-details'>
      <span className='plant-title'>
        Funny plant
      </span>
    
      {/* Reviews */}
      {auth.uid?
        <AddReviewComponent uid={auth.uid} users={users}/>
        : null
      }
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

const AddReviewComponent = ({uid,users}) => {
  // take plantID from route
  let { id } = useParams();
  const username = users[uid].name;
  
  return (
    <div>
      <form id='addReviewForm'>
        <h1>Add your review on this plant!</h1>
        <label>write your review here:</label><br/>
        <textarea form='addReviewForm' id='reviewText'></textarea><br/>
        <label for='rating'> rate the plant (between 1 and 5)</label>
        <input id='rating' type='number' name='rating' min='1' max='5'></input>
        <input type='submit' value='Add review' onClick={(event) => {
          // send the complete review data to the action
          let reviewForm = document.getElementById('addReviewForm');
          const formData = new FormData(reviewForm);
          if(formData.reviewText !== null && formData.rating !== null){
            const reviewData = {
              plantID: id, 
              username: username,
              rating: formData.rating,
              reviewText: formData.reviewText,
              timestamp: event.timeStamp,
            } 
            // dispatch action with reviewdata
            addReview(reviewData);
          }
        }}/>
      </form>
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
    auth: state.firebase.auth,
    users: state.firestore.ordered.Users
  }
}

export default compose(
  firestoreConnect(() => [{collection: 'Review'}, {collection: 'Users'}]),
  connect(mapStateToProps, mapDispatchToProps)
)(PlantDetails)