import React from 'react';
import './Login.css';

function Login({loginHandler}) {

    return (
        <div className = 'login'>
            <div className = 'login__container'>
                <button onClick = {loginHandler}>LogIn with Google</button>
            </div>
        </div>
    )
}

export default Login
