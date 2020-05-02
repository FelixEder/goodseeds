import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {useParams} from 'react-router-dom';
import {getPlantDetails} from '../api/trefleApiCalls';
import RenderPromise from '../util/RenderPromise';
import { addPlant } from '../store/actions/plantActions';
import { addReview } from '../store/actions/reviewActions'

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
                : <button onClick={() => addPlant({userID: uid, plantID: plantDetails.id})} disabled={user ? user[0].plants.some(plant => (JSON.parse(plant).id === plantDetails.id)) : false}>Add to my garden</button>}
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
    {<AddReviewComponent user={user} addReview={addReview}/>
        reviews
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
// component that adds a form of adding a review to this plant
const AddReviewComponent = ({user, addReview}) => {
  // take plantID from route
  let { id } = useParams();
  
  const username = user ? user[0].name : null;
  let rating;
  let reviewText;
  return (
    <div>
      <form id='addReviewForm'>
        <h1>Add your review on this plant!</h1>
        <label>write your review here:</label><br/>
        <textarea form='addReviewForm' id='reviewText'></textarea><br/>
        <label htmlFor='rating'> rate the plant (between 1 and 5)</label>
        <input id='rating' type='number' name='rating' min='1' max='5'></input>
        </form>
        <input type='submit' value='Add review' onClick={(event) => {
          // send the complete review data to the action
          rating = document.getElementById('rating').value;
          rating = parseInt(rating);
          reviewText =document.getElementById('reviewText').value;
          if(reviewText !== null && rating !== null && username !== null){
            const reviewData = {
              username: username,
              rating: rating,
              reviewText: reviewText,
            } 
            // dispatch action with reviewdata
            addReview(reviewData, id);
            document.getElementById('addReviewForm').reset();
          }
        }}/>
      
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (reviewData, plantID) => dispatch(addReview(reviewData, plantID))
  }
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
