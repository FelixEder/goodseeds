import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useParams } from 'react-router-dom'
import { addReview } from '../store/actions/reviewActions'

const PlantDetails = ({auth,reviews, users}) => {
  let {id} = useParams();
  return(
    <div className='plant-details'>
      <span className='plant-title'>
        Funny plant
        <h1>{id}</h1>
      </span>
    
      {/* Reviews */}
      
        <AddReviewComponent uid={auth.uid} users={users}/>
 
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
  //const username = users[uid].name;
  const username = "test";
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
          reviewText =document.getElementById('reviewText').value;
          if(reviewText !== null && rating !== null){
            const reviewData = {
              plantID: id, 
              username: username,
              rating: rating,
              reviewText: reviewText,
              timestamp: event.timeStamp,
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
    auth: state.firebase.auth,
    users: state.firestore.ordered.Users
  }
}

export default compose(
  firestoreConnect(() => [{collection: 'Review'}, {collection: 'Users'}]),
  connect(mapStateToProps, mapDispatchToProps)
)(PlantDetails)
