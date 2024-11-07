import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Tab, Tabs, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // Detect mobile view

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Settings saved:', profile);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className={`SettingsPage bg-gray-50 min-h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
      {!isMobile && <Sidebar />} {/* Sidebar is hidden on mobile */}
      
      <div style={{ flex: 1, paddingTop: isMobile ? '10px' : '20px' }}>
        <Container maxWidth="sm" style={{ padding: isMobile ? '8px' : '16px' }}> {/* Adjust padding */}
          <Typography variant="h5" className="font-bold text-center text-green-600 mb-4">
            Settings
          </Typography>
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"  // Scrollable for small screens
            scrollButtons="auto"
            centered={!isMobile} // Center on larger screens, left-align on mobile
            className="mb-4"
          >
            <Tab label="General" />
            <Tab label="Account" />
            <Tab label="Notifications" />
            <Tab label="Security" />
            <Tab label="Integrations" />
          </Tabs>

          {/* General Settings Tab */}
          {activeTab === 0 && (
            <div className="bg-white p-3 rounded shadow-md">
              <Typography variant="h6" className="font-bold mb-2">General Settings</Typography>
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid item xs={12}>
                  <TextField label="Language" variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Time Zone" variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Date Format" variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Currency" variant="outlined" fullWidth size="small" />
                </Grid>
              </Grid>
            </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === 1 && (
            <div className="bg-white p-3 rounded shadow-md">
              <Typography variant="h6" className="font-bold mb-2">Account Settings</Typography>
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    value={profile.password}
                    onChange={handleProfileChange}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Button className="mt-4" variant="contained" color="primary" onClick={handleSaveChanges} fullWidth={isMobile}>
                Save Changes
              </Button>
            </div>
          )}

          {/* Notification Settings Tab */}
          {activeTab === 2 && (
            <div className="bg-white p-3 rounded shadow-md">
              <Typography variant="h6" className="font-bold mb-2">Notification Settings</Typography>
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid item xs={12}>
                  <label className="block mb-1">Email Notifications</label>
                  <select className="border rounded w-full p-2">
                    <option>Immediately</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </Grid>
                <Grid item xs={12}>
                  <label className="block mb-1">Push Notifications</label>
                  <select className="border rounded w-full p-2">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </Grid>
              </Grid>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 3 && (
            <div className="bg-white p-3 rounded shadow-md">
              <Typography variant="h6" className="font-bold mb-2">Security Settings</Typography>
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid item xs={12}>
                  <label className="block mb-1">Two-Factor Authentication</label>
                  <select className="border rounded w-full p-2">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </Grid>
                <Grid item xs={12}>
                  <label className="block mb-1">Password Strength</label>
                  <div className="text-green-500">Strong</div>
                </Grid>
              </Grid>
            </div>
          )}

          {/* Integration Settings Tab */}
          {activeTab === 4 && (
            <div className="bg-white p-3 rounded shadow-md">
              <Typography variant="h6" className="font-bold mb-2">Integration Settings</Typography>
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid item xs={12} className="flex justify-between">
                  <span>Google Account</span>
                  <Button variant="outlined" color="secondary" size="small">Disconnect</Button>
                </Grid>
                <Grid item xs={12} className="flex justify-between">
                  <span>Facebook Account</span>
                  <Button variant="outlined" color="secondary" size="small">Disconnect</Button>
                </Grid>
              </Grid>
              <Button className="mt-4" variant="contained" color="primary" fullWidth={isMobile}>
                Add Account
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default SettingsPage;
