import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Divider,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Delete, LocalShipping, CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button }  from '@mui/material';
import { ChevronRightIcon } from '@heroicons/react/solid';
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

const OrderDetails = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to calculate discounted price
  const calculateDiscountedPrice = (price) => {
    const originalPrice = price; // Original price
    const increasedPrice = originalPrice * 1.2; // Increase by 20%
    const discountedPrice = increasedPrice * 0.8; // Decrease by 20%
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice * 100).toFixed(0);

    return {
      originalPrice,
      discountedPrice: discountedPrice.toFixed(2),
      discountPercentage,
    };
  };

  // Fetch user details
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
      console.log('Fetched user details:', data); // Log user details
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to fetch user details.');
    }
  };

  // Fetch order details
  const fetchOrders = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/orders?userId=${currentUser._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }

      const data = await response.json();
      const updatedOrders = data.map(order => ({
        ...order,
        deliveryStatus: getDeliveryStatus(order.createdAt),
        orderStatus: getOrderStatus(order.createdAt),
      }));

      setOrders(updatedOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatus = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdAtDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return diffDays <= 2 ? 'Pending' : 'Completed';
  };

  const getDeliveryStatus = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdAtDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return diffDays <= 2 ? 'In Transit' : 'Delivered';
  };

  useEffect(() => {
    fetchUserDetails();
    fetchOrders();
  }, [currentUser]);

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchOrders(); // Refresh order list
    } catch (error) {
      setError('Failed to delete order');
    }
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
    <div className="max-w-full mx-auto p-6 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="flex justify-between items-center mb-6">
        <Link to="/home">
          <Button variant="contained" color="primary" className="flex text-white items-center space-x-2 rounded-full">
            <ChevronRightIcon className="transform rotate-180" />
            
          </Button>
        </Link>
      </div>
      <h2 className="text-4xl font-extrabold mb-6 text-white text-center border-4 border-white p-4 inline-block rounded-xl">Your Order Details</h2>
      {loading && <CircularProgress className="mx-auto mb-4" />}
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {orders.length === 0 && !loading && !error && (
        <Alert severity="info" className="mb-4">No orders found.</Alert>
      )}

      <Box className="flex flex-col space-y-4">
        {orders.map((order) => {
          const priceDetails = order.listingId ? calculateDiscountedPrice(order.listingId.price) : {};
          const address = userDetails && userDetails.addresses && userDetails.addresses.length > 0 ? userDetails.addresses[0] : null;

          return (
            <Card key={order._id} className="shadow-lg transition-transform transform hover:scale-100 duration-100 rounded-xl bg-white w-full">
              <CardContent>
                <Typography variant="h6" className="text-purple-800 font-bold mb-2">
                  Order ID: {order._id}
                </Typography>
                <Divider className="mb-2" />
                {order.listingId && (
                  <CardMedia
                  component="img"
                  src={subcategoryImages[order.listingId.subCategory?.toLowerCase()] || subcategoryImages.default}
                  alt={`${order.listingId.subCategory || 'default'} image`} 
                  onError={(e) => {
                    e.target.onerror = null; // Prevents looping
                    e.target.src = 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?cs=srgb&dl=pexels-essow-k-251295-1042143.jpg&fm=jpg'; // Fallback image
                  }}
                  sx={{
                    height: '300px',  // Adjust height to your preferred size
                    objectFit: 'contain',  // Ensures the image fits within the container without stretching
                    borderRadius: '10px 10px 0 0',  // Rounded top corners
                    width: '100%',  // Ensures the image takes up full width of the parent container
                  }}
                  />
                )}
                <Typography className="text-gray-800">
                  <strong>Product:</strong> {order.listingId?.title}
                </Typography>
                <Typography className="text-gray-800 font-sans">
                  <strong>Description:</strong> {order.listingId?.description}
                </Typography>
                {/* Render Address Here */}
                {address ? (
                  <div className="mt-4 p-2 bg-gray-100 rounded">
                    <Typography className="text-gray-800 font-bold">Shipping Address:</Typography>
                    <Typography className="text-gray-800">
                      <strong>Street:</strong> {address.street}
                    </Typography>
                    <Typography className="text-gray-800">
                      <strong>City:</strong> {address.city}
                    </Typography>
                    <Typography className="text-gray-800">
                      <strong>State:</strong> {address.state}
                    </Typography>
                    <Typography className="text-gray-800">
                      <strong>Postal Code:</strong> {address.postalCode}
                    </Typography>
                    <Typography className="text-gray-800">
                      <strong>Country:</strong> {address.country}
                    </Typography>
                    <Typography className="text-gray-800">
                      <strong>Phone Number:</strong> {address.phoneNumber}
                    </Typography>
                  </div>
                ) : (
                  <Alert severity="warning" className="mt-4">Address not found.</Alert>
                )}
                <Typography className="text-gray-800">
                  <strong>Original Price:</strong>  ₹ {priceDetails.originalPrice}
                </Typography>
                <Typography className="text-gray-800">
                  <strong>Discounted Price:</strong> <span className='text-green-500'> ₹ {priceDetails.discountedPrice}</span>
                </Typography>
                <Typography className="text-gray-800 ">
                  <strong>Discount Percentage:</strong> <span className='text-red-500'>-{priceDetails.discountPercentage}% off</span>
                </Typography>
                <Typography className="text-gray-800">
                  <strong>Status:</strong>
                  <span className={`font-semibold ${order.orderStatus === 'Pending' ? 'text-yellow-500' : order.orderStatus === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.orderStatus}
                  </span>
                </Typography>
                <Typography className="text-gray-800"><strong>Payment Method:</strong> {order.paymentMethod}</Typography>
                <Typography className="text-gray-800"><strong>Delivery Option:</strong> {order.deliveryOption}</Typography>
                <Typography className="text-gray-800"><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</Typography>
                <Box className="flex items-center mt-2">
                  <Typography className="text-gray-800"><strong>Delivery Status:</strong></Typography>
                  <Box className="ml-2">
                    {order.deliveryStatus === 'In Transit' && <LocalShipping color="primary" />}
                    {order.deliveryStatus === 'Delivered' && <CheckCircle color="success" />}
                  </Box>
                </Box>
                <Box className="flex justify-between mt-4">
                  <Tooltip title="Delete Order" arrow>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteOrder(order._id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default OrderDetails;
