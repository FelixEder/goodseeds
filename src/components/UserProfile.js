import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/renderPromise'

const UserProfile = ({uid, user}) => {

  const history = useHistory();

  // Takes in plantID, fetches information about plant and returns image and name
  const createPlantDisplay = (genericPlant, userPlant) => {
    return (<span className='image-span'>
    <img src = {genericPlant.images[0].url} height='100' onClick={() => {history.push("/plantDetails/" + genericPlant.id)}}/>
    {genericPlant.common_name ?
      (<span>
        <span>
          <br/>
          <b>
            {genericPlant.common_name}
          </b>
        </span>
        <span>
          <br/>
          <i>{genericPlant.scientific_name}</i>
        </span>
      </span>)
        :
        (<span>
          {genericPlant.scientific_name}
          </span>)
        }
        <div>
          Last watered {userPlant.daysSinceWatered} days ago 
        </div>
        <div>
          <button>water</button>
        </div>
        </span>)
  }

  // If no user is logged in, return to start page
  if (!uid) {
    history.push("/");
  }

  return (
    <div className='user-profile'>
      <h1>
      Your garden
      </h1>
      {
        // If user has loaded, retrieve all plants and create plant display for each
        user ? (
          <div>
          {user[0].plants.map(plant => {
            return (
                <span>
                  {
                    // Call RenderPromise, and then render the data
                    <RenderPromise promise={getPlantDetails(JSON.parse(plant).id)} renderData={({data}) => (<span>{createPlantDisplay(data, JSON.parse(plant))}</span>)}/>
                  }
                </span>)
          })}
          </div>
        ) : (<div>Loading...</div>)
      }
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    user: state.firestore.ordered.Users
  }
}

export default compose (
  connect(mapStateToProps, null),
  firestoreConnect(props => {
    if (!props.uid) return [];

    return [{ collection: 'Users', doc: props.uid }];
  }),
)(UserProfile);
