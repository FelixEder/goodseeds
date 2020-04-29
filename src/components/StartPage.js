import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/renderPromise'
import { useHistory } from 'react-router-dom';
import daysBetween from '../util/dateHandler.js'

const StartPage = ({reviews, uid, users}) => {
  const history = useHistory();

  const numPlantsNeedWatering = (users) => {
    if (!users) return null;

    return (users
          .filter(user => user.id == uid)[0].plants // Access users plants
          .filter(plant => (daysBetween(new Date(JSON.parse(plant).lastWatered), new Date()) > JSON.parse(plant).waterPeriod)).length)
  }

  const createReviewDisplay = (plantDetails, reviewDetails) => {
    return(
      <span className='image-span'>
        {plantDetails.images !== undefined && plantDetails.images.length !== 0 ?
          (<img src={plantDetails.images[0].url} alt="review of plant" height='100' onClick={() => {history.push("/plantDetails/" + plantDetails.id)}}/>)
          : null
        }
        
        <h2>
          {plantDetails.common_name ? plantDetails.common_name : plantDetails.scientific_name}
        </h2>

        <i>
          {reviewDetails.reviewText}
        </i>

        <p>
          <b>User: </b>{reviewDetails.username}
        </p>

      </span>
    )
  }

  const createTopPlantDisplay = (plantDetails, reviewDetails) => {
    return(
      <span className='image-span'>
        {plantDetails.images !== undefined && plantDetails.images.length !== 0 ?
          (<img src={plantDetails.images[0].url} alt="review of plant" height='100' onClick={() => {history.push("/plantDetails/" + plantDetails.id)}}/>)
          : null
        }
        
        <h2>
          {plantDetails.common_name ? plantDetails.common_name : plantDetails.scientific_name}
        </h2>

        <p>
          Rating: {reviewDetails.rating}
        </p>

        <p>
          <b>User: </b>{reviewDetails.username}
        </p>

      </span>
    )
  }

  return(
    <div className='start-page'>

      <h1>
        Welcome to Goodseeds
      </h1>

      <div>
        <h2>
        Top rated plants
        </h2>
        {reviews ? reviews.map(review => {
            if (review.plantID) {
              return (
                <RenderPromise promise={getPlantDetails(review.plantID)} renderData={({data}) => {return createTopPlantDisplay(data, review)}}/>
              )
            } else {
              return null
            }           
          })
          : null}
      </div>

      <div>
        <h2>
        Recently reviewed
        </h2>
          {reviews ? reviews.map(review => {
            if (review.plantID) {
              return (
                <RenderPromise promise={getPlantDetails(review.plantID)} renderData={({data}) => {return createReviewDisplay(data, review)}}/>
              )
            } else {
              return null
            }
          })
          : null}
      </div>

      <h2>
        Your garden
      </h2>
        {users === undefined
          ? (<p>Log in or sign up to see your garden</p>)
          : (<p>Your garden has {numPlantsNeedWatering(users)} plants in need of watering!</p> ) 
        }
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    reviews: state.firestore.ordered.Review,
    uid: state.firebase.auth.uid,
    users: state.firestore.ordered.Users
  }
}

export default compose (

  firestoreConnect((props) => {
    return [{ collection: 'Review' }, { collection: 'Users', doc: props.uid }];
  }),
  
  connect(mapStateToProps, null),
)(StartPage);
