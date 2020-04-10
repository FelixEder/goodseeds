import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import addReview from '../store/actions/reviewActions'

const PlantDetails = ({props,reviews}) => {
  return(
    <div className='plant-details'>
      <span className='plant-title'>
        Funny plant
      </span>
    
      {/* Reviews */}
      <AddReviewComponent props={props}/>
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

const AddReviewComponent = (props) => {
  // how i think it will work.
  const {auth} = props;
  const username = auth.username; 
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
          const reviewdata = {
            plantID: props.plantID, 
            username: username,
            rating: formData.rating,
            reviewText: formData.reviewText,
            timestamp: event.timeStamp,
          } 
          // dispatch action
          addReview(reviewdata);
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
  return {
    reviews: state.firestore.ordered.Review
  }
}

export default compose(
  firestoreConnect(() => [{collection: 'Review'}]),
  connect(mapStateToProps, mapDispatchToProps)
)(PlantDetails)