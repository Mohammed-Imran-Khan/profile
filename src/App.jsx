import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import About from './components/About.jsx';
import Secure from './components/Secure.jsx';
import Home from './components/Home.jsx';
import Readme from './components/Readme.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header.jsx';
import Profile from './components/Profile.jsx';


function App() {
  return (
    <>
    <div>
      
    </div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <Secure>
              <Dashboard />
            </Secure>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <Secure>
              <Profile/>
            </Secure>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Secure>
              <About />
            </Secure>
          } 
        />
        <Route 
          path="/home" 
          element={
            <Secure>
              <Home />
            </Secure>
          } 
        />
        <Route 
          path="/readme" 
          element={
            <Secure>
              <Readme />
            </Secure>
          } 
        />
      </Routes>
    </Router>
    </>
   
  );
}

export default App;
