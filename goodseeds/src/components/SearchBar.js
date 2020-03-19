import React from 'react';
import { connect } from 'react-redux';

const SearchBar = () => {
  return (
    <div className='search-bar'>
      <input placeholder='Type to search'/>
      <button>Search</button>
    </div>
  )
}

export default connect(
  null,
  null
)(SearchBar)