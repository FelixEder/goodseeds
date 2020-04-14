import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserProfile = ({auth}) => {
  const history = useHistory();

  if (!auth.uid) {
    history.push("/");
  }

  return(
    <div className='user-profile'>
      This is the user profile
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(
  mapStateToProps,
  null
)(UserProfile)
