import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchPlants, getPlantDetails } from '../api/trefleApiCalls';

const SearchBar = ({updateResults}) => {
  let searchInput;
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    searchPlants(searchInput.value).then(results => {

      const getImages = results.map(async (plant) => {
        await getPlantDetails(plant.id).then(details => {
          plant.imageURL = details.images.length > 0 ? details.images[0].url : null;
        })
      });

      Promise.all(getImages)
      .then(() => { updateResults(results) })
    });
    history.push("/SearchResults");
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

const updateResults = (results) => ({type: "UPDATE", results: results});

export default connect(
  null,
  (dispatch) => ({
      updateResults: (results) => dispatch(updateResults(results))
  })
)(SearchBar);
