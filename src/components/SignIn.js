import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions'

const SignIn = ({ signIn, authError }) => {
    let email;
    let password;
    
    function handleSubmit(event) {
        event.preventDefault();
        // Dispatch signin with values from input field
        signIn({email: email.value, password: password.value})
    }
    
    return(
        <div className='signin'>
            <form onSubmit={handleSubmit}>
                <div className='login_field'>
                    <input placeholder='email' type='text' ref={node => email = node}></input>
                </div>
                <div className='login_field'>
                    <input placeholder='password' type='password' ref={node => password = node}></input>
                </div>
                <button type='submit'>Sign in</button>

                {/* If we have an error, dispal error message */}
                <div className='login_message'>
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