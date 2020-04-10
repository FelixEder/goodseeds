import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

const SearchResults = ({searchResults}) => {

  return(
    <div className='search-results'>
      {searchResults.map(plant => (<span className='image-span'>
        <img src={plant.imageURL} height='100' />
        {plant.common_name ?
          (<span> <span> <h4> {plant.common_name} </h4> </span> <span> {plant.scientific_name} </span> </span>)
        : (<span>{plant.scientific_name}</span>)}</span>))}
    </div>
  );
}

export default connect(
  (state) => ({
    searchResults: state.searchResults
  }),
  null
)(SearchResults);
