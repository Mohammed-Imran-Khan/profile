import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    // State to store the fetched employee data
    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        password: "",
        profilePicture: "",
        tenthCertificate: "",
        twelfthCertificate: "",
        ugCertificate: "",
    });

    // State to store the form input
    const [formInput, setFormInput] = useState({
        name: "",
        email: "",
        password: "",
        profilePicture: null,
        tenthCertificate: null,
        twelfthCertificate: null,
        ugCertificate: null,
    });

    const navigate = useNavigate(); // Hook for navigation

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    // Function to fetch employee data
    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get('http://localhost:3020/api/getemployee', { headers });
            const { name, email, password, profilePicture, tenthCertificate, twelfthCertificate, ugCertificate } = response.data;
            setEmployeeData({
                name,
                email,
                password,
                profilePicture: profilePicture ? `http://localhost:3020/${profilePicture}` : "",
                tenthCertificate: tenthCertificate ? `http://localhost:3020/${tenthCertificate}` : "",
                twelfthCertificate: twelfthCertificate ? `http://localhost:3020/${twelfthCertificate}` : "",
                ugCertificate: ugCertificate ? `http://localhost:3020/${ugCertificate}` : ""
            });
        } catch (err) {
            console.error("Error fetching employee data:", err);
        }
    };

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    // Update form input when employee data changes
    useEffect(() => {
        setFormInput({
            name: employeeData.name,
            email: employeeData.email,
            password: employeeData.password,
            profilePicture: null,
            tenthCertificate: null,
            twelfthCertificate: null,
            ugCertificate: null,
        });
    }, [employeeData]);

    const handleInputChange = (field_name, value) => {
        setFormInput({
            ...formInput,
            [field_name]: value
        });
    };

    const handleFileChange = (event, field_name) => {
        setFormInput({
            ...formInput,
            [field_name]: event.target.files[0] // Store the selected file for the specific field
        });
    };

    const handleBtnClick = async () => {
        const formData = new FormData();
        formData.append("name", formInput.name);
        formData.append("email", formInput.email);
        formData.append("password", formInput.password);

        // Append files only if they are selected
        if (formInput.profilePicture) {
            formData.append("profilePicture", formInput.profilePicture);
        }
        if (formInput.tenthCertificate) {
            formData.append("tenthCertificate", formInput.tenthCertificate);
        }
        if (formInput.twelfthCertificate) {
            formData.append("twelfthCertificate", formInput.twelfthCertificate);
        }
        if (formInput.ugCertificate) {
            formData.append("ugCertificate", formInput.ugCertificate);
        }

        try {
            await axios.post('http://localhost:3020/api/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...headers,
                }
            });
            // Refetch employee data to display the updated information
            fetchEmployeeData();
        } catch (err) {
            console.log(err);
        }
    };

    // Function to navigate back to the Dashboard
    const goBackToDashboard = () => {
        navigate('/dashboard');
    };

return (
        <div className="container mt-4">
            {/* Back Button */}
            <button className="btn btn-dark btn-sm mb-3" onClick={goBackToDashboard}>Back</button>
            
            <div className="row">
                {/* Profile Information (Left Side) */}
                <div className="col-md-6">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-md-6">
                                <h5 className="card-title">Profile Information</h5>
                            <hr />
                            <div className="mb-3">
                                <h6>Profile Picture:</h6>
                                {employeeData.profilePicture ? (
                                    <img src={employeeData.profilePicture} alt="Profile" className="img-thumbnail rounded-circle" style={{ width: '100px', height: '100px' }} />
                                ) : (
                                    <p>No profile picture available</p>
                                )}
                            </div>
                                </div>
                                <div className="col-md-6 d-flex flex-column justify-content-center align-items-start">
                                <div className="mb-3">
                                <h6>Name:</h6>
                                <p>{employeeData.name}</p>
                            </div>
                            <div className="mb-3">
                                <h6>Email:</h6>
                                <p>{employeeData.email}</p>
                            </div>
                            <div className="mb-3">
                                <h6>Password:</h6>
                                <p>{employeeData.password ? '********' : 'No password set'}</p>
                            </div>
                                </div>
                            </div>
                            <hr />
                            
                          
                            <h5 className="mt-4">Certificates:</h5>
<hr />
<div className="row">
  {/* Tenth Marksheet */}
  <div className="col-md-4 mb-3">
    <h6>Tenth Marksheet:</h6>
    {employeeData.tenthCertificate ? (
      <img
        src={employeeData.tenthCertificate}
        alt="10th Certificate"
        className="img-thumbnail"
        style={{ width: '100px', height: '100px' }}
      />
    ) : (
      <p>No 10th marksheet available</p>
    )}
  </div>

  {/* Twelfth Marksheet */}
  <div className="col-md-4 mb-3">
    <h6>Twelfth Marksheet:</h6>
    {employeeData.twelfthCertificate ? (
      <img
        src={employeeData.twelfthCertificate}
        alt="12th Certificate"
        className="img-thumbnail"
        style={{ width: '100px', height: '100px' }}
      />
    ) : (
      <p>No 12th marksheet available</p>
    )}
  </div>

  {/* UG Marksheet */}
  <div className="col-md-4 mb-3">
    <h6>UG Marksheet:</h6>
    {employeeData.ugCertificate ? (
      <img
        src={employeeData.ugCertificate}
        alt="UG Certificate"
        className="img-thumbnail"
        style={{ width: '100px', height: '100px' }}
      />
    ) : (
      <p>No UG marksheet available</p>
    )}
  </div>
</div>

                        </div>
                    </div>
                </div>

                {/* Update Form (Right Side) */}
                <div className="col-md-6">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Update Profile</h5>
                            <hr />
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formInput.name}
                                    name="name"
                                    onChange={({ target }) => handleInputChange(target.name, target.value)}
                                    placeholder="Enter name"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formInput.email}
                                    name="email"
                                    onChange={({ target }) => handleInputChange(target.name, target.value)}
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={formInput.password}
                                    name="password"
                                    onChange={({ target }) => handleInputChange(target.name, target.value)}
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="mb-3">
                                <h6>Profile Picture:</h6>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="profilePicture"
                                    onChange={(e) => handleFileChange(e, 'profilePicture')}
                                />
                            </div>
                            <div className="mb-3">
                                <h6>Tenth Marksheet:</h6>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="tenthCertificate"
                                    onChange={(e) => handleFileChange(e, 'tenthCertificate')}
                                />
                            </div>
                            <div className="mb-3">
                                <h6>Twelfth Marksheet:</h6>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="twelfthCertificate"
                                    onChange={(e) => handleFileChange(e, 'twelfthCertificate')}
                                />
                            </div>
                            <div className="mb-3">
                                <h6>UG Marksheet:</h6>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="ugCertificate"
                                    onChange={(e) => handleFileChange(e, 'ugCertificate')}
                                />
                            </div>
                            <button className="btn btn-primary btn-block" onClick={handleBtnClick}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
