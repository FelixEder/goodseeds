import React from 'react';
import { connect } from 'react-redux';

const UserProfile = () => {
  return(
    <div className='user-profile'>
      This is the user profile
    </div>
  );
}

export default connect(
  null,
  null
)(UserProfile)