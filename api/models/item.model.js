import mongoose from 'mongoose';

// Specific schemas for different categories
const fashionSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  material: { type: String },
  careInstructions: { type: String },
  image: { 
    type: String, 
    default: 'https://www.example.com/default-fashion-image.png' // Default image URL for fashion
  },
}, { _id: false }); // Prevents creation of separate IDs for subdocuments

const homeSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  dimensions: { type: String },
  material: { type: String },
  weight: { type: String },
  features: { type: String },
  image: { 
    type: String, 
    default: 'https://www.example.com/default-home-image.png' // Default image URL for home
  },
}, { _id: false });

const toysSchema = new mongoose.Schema({
  ageGroup: { type: String, required: true },
  material: { type: String },
  safetyRating: { type: String },
  features: { type: String },
  image: { 
    type: String, 
    default: 'https://www.example.com/default-toys-image.png' // Default image URL for toys
  },
}, { _id: false });

const electronicsSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  warranty: { type: String },
  batteryLife: { type: String },
  weight: { type: String },
  dimensions: { type: String },
  connectivity: { type: String },
  image: { 
    type: String, 
    default: 'https://www.example.com/default-electronics-image.png' // Default image URL for electronics
  },
}, { _id: false });

// Main listing schema
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  image: { 
    type: String, 
    required: true, 
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fproduct%2F&psig=AOvVaw2GOmCa-lBdL9aQ-W9P4tTN&ust=1730908521613000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj_yO_GxYkDFQAAAAAdAAAAABAE' // Default image URL for listing
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed, // Store different specifications based on category
  }, starRating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  ratings: { type: [Number], default: [] },
}, { timestamps: true });

export default mongoose.model('Listing', listingSchema);
