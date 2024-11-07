import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('electronics');
  const [subCategory, setSubCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [specifications, setSpecifications] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory('');
    setSpecifications({});
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('specifications', JSON.stringify(specifications));
    if (image) formData.append('image', image);

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add listing');
      }
      const data = await response.json();
      console.log('Listing added:', data);
      navigate(`/product/${data._id}`);
    } catch (error) {
      console.error('Error adding listing:', error);
      setPublishError('Something went wrong while adding the listing.');
    }
  };

  const handleSpecificationChange = (key, value) => {
    setSpecifications((prev) => ({ ...prev, [key]: value }));
  };

  const getSubCategories = () => {
    switch (category) {
      case 'electronics':
        return ['Mobile', 'Laptop', 'Tablet', 'Accessory'];
      case 'fashion':
        return ['Clothing', 'Footwear', 'Accessories'];
      case 'home':
        return ['Furniture', 'Decor', 'Appliances'];
      case 'toys':
        return ['Educational', 'Outdoor', 'Action'];
      default:
        return [];
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Listing
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange}>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="toys">Toys</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Subcategory</InputLabel>
          <Select value={subCategory} onChange={handleSubCategoryChange}>
            {getSubCategories().map((subCat) => (
              <MenuItem key={subCat} value={subCat.toLowerCase()}>
                {subCat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {imageUploadError && (
          <Alert severity="error">{imageUploadError}</Alert>
        )}

        {/* Specifications Input */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Specifications</Typography>
          {category === 'electronics' && (
            <>
              <TextField
                label="Brand"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('brand', e.target.value)}
              />
              <TextField
                label="Model"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('model', e.target.value)}
              />
              <TextField
                label="Warranty"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('warranty', e.target.value)}
              />
              <TextField
                label="Battery Life"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('batteryLife', e.target.value)}
              />
            </>
          )}
          {category === 'fashion' && (
            <>
              <TextField
                label="Brand"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('brand', e.target.value)}
              />
              <TextField
                label="Size"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('size', e.target.value)}
              />
              <TextField
                label="Material"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('material', e.target.value)}
              />
            </>
          )} {category === 'home' && (
            <>
              <TextField
                label="Material"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('material', e.target.value)}
              />
              <TextField
                label="Color"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('color', e.target.value)}
              />
              <TextField
                label="Dimensions"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('dimensions', e.target.value)}
              />
            </>
          )}
          {category === 'toys' && (
            <>
              <TextField
                label="Recommended Age"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('recommendedAge', e.target.value)}
              />
              <TextField
                label="Material"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('material', e.target.value)}
              />
              <TextField
                label="Features"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleSpecificationChange('features', e.target.value)}
              />
            </>
          )}
        </Box>
        
        {publishError && (
          <Alert severity="error">{publishError}</Alert>
        )}

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Add Listing
        </Button>
      </form>
    </Container>
  );
};

export default AddListing;
