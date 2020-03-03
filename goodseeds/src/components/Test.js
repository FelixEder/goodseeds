import React from 'react';
import { connect } from 'react-redux';
import { createNumber } from '../store/actions/numberActions'


const NavBar = ({createNumber}) => {
  return(
    <div>
      <button onClick={() => createNumber(5)}>
          click me
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNumber: (number) => dispatch(createNumber(number))
    }
}


export default connect(null, mapDispatchToProps)(NavBar)