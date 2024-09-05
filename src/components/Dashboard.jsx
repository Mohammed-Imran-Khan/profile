import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
// import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token and redirect if not authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleHome = () => {
    navigate('/home');
  };

  const handleReadme = () => {
    navigate('/readme');
  };
  const handleabout = () => {
    navigate('/about');
  };
  


  return (
    <div>
      <Header />
      <h2>Dashboard</h2>
      <p>"A dashboard is an interactive interface that provides users with real-time data and insights, </p>
      <p> presented in a visually intuitive way. It allows users to monitor key metrics, track progress,</p>
      <p> and make informed decisions quickly. Dashboards are essential tools for managing and analyzing data,</p>
      <p> making them invaluable for both individuals and organizations looking to optimize performance and efficiency."</p>
    </div>
  );
}

export default Dashboard;
