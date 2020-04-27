import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/renderPromise'
import { useHistory } from 'react-router-dom';





const StartPage = ({reviews}) => {
  const history = useHistory();

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

  const createTopPlantDisplay = () => {
    return;
  }

  return(
    <div className='start-page'>
      Welcome to Goodseeds
      <div>
        Top rated plants
      </div>
      <div>
        <h2>
        Recently reviewed
        </h2>
          {reviews ? reviews.map(review => {
            return (
              <RenderPromise promise={getPlantDetails(review.plantID)} renderData={({data}) => {return createReviewDisplay(data, review)}}/>
            )
          })
          : null}
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    reviews: state.firestore.ordered.Review
  }
}

export default compose (
  firestoreConnect(() => {
    return [{ collection: 'Review' }];
  }),
  connect(mapStateToProps, null),
)(StartPage);
