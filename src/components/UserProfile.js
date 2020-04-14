import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';

// Takes in plantID, fetches information about plant and returns image and name
// const fixPlantDetails = (plantID) => {
//   getPlantDetails(plantID).then(plantDetails => {
//           return (<span className='image-span'>
//             <img src = {plantDetails.imageURL} height='100' />
//             {plantDetails.common_name ?
//               (<span>
//                 <span>
//                   <h4>
//                     {plantDetails.common_name}
//                   </h4>
//                 </span>
//                 <span>
//                   {plantDetails.scientific_name}
//                 </span>
//               </span>)
//             :
//               (<span>
//                 {plantDetails.scientific_name}
//               </span>)
//             }
//           </span>)
//         })
// }

const UserProfile = ({uid, user}) => {

  const history = useHistory();

  if (!uid) {
    history.push("/");
  }



  return (
    <div className='user-profile'>
      <h1>
      Your plants
      </h1>
      <div>
      {user ? user[0].plants.map(plant => {
        return getPlantDetails(JSON.parse(plant).id).then(plantDetails => {
          return (<span className='image-span'>
             <img src={plantDetails.imageURL} height='100' />
             {plantDetails.common_name ?
             (<span> <span> <h4> {plantDetails.common_name} </h4> </span> <span> {plantDetails.scientific_name} </span> </span>)
             : (<span>{plantDetails.scientific_name}</span>)}</span>
          )
        })
        //return fixPlantDetails(JSON.parse(plant).id)
      })
      : "Loading..."}
      </div>
    </div>
  );
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
