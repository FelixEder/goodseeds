import React from 'react';
import { connect } from 'react-redux';

const StartPage = () => {
  return(
    <div className='start-page'>
      Welcome to Goodseeds
    </div>
  );
}

export default connect(
  null,
  null
)(StartPage)