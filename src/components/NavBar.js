import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'

const NavBar = () => {
  return(
    <div className='nav-bar'>
      <SearchBar className='search-bar'/>
      <ul className='nav-bar-list'>
        <li><Link className='nav-bar-list-element-link' to='/'>Start page</Link></li>
        <li><Link className='nav-bar-list-element-link' to='/userProfile'>User profile</Link></li>
      </ul>
    </div>
  );
}

export default connect(
  null,
  null
)(NavBar)