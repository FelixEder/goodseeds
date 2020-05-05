import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/renderPromise'
import { useHistory } from 'react-router-dom';
import daysBetween from '../util/dateHandler.js'
import logo from '../logo.png';

const StartPage = ({plants, uid, users}) => {
  const history = useHistory();


  const numPlantsNeedWatering = (users) => {
    if (!users || !uid) return null;

    return (users
          .filter(user => user.id == uid)[0].plants // Access users plants
          .filter(plant => (daysBetween(new Date(JSON.parse(plant).lastWatered), new Date()) > JSON.parse(plant).waterPeriod)).length)
  }

  const sortAvgRating = (a, b) => {
    if (a.avg_rating > b.avg_rating) {
      return -1
    } else if (b.avg_rating < a.avg_rating) {
      return 1
    }
    return 0
  }

  const generateRandomPlantandReview = () => {
    var potentialPlants = plants.filter(plant => (plant.reviews !== undefined && plant.reviews.length >= 0))
    var randomPlant = potentialPlants[Math.floor(Math.random()*potentialPlants.length)];
    var randomReview = JSON.parse(randomPlant.reviews[[Math.floor(Math.random()*randomPlant.reviews.length)]])
    return <RenderPromise promise={getPlantDetails(randomPlant.id)} renderData={({data}) => {return createReviewDisplay(data, randomReview)}}/>
    
  }

  const createReviewDisplay = (plantDetails, reviewDetails) => {
    return(
      <span className='image-span'>
        <img src={(plantDetails.images && plantDetails.images.length > 0) ? plantDetails.images[0].url : logo} alt="review of plant" height='100' onClick={() => {history.push("/plantDetails/" + plantDetails.id)}}/>
        
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
        <img src={(plantDetails.images && plantDetails.images.length > 0) ? plantDetails.images[0].url : logo} alt="review of plant" height='100' onClick={() => {history.push("/plantDetails/" + plantDetails.id)}}/>
        
        <h2>
          {plantDetails.common_name ? plantDetails.common_name : plantDetails.scientific_name}
        </h2>

        <p>
          Average Rating: {reviewDetails.avg_rating.toFixed(2)}
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

        {
          plants ?
            plants.slice()             // Copy array
                  .sort(sortAvgRating) // Sort according to avg rating
                  .slice(0,5)          // Take first 5 elements
                  .map(plant => {
                    return (
                      <RenderPromise promise={getPlantDetails(plant.id)} renderData={({data}) => {return createTopPlantDisplay(data, plant)}}/>
                    )
                  })
          : null
        }
      </div>

      <div>
        <h2>
        Random review
        </h2>

          {
            plants ?
            generateRandomPlantandReview()
            : null
          }
      </div>

      <h2>
        Your garden
      </h2>
        {!users || !uid
          ? (<p>Log in or sign up to see your garden</p>)
          : (<p>Your garden has {numPlantsNeedWatering(users)} plants in need of watering!</p> ) 
        }
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    plants: state.firestore.ordered.Plants,
    uid: state.firebase.auth.uid,
    users: state.firestore.ordered.Users
  }
}

export default compose (

  firestoreConnect((props) => {
    return [{ collection: 'Plants' }, { collection: 'Users', doc: props.uid }];
  }),
  
  connect(mapStateToProps, null),
)(StartPage);