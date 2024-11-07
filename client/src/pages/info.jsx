// Farminfo.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Info = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    addresses: [{
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
    }],
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      navigate('/sign-up');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${currentUser._id}`);
        if (!response.ok) throw new Error('Failed to fetch user details');
        const data = await response.json();

        const addresses = data.addresses && Array.isArray(data.addresses) && data.addresses.length > 0
          ? data.addresses
          : [{
              street: '',
              city: '',
              state: '',
              postalCode: '',
              country: '',
              phoneNumber: '',
            }];

        setUserDetails({
          username: data.username || '',
          email: data.email || '',
          addresses,
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
        setSnackbarMessage('Failed to fetch user details.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [currentUser, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address')) {
      const index = parseInt(name.split('_')[2], 10);
      const fieldName = name.split('_')[1];
      setUserDetails((prevDetails) => {
        const addresses = [...prevDetails.addresses];
        addresses[index] = { ...addresses[index], [fieldName]: value };
        return { ...prevDetails, addresses };
      });
    } else {
      setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) throw new Error('Failed to update user details');
      const data = await response.json();
      setUserDetails(data);
      setSnackbarMessage('User details updated successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error saving user details:', error);
      setSnackbarMessage('Error saving user details.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setIsEditing(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><CircularProgress /></div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-5">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">User Info</h1>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
          />
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Addresses</h2>
        {userDetails.addresses.map((address, index) => (
          <div key={index} className="mb-6 p-6 border rounded-lg bg-gray-50 shadow-md transition transform hover:scale-105">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Street</label>
              <input
                type="text"
                name={`address_street_${index}`}
                value={address.street}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">City</label>
              <input
                type="text"
                name={`address_city_${index}`}
                value={address.city}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">State</label>
              <input
                type="text"
                name={`address_state_${index}`}
                value={address.state}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Postal Code</label>
              <input
                type="text"
                name={`address_postalCode_${index}`}
                value={address.postalCode}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Country</label>
              <input
                type="text"
                name={`address_country_${index}`}
                value={address.country}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                type="text"
                name={`address_phoneNumber_${index}`}
                value={address.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-2 block w-full p-3 border rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'border-blue-300' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
            ><Link to={`/home`}>
              Save</Link>
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Info;
