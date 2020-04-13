import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const SignUp = ({signUp, authError}) => {
    let email;
    let password;
    let name;
    const history = useHistory();
    
    function handleSubmit(event) {
        event.preventDefault();

        // Dispatch signup action
        signUp({ email: email.value, password: password.value, name: name.value })

        // Navigate to user profile
        history.push("/userProfile");

    }
    
    return(
        <div className='signup'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder='email' type='text' ref={node => email = node}></input>
                </div>
                <div>
                    <input placeholder='password' type='password' ref={node => password = node}></input>
                </div>
                <div>
                    <input placeholder='name' type='text' ref={node => name = node}></input>
                </div>
                <button type='submit'>Sign up</button>

                {/* If we have an error, dispal error message */}
                <div className='signup_message'>
                    { authError ? <p>{ authError } </p> : null}
                </div>
            </form>        
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: newUser => dispatch(signUp(newUser))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)