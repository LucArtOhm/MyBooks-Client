import React, { useState } from 'react';
import propTypes from 'prop-types';

//user registration form taking necessary user details
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  /*   const handleRegistration = (e) => {
      e.preventDefault();
      console.log(username, password, email, birthday);
      props.onRegistration(username);
    }; */

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={(e) => console.log('Submit Form')}>Submit</button>
      <button onClick={(e) => props.clickHandler(e)}>Go to Sign In</button>

    </form>
  );
}

RegistrationView.propTypes = {
  register: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.number.isRequired,
  }),
  onRegistration: propTypes.func.isRequired,
};