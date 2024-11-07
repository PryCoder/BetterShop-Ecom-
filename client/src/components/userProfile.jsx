// UserProfile.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Modal, Box, Typography, Button } from '@mui/material';
import { AccountCircle, ListAlt, AddCircleOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => setOpen((prev) => !prev);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      if (res.ok) {
        dispatch(signoutSuccess());
        navigate('/sign-up');
      } else {
        const data = await res.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="flex items-center focus:outline-none">
        <Avatar
          src={currentUser?.profilePicture || '/default-profile.png'}
          alt={currentUser?.username || 'Guest'}
          sx={{
            width: 48,
            height: 48,
            border: '2px solid #e0e0e0',
            boxShadow: 3,
            '&:hover': {
              cursor: 'pointer',
              boxShadow: 6,
            },
          }}
        />
      </button>

      <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="user-profile-modal"
        aria-describedby="user-profile-description"
      >
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: 24,
            p: 3,
            width: '300px',
            position: 'absolute',
            top: '60px',
            right: '0',
            zIndex: 1000,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={currentUser?.profilePicture || '/default-profile.png'}
              alt={currentUser?.username || 'Guest'}
              sx={{ width: 64, height: 64, border: '3px solid #3f51b5' }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {currentUser.username}
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                User Profile
              </Typography>
            </Box>
          </Box>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Button
              component={Link}
              to="/user-details"
              fullWidth
              variant="text"
              startIcon={<AccountCircle />}
              onClick={handleToggle}
              sx={{
                justifyContent: 'flex-start',
                color: '#3f51b5',
                mb: 1,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              Your Profile
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Button 
              fullWidth
              variant="text"
              startIcon={<ListAlt />}
              onClick={handleToggle}
              sx={{
                justifyContent: 'flex-start',
                color: '#3f51b5',
                mb: 1,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            ><Link to={`/orders`}>
              Order Details
           </Link> </Button>
          </motion.div>

          {/* Conditionally render the Add Listing button for admins */}
          {currentUser.isAdmin && (
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Button  component={Link} to="/add-listing"
                fullWidth
                variant="text"
                startIcon={<AddCircleOutline />}
                onClick={handleToggle}
                sx={{
                  justifyContent: 'flex-start',
                  color: '#3f51b5',
                  mb: 1,
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                Add Listing
              </Button>
            </motion.div>
          )}

        

          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Button
              fullWidth
              variant="text"
              onClick={handleSignout}
              sx={{
                justifyContent: 'flex-start',
                color: 'red',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              Sign Out
            </Button>
          </motion.div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfile;
