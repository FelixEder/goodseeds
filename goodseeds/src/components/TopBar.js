import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import NavBar from './NavBar';

const TopBar = () => {
  return(
    <div className='top-bar'>
      <SearchBar />
      <NavBar />
    </div>
  );
}

export default connect(
  null,
  null
)(TopBar)
