import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3020/api/create', { name, email, password });
      navigate('/'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSignup} className='d-flex flex-column gap-3 justify-content-center align-items-center vh-100 shadow-lg border-0 border-dark'>
      <h1 className='text-center'>Sign up</h1>
        <div>
          <label>Name:</label>
          <input className='form-control'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input className='form-control'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input className='form-control'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className=' btn btn-primary' type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
