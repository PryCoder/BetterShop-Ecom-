import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Alert, Button, Typography, Divider } from '@mui/material';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const UserDetails = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!currentUser) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/users/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user details');
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <CircularProgress className="text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="mt-6 text-red-600 bg-purple-100 p-4 rounded-xl shadow-md">
        {error}
      </Alert>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-0 p-5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl shadow-xl">
        
      {userDetails ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8">
             <div className="flex justify-between items-center mb-6">
        <Link to="/home">
          <Button variant="contained" color="primary" className="flex items-center space-x-2 rounded-full">
            <ChevronRightIcon className="transform rotate-180" />
            
          </Button>
        </Link>
      </div>
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-8 mb-10">
            <img
              src={userDetails.profilePicture || '/default-profile.png'}
              alt="User Avatar"
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-purple-500 shadow-xl mb-4 sm:mb-0"
            />
            <div className="text-center sm:text-left">
              <Typography variant="h3" className="font-extrabold text-purple-800">{userDetails.username}</Typography>
              <Typography variant="body1" className="text-gray-600">{userDetails.email}</Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Typography variant="h6" className="text-purple-500">User ID</Typography>
              <Typography variant="body1" className="text-gray-700">{userDetails._id}</Typography>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Typography variant="h6" className="text-purple-500">Admin Status</Typography>
              <Typography variant="body1" className="text-gray-700">{userDetails.isAdmin ? 'Yes' : 'No'}</Typography>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Typography variant="h6" className="text-purple-500">Created At</Typography>
              <Typography variant="body1" className="text-gray-700">{new Date(userDetails.createdAt).toLocaleString()}</Typography>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Typography variant="h6" className="text-purple-500">Updated At</Typography>
              <Typography variant="body1" className="text-gray-700">{new Date(userDetails.updatedAt).toLocaleString()}</Typography>
            </div>
          </div>

          <Divider className="my-10 border-t-2 border-purple-500" />

          <div>
            <Typography variant="h4" className="font-semibold text-purple-800 mb-6">Addresses</Typography>
            {userDetails.addresses && userDetails.addresses.length > 0 ? (
              userDetails.addresses.map((address, index) => (
                <div key={index} className="p-6 mb-6 bg-gray-50 rounded-xl shadow-md">
                  <div className="space-y-2">
                    <Typography variant="body1" className="text-purple-600 font-bold">Street:</Typography>
                    <Typography variant="body2" className="text-gray-700">{address.street}</Typography>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Typography variant="body1" className="text-purple-600 font-bold">City:</Typography>
                    <Typography variant="body2" className="text-gray-700">{address.city}</Typography>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Typography variant="body1" className="text-purple-600 font-bold">State:</Typography>
                    <Typography variant="body2" className="text-gray-700">{address.state}</Typography>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Typography variant="body1" className="text-purple-600 font-bold">Postal Code:</Typography>
                    <Typography variant="body2" className="text-gray-700">{address.postalCode}</Typography>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Typography variant="body1" className="text-purple-600 font-bold">Country:</Typography>
                    <Typography variant="body2" className="text-gray-700">{address.country}</Typography>
                  </div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ChevronRightIcon />}
                    className="mt-4"
                  ><Link to={`/info/`}>
                    Edit Profile</Link>
                  </Button>
                </div>
              ))
            ) : (
              <Alert severity="info" className="bg-purple-50 text-purple-800 p-6 rounded-xl shadow-md">
                No addresses available.
              </Alert>
            )}
          </div>
        </div>
      ) : (
        <Alert severity="info" className="mt-8 p-6 bg-purple-100 text-purple-800 rounded-xl shadow-lg">
          No user details available.
        </Alert>
      )}
    </div>
  );
};

export default UserDetails;
