import Listing from '../models/item.model.js';



// Get all listings
export const getListings = async (req, res) => {
  try {
    
    const listings = await Listing.find();
    
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    console.log('Fetched Listing:', listing); // Debugging line
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error); // Additional error logging
    res.status(500).json({ message: error.message });
  }
};





// Update a listing
export const updateListing = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedListing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a listing
export const deleteListing = async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// In your item.controller.js
// controllers/item.controller.js
export const searchListings = async (req, res) => {
  const query = req.query.query;
  console.log('Received query:', query); // Log incoming query

  try {
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const listings = await Listing.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    console.log('Listings found:', listings); // Log found listings
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error); // Log the error
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const rateListing = async (req, res) => {
  try {
      const { id } = req.params; // Get listing ID from URL params
      const { rating } = req.body; // Get rating from the request body

      // Check if ID is valid
      if (!id) {
          return res.status(400).json({ message: 'Listing ID is required' });
      }

      // Check if rating is valid
      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
          return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
      }

      // Fetch the listing from the database
      const listing = await Listing.findById(id);
      if (!listing) {
          return res.status(404).json({ message: 'Listing not found' });
      }

      // Add the new rating to the ratings array
      listing.ratings.push(rating);
      listing.numberOfRatings += 1; // Increment the number of ratings
      listing.starRating = (listing.starRating * (listing.numberOfRatings - 1) + rating) / listing.numberOfRatings; // Update the average star rating

      // Save the updated listing
      await listing.save();
      return res.status(200).json({ message: 'Rating added successfully', listing });
  } catch (error) {
      console.error('Error rating listing:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};
