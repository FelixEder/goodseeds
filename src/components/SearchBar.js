import React from 'react';
import { connect } from 'react-redux';
import searchPlants from '../api/trefleApiCalls';

const SearchBar = () => {
  let searchInput;

  function handleClick() {
    console.log(searchPlants(searchInput.value));
  }

  return (
    <div className='search-bar'>
      <input placeholder='Type to search' ref={node => searchInput = node} />
      <button onClick={handleClick}>Search</button>
    </div>
  )
}

export default connect(
  null,
  null
)(SearchBar)
