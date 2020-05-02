import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { useParams } from 'react-router-dom';
import { searchPlants, getPlantDetails } from '../api/trefleApiCalls';

const SearchResults = () => {
  let { searchString } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  searchPlants(searchString).then(results => {
    const getImages = results.map(async (plant) => {
      await getPlantDetails(plant.id).then(details => {
        plant.imageURL = details.images.length > 0 ? details.images[0].url : null;
      })
    });

    Promise.all(getImages)
    .then(setSearchResults(results))
  });

  return(
    <div className='search-results'>
      {searchResults.length > 0
        ?
        searchResults.map(plant => (<span className='image-span' onClick={() => { history.push("/plantDetails/" + plant.id) }}>
        <img src={plant.imageURL} height='100' />
        {plant.common_name ?
          (<span> <span> <h4> {plant.common_name} </h4> </span> <span> {plant.scientific_name} </span> </span>)
        : (<span>{plant.scientific_name}</span>)}</span>))
        :
        "No results found for search \"" + searchString + "\""}
    </div>
  );
}

export default connect(
  null,
  null
)(SearchResults);
