import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {useParams} from 'react-router-dom';
import {getPlantDetails} from '../api/trefleApiCalls';
import RenderPromise from '../util/RenderPromise';

const PlantDetails = ({reviews}) => {
  let {id} = useParams();
  console.log(id);

  const createPlantDisplay = plantDetails => {
    return (
      <div className='plant-details'>
          <span className='plant-image'>
            <img src={plantDetails.images[0].url} />
            <div>
              {plantDetails.scientific_name}
            </div>
          </span>
      </div>
    )
  }

  return (<div>
    <RenderPromise promise={getPlantDetails(id)} renderData={({data}) => (<span>{createPlantDisplay(data)} </span>)} />
    {reviews
        ? (<div className='plant-reviews'>
            {
              reviews.map(review => (<div className='plant-review'>
                <span className='plant-review-rating'>
                  Rating: {review.rating}
                </span>

                <span className='plant-review-text'>
                  Review text: {review.reviewText}
                </span>

                <span className='plant-review-user'>
                  {review.user}
                </span>
              </div>))
            }
          </div>)
        : null
    }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {reviews: state.firestore.ordered.Review}
}

export default compose(firestoreConnect(() => [
  {
    collection: 'Review'
  }
]), connect(mapStateToProps, null))(PlantDetails)
