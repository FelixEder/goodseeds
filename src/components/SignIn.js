import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';
import { useHistory } from 'react-router-dom';


const SignIn = ({ signIn, authError }) => {
    let email;
    let password;
    const history = useHistory();
    
    function handleSubmit(event) {
        event.preventDefault();

        // Dispatch signin with values from input field
        signIn({email: email.value, password: password.value})

        // Navigate to user profile
        history.push("/userProfile");
    }
    
    return(
        <div className='signin'>
            <form onSubmit={handleSubmit}>
                <div className='login-field'>
                    <input placeholder='email' type='text' ref={node => email = node}></input>
                </div>
                <div className='login-field'>
                    <input placeholder='password' type='password' ref={node => password = node}></input>
                </div>
                <button type='submit'>Sign in</button>

                {/* If we have an error, dispal error message */}
                <div className='login-message'>
                    { authError ? <p> { authError } </p> : null}
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
        signIn: creds => dispatch(signIn(creds))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)