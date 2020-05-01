import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchPlants, getPlantDetails } from '../api/trefleApiCalls';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SearchBar = ({updateResults}) => {
  const history = useHistory();
  const [searchstring, setSearchstring] = React.useState("")

  function handleSubmit(event) {
    event.preventDefault();
    searchPlants(searchstring).then(results => {

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
        <TextField id="filled" label="Type to search" variant="outlined" onChange={(event) => setSearchstring(event.target.value)}/>
        <Button type="submit" variant="filled" onClick={handleSubmit}>Search</Button>
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
