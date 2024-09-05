import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3020/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup'); 
    };

    return (
        <div>
            <Header/>
            <form onSubmit={handleLogin} className='d-flex flex-column gap-3 justify-content-center align-items-center vh-100'>
                <h1 className='text-center'>Login</h1>
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
                <button className='btn btn-primary' type="submit">Login</button>
                <button className='btn btn-link' type="button" onClick={handleSignupRedirect}>Sign Up</button>
            </form>
        </div>
    );
}

export default Login;
