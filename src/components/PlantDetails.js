import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

const PlantDetails = ({reviews}) => {
  let { id } = useParams();

  return(
    <div className='plant-details'>
      <span className='plant-title'>
        Funny plant
        <h1>{id}</h1>
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
