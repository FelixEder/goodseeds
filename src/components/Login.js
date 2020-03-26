import React from 'react';
import { connect } from 'react-redux';

const Login = () => {
    let username;
    let password;
    
    function handleSubmit(event) {
        // TODO: handle login
        event.preventDefault();
        console.log('username: ' + username.value);
        console.log('password: ' + password.value);
    }
    
    return(
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <input placeholder='username' type='text' ref={node => username = node}></input>
                <input placeholder='password' type='password' ref={node => password = node}></input>
                <button type='submit'>Sign in</button>
            </form>        
        </div>
    );
}

export default connect(
  null,
  null
)(Login)