import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/renderPromise'
const h = React.createElement;

// Takes in plantID, fetches information about plant and returns image and name
const createPlantDisplay = (plant) => {
          return (<span className='image-span'>
            <img src = {plant.images[0].url} height='100' />
            {plant.common_name ?
              (<span>
                <span>
                  <h4>
                    {plant.common_name}
                  </h4>
                </span>
                <span>
                  {plant.scientific_name}
                </span>
              </span>)
            :
              (<span>
                {plant.scientific_name}
              </span>)
            }
            <div>
              <button>
              water
              </button>
            </div>
          </span>)
        }

const UserProfile = ({uid, user}) => {
  const history = useHistory();

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
                    <RenderPromise promise={getPlantDetails(JSON.parse(plant).id)} renderData={({data}) => (<span>{createPlantDisplay(data)}</span>)}/>
                  }
                </span>)
          })}
          </div>
        ) : null
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
