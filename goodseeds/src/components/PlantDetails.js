import React from 'react';
import { connect } from 'react-redux';

const PlantDetails = () => {
  return(
    <div className='plant-details'>
      This is the plant details view
    </div>
  );
}

export default connect(
  null,
  null
)(PlantDetails)