import React from 'react';
import { connect } from 'react-redux';

const SearchBar = () => {
  return (
    <div className='search-bar'>
      This is the search bar
    </div>
  )
}

export default connect(
  null,
  null
)(SearchBar)
