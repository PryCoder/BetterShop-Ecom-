import React, { useState } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, Button, 
  Table, TableHead, TableRow, TableCell, TableBody, 
  Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Legend 
} from 'recharts';
import Sidebar from '../components/Sidebar'; 

const crops = [
  { name: 'Wheat', type: 'Cereal', plantingDate: '2023-03-15', growthStage: 'Flowering', healthStatus: 'Healthy' },
  { name: 'Tomato', type: 'Vegetable', plantingDate: '2023-04-10', growthStage: 'Vegetative', healthStatus: 'Moderate' },
];

const cropDetails = {
  name: 'Wheat',
  type: 'Cereal',
  variety: 'Hard Red Winter',
  plantingDate: '2023-03-15',
  expectedHarvestDate: '2023-07-25',
  soilRequirements: 'Loamy, well-drained',
  climateRequirements: 'Cool, dry',
  waterNeeds: 'Moderate',
  nutrientNeeds: 'High nitrogen content',
  pestManagement: 'Regular pest scouting, fungicide as needed',
};

const soilMetrics = [
  { day: 'Day 1', moisture: 30, temperature: 20 },
  { day: 'Day 2', moisture: 32, temperature: 22 },
  { day: 'Day 3', moisture: 29, temperature: 19 },
];

const yieldPredictionData = [
  { name: 'Wheat', predictedYield: 50 },
  { name: 'Tomato', predictedYield: 30 },
];

const CropsPage = () => {
  const [openCropDialog, setOpenCropDialog] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleOpenCropDialog = (crop) => {
    setSelectedCrop(crop);
    setOpenCropDialog(true);
  };

  const handleCloseDialog = () => setOpenCropDialog(false);

  return (
    <div className="CropsPage bg-gray-50 min-h-screen flex">
      <Sidebar />
      <div style={{ flex: 1, paddingTop: '80px' }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Typography 
            variant="h4" 
            className="font-bold text-center text-green-600 mb-6"
            style={{ fontSize: '1.5rem' }} // Adjusting font size for mobile
          >
            Crops Management
          </Typography>

          {/* Crop List */}
          <Typography 
            variant="h6" 
            className="font-bold mb-4"
            style={{ fontSize: '1.2rem' }} // Smaller font size for mobile
          >
            Crop List
          </Typography>
          
          {/* Make Table Scrollable on Mobile */}
          <div style={{ overflowX: 'auto' }}> 
            <Table className="mb-6">
              <TableHead>
                <TableRow>
                  <TableCell>Crop Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Planting Date</TableCell>
                  <TableCell>Growth Stage</TableCell>
                  <TableCell>Health Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {crops.map((crop, index) => (
                  <TableRow key={index}>
                    <TableCell>{crop.name}</TableCell>
                    <TableCell>{crop.type}</TableCell>
                    <TableCell>{crop.plantingDate}</TableCell>
                    <TableCell>{crop.growthStage}</TableCell>
                    <TableCell>{crop.healthStatus}</TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleOpenCropDialog(crop)}
                        style={{ fontSize: '0.8rem', padding: '5px 10px' }} // Smaller buttons for mobile
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Crop Health Monitoring */}
          <Typography variant="h6" className="font-bold mb-4">
            Crop Health Monitoring
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className="shadow-lg">
                <CardContent>
                  <Typography variant="h6" className="font-bold text-center">Soil Moisture and Temperature</Typography>
                  <div style={{ overflowX: 'auto' }}> {/* Prevent overflow */}
                    <ResponsiveContainer width="100%" height={250}> {/* Reduced height for mobile */}
                      <LineChart data={soilMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="moisture" stroke="#8884d8" />
                        <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Yield Prediction */}
          <Typography variant="h6" className="font-bold mb-4">Yield Prediction</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card className="shadow-lg">
                <CardContent>
                  <div style={{ overflowX: 'auto' }}> {/* Prevent overflow */}
                    <ResponsiveContainer width="100%" height={250}> {/* Reduced height for mobile */}
                      <BarChart data={yieldPredictionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="predictedYield" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              variant="contained" 
              color="primary"
              style={{ fontSize: '0.9rem' }} // Adjust button size for mobile
            >
              Add New Crop
            </Button>
            <Button 
              variant="outlined" 
              color="secondary"
              style={{ fontSize: '0.9rem' }} // Adjust button size for mobile
            >
              Monitor Crop Health
            </Button>
          </div>

          {/* Crop Details Dialog */}
          <Dialog 
            open={openCropDialog} 
            onClose={handleCloseDialog}
            fullWidth 
            maxWidth="xs"  // Dialog width adjusts for mobile
          >
            <DialogTitle>Crop Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6" className="font-bold mb-2">
                Crop Name: {selectedCrop?.name || cropDetails.name}
              </Typography>
              <Typography variant="body1">Type: {cropDetails.type}</Typography>
              <Typography variant="body1">Variety: {cropDetails.variety}</Typography>
              <Typography variant="body1">Planting Date: {cropDetails.plantingDate}</Typography>
              <Typography variant="body1">Expected Harvest Date: {cropDetails.expectedHarvestDate}</Typography>
              <Typography variant="body1">Soil Requirements: {cropDetails.soilRequirements}</Typography>
              <Typography variant="body1">Climate Requirements: {cropDetails.climateRequirements}</Typography>
              <Typography variant="body1">Water Needs: {cropDetails.waterNeeds}</Typography>
              <Typography variant="body1">Nutrient Needs: {cropDetails.nutrientNeeds}</Typography>
              <Typography variant="body1">Pest Management: {cropDetails.pestManagement}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">Close</Button>
              <Button onClick={handleCloseDialog} color="primary">Edit Crop Details</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default CropsPage;
