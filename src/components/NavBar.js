
import React from 'react';
import { connect } from 'react-redux';
import { createNumber } from '../store/actions/numberActions'
import { Link } from 'react-router-dom';
// Remove comment below on merge
import SearchBar from './SearchBar'


const NavBar = ({createNumber}) => {
  return(
    <div className='nav-bar'>
      {/* Remove comment below on merge */}
      <SearchBar className='search-bar'/>
      <ul className='nav-bar-list'>
        <li><Link className='nav-bar-list-element-link' to='/'>Start page</Link></li>
        <li><Link className='nav-bar-list-element-link' to='/userProfile'>User profile</Link></li>
        <li><Link className='nav-bar-list-element-link' to='/plantDetails'>Plant Details</Link></li>
      </ul>
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