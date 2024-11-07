import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { motion } from 'framer-motion';

import Lottie from 'lottie-react';
import electronicsAnimation from '../redux/user/lap.json';
import fashionAnimation from '../redux/user/fas.json';
import homeAppliancesAnimation from '../redux/user/app.json';
import accessoriesAnimation from '../redux/user/acc.json';
import UserProfile from '../components/userProfile';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ofecImage from './ec3.png';
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




const CarouselItem = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
  >
    <Paper elevation={3}>
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: '100%',
          height: '400px',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      <Typography
        variant="h4"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        {item.title}
      </Typography>
    </Paper>
  </motion.div>
);

// Function to calculate the adjusted price for discount display
const calculateDiscountedPrice = (price) => {
  const originalPrice = price; // Original price
  const increasedPrice = originalPrice * 1.2; // Increase by 20%
  const discountedPrice = increasedPrice * 0.8; // Decrease by 20%
  const discountPercentage = ((originalPrice - discountedPrice) / originalPrice * 100).toFixed(0);
  return { discountedPrice: discountedPrice.toFixed(2), discountPercentage };
};

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [listings, setListings] = useState({ electronics: [], fashion: [], home: [], toys: [] });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-up');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        if (!response.ok) throw new Error('Failed to fetch listings');
        const data = await response.json();
        setProduct(data);
        const categorizedListings = data.reduce((acc, item) => {
          const category = item.category.toLowerCase();
          if (acc[category]) {
            acc[category].push(item);
          }
          return acc;
        }, { electronics: [], fashion: [], home: [], toys: [] });

        setListings(categorizedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const DrawerComponent = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/electronics">
            <ListItemText primary="Electronics" />
          </ListItem>
          <ListItem button component={Link} to="/fashion">
            <ListItemText primary="Fashion" />
          </ListItem>
          <ListItem button component={Link} to="/home-appliances">
            <ListItemText primary="Home Appliances" />
          </ListItem>
          <ListItem button component={Link} to="/accessories">
            <ListItemText primary="Accessories" />
          </ListItem>
          <ListItem button component={Link} to="/cart">
            <ListItemText primary="Cart" />
          </ListItem>
          <ListItem button component={Link} to="/login">
            <ListItemText primary={currentUser ? `Hello, ${currentUser.username}` : 'Login'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6',
      title: 'Unbeatable Deals on Electronics & Fashion',
    },
    {
      image: 'https://i.pinimg.com/736x/3c/fd/ad/3cfdad9be78e5be92f03d86897a01836.jpg',
      title: 'Discover the Latest Trends in Fashion',
    },
    {
      image: 'https://www.gizmochina.com/wp-content/uploads/2021/10/macbook-pro-2021-renders.jpg',
      title: 'Upgrade Your Tech with Our Top Picks',
    },
  ];

  const handleSearchClick = () => {
    navigate('/search'); // Navigate to the search page
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
  
  const subcategoryImage = (product && product.subCategory) 
  ? subcategoryImages[product.subCategory.toLowerCase()] || '/images/subcategories/default.jpg' 
  : '/images/subcategories/default.jpg';

  
  return (
    <div className="Home" style={{ backgroundColor: '#f0f0f0', paddingBottom: '20px' }}>
 <AppBar
  position="static"
  sx={{
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: { xs: '5px 0', sm: '8px 0' }, // Reduced padding for smaller screens
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  <Toolbar
    sx={{
      display: 'flex',
      justifyContent: 'space-between', // Distributes space between logo and buttons
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    }}
  >
    {/* Left side (Logo) */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      
      <img
        src="https://www.freeiconspng.com/uploads/shopping-cart-icon-19.png"
        alt="BetterShop Logo"
        style={{
          height: '30px', // Reduced logo size for smaller screens
          marginRight: '5px',
        }}
        sx={{
          height: { xs: '25px', sm: '50px' }, // Adjust logo size for small screens
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#232f3e',
          textAlign: 'left',
          display: { xs: 'block', sm: 'inline-block' },
          fontSize: { xs: '0.9rem', sm: '1.5rem' }, // Reduced font size for smaller screens
        }}
      >
        BetterShop
      </Typography>
    </div>

    {/* Right side (Cart and UserProfile buttons) */}
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
      }}
    >
      {/* Search button */}
      <IconButton
  sx={{
    mr: 1, // Adjust margin for better spacing
    backgroundColor: (theme) => theme.palette.grey[200],
    display: { xs: 'inline-block', sm: 'inline-block' }, // Show on both small and large screens
    borderRadius: '50%', // This makes the background fully circular
    width: '40px', // Set width to make it circular
    height: '40px', // Set height to make it circular
    padding: 0, // Remove any internal padding to ensure it's perfectly circular
  }}
  onClick={handleSearchClick}
>
  <SearchIcon sx={{ color: '#232f3e', fontSize: '1.3rem' }} /> {/* Reduced icon size */}
</IconButton>


      {/* Cart button */}
      <Button
        color="primary"
        component={Link}
        to="/orders"
        sx={{
          fontWeight: 'bold',
          bgcolor: '#232f3e',
          color: '#fff',
          '&:hover': { bgcolor: '#1e2a3a' },
          borderRadius: '20px',
          px: 1,
          marginBottom: { xs: '5px', sm: '0' },
          fontSize: { xs: '0.7rem', sm: '1rem' }, // Smaller font size for mobile
          padding: { xs: '6px 8px', sm: '8px 16px' }, // Adjust padding for smaller screens
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: '1rem' }} /> {/* Adjust cart icon size */}
        Cart
      </Button>

      {/* User Profile button */}
      <Button
        color="primary"
        className="font-bold bg-gray-800 text-white hover:bg-gray-700 rounded-lg px-4 py-2"
        sx={{
          marginBottom: { xs: '5px', sm: '0' },
          fontSize: { xs: '0.7rem', sm: '1rem' }, // Smaller font size for mobile
          padding: { xs: '6px 8px', sm: '8px 16px' }, // Adjust padding for smaller screens
        }}
      >
        <UserProfile sx={{ fontSize: '1rem' }} /> {/* Adjust profile icon size */}
      </Button>
    </div>
  </Toolbar>
</AppBar>




      <DrawerComponent />

      <Carousel autoPlay interval={3000} indicators={false} navButtonsAlwaysVisible>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Carousel>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
      <Typography
  variant="h3"
  gutterBottom
  align="center"
  sx={{
    background: 'linear-gradient(90deg, #FF7A18, #AF002D 70%)', // Gradient colors
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    fontWeight: 'bold', // Increase font weight
  }}
>
  Explore by Category
</Typography>

</Box>


<Grid 
  container 
  spacing={2} 
  justifyContent="center" 
  sx={{
    flexWrap: { xs: 'wrap', sm: 'nowrap' }, // Wrap on mobile, stay in one line on larger screens
    overflowX: 'auto', // Enable horizontal scroll if needed
    whiteSpace: 'nowrap', // Ensure items don't break to the next line unintentionally
  }}
>
  {[{
    animation: electronicsAnimation,
    label: 'Electronics',
    link: '/electronics',
  }, {
    animation: fashionAnimation,
    label: 'Fashion',
    link: '/fashion',
  }, {
    animation: homeAppliancesAnimation,
    label: 'Home Appliances',
    link: '/home-appliances',
  }, {
    animation: accessoriesAnimation,
    label: 'Accessories',
    link: '/accessories',
  }].map((item, index) => (
    <Grid 
      item 
      xs={12} 
      sm={6} 
      md={3} 
      key={index} 
      sx={{ 
        textAlign: 'center', 
        display: 'inline-block', // Ensures items are inline
        maxWidth: '150px', // Limits the width for uniformity
      }}
    >
      <div style={{ maxWidth: '150px', margin: '0 auto' }}> {/* Keeps a uniform size */}
        <Lottie
          animationData={item.animation}
          loop={true}
          style={{ height: '150px', width: '150px' }}
        />
      </div>
      <Chip
        label={item.label}
        component={Link}
        to={item.link}
        sx={{
          bgcolor: '#e0f7fa', 
          color: 'linear-gradient(90deg, #1e90ff, #00bfff)',
          fontWeight: 'bold',
          border: 'none',
          padding: '10px',
          '& .MuiChip-label': {
            background: 'linear-gradient(90deg, #1e90ff, #00bfff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          },
          '&:hover': {
            bgcolor: '#b2ebf2',
          },
        }}
      />
    </Grid>
  ))}
</Grid>


      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  {Object.entries(listings).map(([category, products]) => (
    products.length > 0 && (
      <div key={category}>
        <Divider sx={{ my: 3 }} />
        <div className="bg-gradient-to-r from-purple-400 to-purple-900 bg-clip-text text-transparent font-extrabold text-5xl ">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            {category.charAt(0).toUpperCase() + category.slice(1)} Listings
          </Typography>
        </div>
        <Grid container spacing={4}>
          {products.slice(0, 3).map((product, index) => { // Slice the first 3 products
            // Calculate discounted price and discount percentage
            const { discountedPrice, discountPercentage } = calculateDiscountedPrice(product.price);

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    sx={{ height: '100%', boxShadow: 5, borderRadius: '10px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }} 
                  >
                    <CardMedia
                       component="img"
                       src={subcategoryImages[product.subCategory?.toLowerCase()] || subcategoryImages.default}
                  alt={`${product.subCategory || 'default'} image`} 
                      onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.src = 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?cs=srgb&dl=pexels-essow-k-251295-1042143.jpg&fm=jpg'; // Fallback image
                      }}
                      sx={{
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '10px 10px 0 0',
                      }}
                    />
                    <CardContent>
                      <Link to={`/product/${product._id}`}>
                        <div className="max-h-16 overflow-hidden text-ellipsis">
                          <span className="whitespace-nowrap"> 
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                              {product.title}
                            </Typography>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                            ₹{product.price.toFixed(2)} {/* Original Price */}
                          </Typography>
                          <Typography variant="h5" color="primary">
                            ₹{discountedPrice} {/* Adjusted Price */}
                          </Typography>
                          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-2 rounded-sm">
                            <Typography variant="body2" className="text-white">
                              Save {discountPercentage}% {/* Discount Percentage */}
                            </Typography>
                          </div>
                        </div>
                        <div className="max-h-16 overflow-hidden text-ellipsis">
                          <span className="whitespace-nowrap">
                            <Typography variant="body2" color="text.secondary">
                              {product.description}
                            </Typography>
                          </span>
                        </div>
                        <div className="flex justify-center mb-2">
                          <img src={ofecImage} alt="Product Thumbnail" className="h-10 w-10 object-cover mr-60" />
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    )
  ))}
</Container>

    </div>
  );
};

export default Home;
