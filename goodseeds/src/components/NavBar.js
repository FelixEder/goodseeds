import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return(
    <div className='nav-bar'>
      <Link to="/">Start page</Link>
      <Link to="/userProfile">User profile</Link>
    </div>
  );
}

export default connect(
  null,
  null
)(NavBar)
