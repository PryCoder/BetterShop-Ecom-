import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Navbar = () => {
  return (
    <AppBar position="fixed" style={{ zIndex: 1200, backgroundColor: '#4caf50' }}>
      <Toolbar>
        {/* SAMS Title with Icon */}
      
        {/* Community Link */}
        <Button color="inherit" component={Link} to="/community" style={{ marginLeft: 'auto' }}>
          Community
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
