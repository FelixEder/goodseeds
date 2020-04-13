
import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authActions'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'


const NavBar = ({signOut, isEmpty}) => {
  return(
    <div className='nav-bar'>

      <SearchBar className='search-bar'/>
      <ul className='nav-bar-list'>
        <li><Link className='nav-bar-list-element-link' to='/'>Start page</Link></li>

        {
          !isEmpty ?
            <span>
              <li><Link className='nav-bar-list-element-link' to='/userProfile'>User profile</Link></li>
              <li><Link className='nav-bar-list-element-link' onClick={signOut} to='/'>Sign Out</Link></li>
            </span>
          : 
          <span>
            <li><Link className='nav-bar-list-element-link' to='/login'>Sign In</Link></li>
            <li><Link className='nav-bar-list-element-link' to='/signup'>Sign Up</Link></li>
          </span>
        }

      </ul>

    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) => {
  return {
    isEmpty: state.firebase.auth.isEmpty
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)