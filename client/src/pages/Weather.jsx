import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // Importing the Sidebar component

const WeatherPage = () => {
  return (
    <div className="WeatherPage bg-gray-50 min-h-screen py-6 flex">
     <Sidebar /> {/* Add Sidebar here */}
      <div style={{ flex: 1, paddingTop: '20px' }}> {/* Adjust padding for the content */}
        {/* Include Sidebar here */}
        
        <div style={{ flex: 1, paddingLeft: '16px' }}> {/* Space between sidebar and content */}
          <Container maxWidth="lg" className="my-12">
            {/* Current Weather Section */}
            <Typography variant="h4" className="font-bold text-center text-green-600 mb-6">Current Weather</Typography>
            <Card className="shadow-lg mb-8">
              <CardContent className="flex flex-col items-center">
                <Typography variant="h5" className="text-gray-800">Location: Your Farm Location</Typography>
                <div className="flex items-center mt-4">
                  <img 
                    src="https://via.placeholder.com/50" 
                    alt="Weather Icon" 
                    className="mr-2"
                  />
                  <Typography variant="h3" className="text-gray-800">25°C</Typography>
                </div>
                <Typography className="mt-2 text-lg text-gray-600">Humidity: 60%</Typography>
                <Typography className="mt-2 text-lg text-gray-600">Condition: Sunny</Typography>
              </CardContent>
            </Card>

            {/* 5-Day Forecast Section */}
            <Typography variant="h4" className="font-bold text-center text-green-600 mb-6">5-Day Forecast</Typography>
            <Grid container spacing={3}>
              {[
                { date: "Oct 7", icon: "☀️", high: "28°C", low: "18°C", precipitation: "10%" },
                { date: "Oct 8", icon: "🌧️", high: "25°C", low: "17°C", precipitation: "60%" },
                { date: "Oct 9", icon: "☀️", high: "26°C", low: "19°C", precipitation: "20%" },
                { date: "Oct 10", icon: "🌩️", high: "24°C", low: "16°C", precipitation: "80%" },
                { date: "Oct 11", icon: "☀️", high: "27°C", low: "18°C", precipitation: "5%" },
              ].map((day, index) => (
                <Grid item xs={12} sm={6} md={2} key={index}>
                  <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                    <CardContent className="flex flex-col items-center">
                      <Typography variant="h6" className="font-bold text-gray-800">{day.date}</Typography>
                      <div className="text-3xl">{day.icon}</div>
                      <Typography className="mt-2 text-lg text-gray-600">High: {day.high}</Typography>
                      <Typography className="text-lg text-gray-600">Low: {day.low}</Typography>
                      <Typography className="text-lg text-gray-600">Precipitation: {day.precipitation}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Alerts Section */}
            <Typography variant="h4" className="font-bold text-center text-green-600 mb-6 mt-12">Weather Alerts</Typography>
            <Card className="shadow-lg mb-8">
              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-800">Current Alerts</Typography>
                <Typography className="mt-2 text-lg text-gray-600">1. Frost Alert: Expected tonight</Typography>
                <Typography className="mt-1 text-lg text-gray-600">2. Heavy Rainfall: Possible tomorrow</Typography>
              </CardContent>
            </Card>

            {/* Call-to-Action Buttons */}
            <div className="text-center my-8">
              <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">View Detailed Forecast</Button>
              <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">Set Weather Alerts</Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
