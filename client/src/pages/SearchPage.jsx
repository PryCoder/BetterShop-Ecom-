import React, { useEffect, useState, useCallback } from 'react';
import { Container, TextField, Button, Typography, Grid, Card, CardContent, CircularProgress, Snackbar, Chip, IconButton, CardMedia } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import mobileLogo from './ip.jpg'
import lapLogo from './m9.jpg';
import tabLogo from './s0.jpg';
import accLogo from './a0.jpg';
import cloLogo from './f0.jpg';
import footLogo from './ff.jpg';
import acc2Logo from './aa0.jpg';
import furLogo from './hf.jpg';
import decLogo from './d1.jpg';
import appLogo from './ha.jpg';
import eduLogo from './et.jpg';
import outLogo from './ot.jpg';
import actLogo from './at.jpg';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch listings based on the current query
  const fetchListings = async () => {
    if (!query.trim()) return; // Prevent fetching if query is empty

    setLoading(true);
    setError(''); // Reset error state before fetching
    try {
      const response = await fetch(`/api/listings/?query=${encodeURIComponent(query)}`); // Ensure correct endpoint
      if (!response.ok) throw new Error('Failed to fetch listings');
      const data = await response.json();

      // Set listings only if they match the query
      const filteredListings = data.filter(listing => 
        listing.title.toLowerCase().includes(query.toLowerCase()) || 
        listing.description.toLowerCase().includes(query.toLowerCase())
      );

      setListings(filteredListings); // Update state with filtered listings
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Error fetching listings: ' + error.message);
      setSnackbarOpen(true); // Open snackbar on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch suggestions based on the current query
  const fetchSuggestions = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(`/api/suggestions/?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      setSuggestions(data); // Update state with suggestions
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Debounce the fetchListings function
  const debouncedFetchListings = useCallback(debounce(fetchListings, 300), [query]);
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), [query]);

  useEffect(() => {
    debouncedFetchListings();
    debouncedFetchSuggestions();
    return () => {
      debouncedFetchListings.cancel(); // Cleanup on unmount
      debouncedFetchSuggestions.cancel();
    };
  }, [query, debouncedFetchListings, debouncedFetchSuggestions]);

  const handleSearch = () => {
    fetchListings();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


const subcategoryImages = {
    laptop: lapLogo,
    mobile: mobileLogo,
    tablet: tabLogo,
    accessory: accLogo,
    clothing: cloLogo,
    footwear: footLogo,
    accessories: acc2Logo,
    furniture: furLogo,
    decor: decLogo,
    appliances:appLogo,
    educational: eduLogo,
    outdoor: outLogo,
    action:actLogo,
    
  };

  return (
    <Container className="py-10 px-5">
      <Typography variant="h4" gutterBottom className="text-center font-extrabold mb-6 text-gray-800">
      <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" style={{ marginRight: '8px' }} /> Search Products
      </Typography>
      <div className="mb-4">
        <Autocomplete
          freeSolo
          options={suggestions.map((option) => option.title)}
          onInputChange={(event, value) => setQuery(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    <IconButton onClick={handleSearch} disabled={!query.trim() || loading} color="primary">
                      <SearchIcon />
                    </IconButton>
                  </>
                ),
              }}
            />
          )}
        />
      </div>

      <Grid container spacing={4}>
        {listings.length > 0 ? (
          listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
                <Link to={`/product/${listing._id}`} className="no-underline text-black">
                  <CardContent>
                  <CardMedia
                       component="img"
                       src={subcategoryImages[listing.subCategory?.toLowerCase()] || subcategoryImages.default}
                  alt={`${listing.subCategory || 'default'} image`} 
                      onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.src = 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?cs=srgb&dl=pexels-essow-k-251295-1042143.jpg&fm=jpg'; // Fallback image
                      }} />
                    <Typography variant="h6">{listing.title}</Typography>
                    <Typography variant="body2" className="max-h-16 overflow-hidden text-ellipsis"><span className="whitespace-nowrap">{listing.description}</span></Typography>
                    <Typography variant="h6" className="text-blue-600">₹{listing.price}</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))
        ) : (
          !loading && query.trim() && ( // Show this only if not loading and query is not empty
            <Grid item xs={12}>
              <Typography variant="body1" className="text-center text-gray-500">
                No listings found. Please try a different search.
              </Typography>
            </Grid>
          )
        )}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={<span><ErrorIcon fontSize="small" /> {error}</span>}
        action={
          <IconButton color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Container>
  );
};

export default SearchPage;
