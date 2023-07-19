import { useState } from 'react';

const Login = ({ handleLogin, updateLoginFormData, loginData, setLoginData  }) => {
 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the handleLogin function passed as a prop from App.js
    handleLogin(loginData.username)

    setLoginData({ username: '', 
                    password: '' 
                });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name='username'  onChange={updateLoginFormData} />
        <input type="password" name='password' onChange={updateLoginFormData} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;