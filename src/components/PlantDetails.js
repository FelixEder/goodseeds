import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const PlantDetails = ({reviews}) => {
  console.log(reviews)
  return(
    <div className='plant-details'>
      <span className='plant-title'>
        Funny plant
      </span>

      {/* Reviews */}
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

const mapStateToProps = (state) => {
  return {
    reviews: state.firestore.ordered.Review
  }
}

export default compose(
  firestoreConnect(() => [{collection: 'Review'}]),
  connect(mapStateToProps, null)
)(PlantDetails)