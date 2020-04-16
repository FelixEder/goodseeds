import React, {useState} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {useParams} from 'react-router-dom';
import {getPlantDetails} from '../api/trefleApiCalls';

const PlantDetails = ({reviews}) => {
  let {id} = useParams();
  console.log(id);

  const [plantDetails, setPlantDetails] = useState(null);

  getPlantDetails(id).then(details => {
    setPlantDetails(details);
  })

  return (<div className='plant-details'>
    <span className='plant-image'>
      <img src={plantDetails
          ? plantDetails.images[0]
          : null} height='500'/> {
        plantDetails
          ? plantDetails.scientific_name
          : null
      }
    </span>

    {/* Reviews */}
    {
      reviews
        ? <div className='plant-reviews'>
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
          </div>
        : null
    }

  </div>);
}

const mapStateToProps = (state) => {
  return {reviews: state.firestore.ordered.Review}
}

export default compose(firestoreConnect(() => [
  {
    collection: 'Review'
  }
]), connect(mapStateToProps, null))(PlantDetails)
