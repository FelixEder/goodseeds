import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {useParams} from 'react-router-dom';
import {getPlantDetails} from '../api/trefleApiCalls';
import RenderPromise from '../util/RenderPromise';
import { addPlant } from '../store/actions/plantActions';

const PlantDetails = ({uid, user, reviews, addPlant}) => {
  let {id} = useParams();

  const createPlantDisplay = plantDetails => {
    return (
      <div className='plant-details'>
          <span className='plant-image'>
            <img src={plantDetails.images.length > 0 ? plantDetails.images[0].url : null} width='500px' />
            <div>
              {plantDetails.scientific_name}
            </div>
            <div>
              {!uid
                ? "Sign up or Log in to add this plant to your garden"
                : <button onClick={() => addPlant({userID: uid, plantID: plantDetails.id})}>Add to my garden</button>}
            </div>
          </span>
          <div>
            <div>
              <b>Common name: </b> {plantDetails.common_name}
            </div>
            <div>
              <b>Family common name: </b> {plantDetails.family_common_name}
            </div>
            <div>
              <b>Scientific name: </b> {plantDetails.scientific_name}
            </div>
            <div>
              <b>Duration: </b>  {plantDetails.duration}
            </div>
            <div>
              <b>Fire resistance: </b>  {plantDetails.main_species.specifications.fire_resistance}
            </div>
            <div>
              <b>Native status: </b>  {plantDetails.native_status}
            </div>
        </div>
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
  return {
    uid: state.firebase.auth.uid,
    user: state.firestore.ordered.Users,
    reviews: state.firestore.ordered.Review
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlant: (plantAction) => dispatch(addPlant(plantAction))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return !props.uid
    ? [{ collection: 'Review' }]
    : [{ collection: 'Review' }, { collection: 'Users', doc: props.uid }]
  }),
)(PlantDetails)
