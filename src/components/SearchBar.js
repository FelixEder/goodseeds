import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SearchBar = ({updateResults}) => {
  let searchInput;
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    history.push("/SearchResults/" + searchInput.value);
  }

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <input placeholder='Type to search' ref={node => searchInput = node} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  null
)(SearchBar);
