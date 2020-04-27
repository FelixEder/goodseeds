import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/renderPromise'
import { waterPlant, updateWaterPeriod } from '../store/actions/plantActions';

const UserProfile = ({uid, user, waterPlant, updateWaterPeriod}) => {
  function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }

  function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay);
  }

  const history = useHistory();

  // Takes in plantID, fetches information about plant and returns image and name
  const createPlantDisplay = (genericPlant, userPlant) => {
    let waterPeriodInput;
    let border = {};
    
    if (daysBetween(new Date(userPlant.lastWatered), new Date()) >= userPlant.waterPeriod) {
      border = {border: '3px red solid'};
    }
    
    return (<span className='image-span' style={border}>
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
          Last watered {daysBetween(new Date(userPlant.lastWatered), new Date())} days ago
        </div>
        <div>
          Needs to be watered every {userPlant.waterPeriod} days
        </div>
        <div>
          <button onClick={(() => waterPlant({userID: uid, plantID: userPlant.id}))}>water</button>
        </div>
        <div>
          Change how often this plant needs to be watered:
          <form onSubmit={event => { 
            event.preventDefault(); 
            if (waterPeriodInput.value > 0) { 
              updateWaterPeriod({userID: uid, plantID: userPlant.id, waterPeriod: waterPeriodInput.value}) 
            }
          }}>
            <input placeholder={userPlant.waterPeriod} type='number' ref={node => waterPeriodInput = node} style={{ width: '90%' }} />
            <button>Update</button>
          </form>
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
                <span key={plant}>
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

const mapDispatchToProps = (dispatch) => {
  return {
      waterPlant: waterAction => dispatch(waterPlant(waterAction)),
      updateWaterPeriod: action => dispatch(updateWaterPeriod(action))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (!props.uid) return [];
    return [{ collection: 'Users', doc: props.uid }];
  }),
)(UserProfile);
