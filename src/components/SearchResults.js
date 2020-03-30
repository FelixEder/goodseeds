import React from 'react';
import { connect } from 'react-redux';

const SearchResults = ({searchResults}) => {
  return(
    <div className='search-results'>
      This is the search results view
      <ul>
        {searchResults.map(plant => (<li>{plant.scientific_name}</li>))}
      </ul>
    </div>
  );
}

export default connect(
  (state) => ({
    searchResults: state.searchResults
  }),
  null
)(SearchResults);
