import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemText, Divider, ListItemIcon, IconButton,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GrainIcon from '@mui/icons-material/Grain';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice'; // Import the signout action

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signoutSuccess());
        navigate('/login'); // Redirect to login page or homepage after signout
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1201,
          display: { xs: 'block', md: 'none' },
          color: 'white',
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(https://wallpapers.com/images/high/japan-farm-anime-landscape-yvqut0t4ra7u0j6l.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'white',
          },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
          <AgricultureIcon style={{ fontSize: '40px', color: 'white' }} />
          <h2 style={{ color: 'white', marginLeft: '8px' }}>SAMS</h2>
        </div>
        <Divider />
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
            { text: 'Farm Overview', icon: <AssessmentIcon />, path: '/farm-overview' },
            { text: 'Weather', icon: <WbSunnyIcon />, path: '/weather' },
            { text: 'Irrigation', icon: <OpacityIcon />, path: '/irrigation' },
            { text: 'Tasks', icon: <CheckCircleIcon />, path: '/tasks' },
            { text: 'Finances', icon: <MonetizationOnIcon />, path: '/finances' },
            { text: 'Crops', icon: <GrainIcon />, path: '/crops' },
            { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
          ].map(({ text, icon, path }) => (
            <ListItem
              button
              component={Link}
              to={path}
              onClick={toggleDrawer}
              key={text}
              sx={{
                backgroundColor: location.pathname === path ? 'rgba(0, 0, 255, 0.5)' : 'transparent',
                '&:hover': {
                  backgroundColor: location.pathname === path ? 'rgba(0, 0, 255, 0.7)' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon style={{ color: 'white' }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ marginY: 2 }} />

        <ListItem button onClick={handleSignout} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <ListItemIcon style={{ color: 'white' }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </Drawer>
    </>
  );
};

export default Sidebar;
