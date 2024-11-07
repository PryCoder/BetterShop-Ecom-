// routes/item.route.js
import express from 'express';
import multer from 'multer';
import {
  
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  searchListings,
  rateListing,


 
} from '../controllers/item.controller.js';

import Listing from '../models/item.model.js'; // Adjust the import path based on your structure



const router = express.Router();
const storage = multer({ dest: 'uploads/' }); // Set up multer to handle file uploads

// Create a listing
const createListing = async (req, res) => {
  const { title, description, price, category, subCategory, specifications } = req.body;

  // Validate required fields
  if (!title || !description || !price || !category || !subCategory) {
    return res.status(400).json({ success: false, message: 'Title, description, price, category, and subCategory are required.' });
  }

  try {
    // Create a new listing instance
    const listing = new Listing({
      title,
      description,
      price,
      category,
      subCategory,
      image: req.file ? req.file.path : '', // Assuming req.file contains the uploaded image path
      specifications: JSON.parse(specifications),
    });

    // Save the listing to the database
    await listing.save();
    res.status(201).json({ success: true, message: 'Listing added successfully!', _id: listing._id });
  } catch (error) {
    console.error('Error adding listing:', error);
    res.status(500).json({ success: false, message: 'Failed to add listing' });
  }
};

// Define the route for adding a listing
router.post('/', storage.single('image'), createListing);
 // Verify token before creating a listing
router.get('/', getListings);                   // Get all listings
router.get('/:id', getListingById);            // Get listing by ID
router.put('/:id',  updateListing); // Verify token before updating a listing
router.delete('/:id',  deleteListing);
router.get('/search', searchListings);
router.post('/:id/rate', rateListing);

export default router;