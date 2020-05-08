import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SearchBar = ({updateResults}) => {
  let searchInput;
  let completeDataInput;
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    if (searchInput.value.length > 0) {
      history.push("/SearchResults/" + searchInput.value + "/" + completeDataInput.checked);
    }
  }

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <input placeholder='Type to search' ref={node => searchInput = node} />
        <button type="submit">Search</button>
        <label htmlFor='completeDataCheckBox'> Complete data </label>
        <input type='checkbox' id='completeDataCheckBox' ref={node => completeDataInput = node} />
      </form>
    </div>
  )
}

export default connect(
  null,
  null
)(SearchBar);
