import React from 'react';
import { connect } from 'react-redux';

const SearchResults = () => {
  return(
    <div className='search-results'>
      This is the search results view
    </div>
  );
}

export default connect(
  null,
  null
)(SearchResults)
