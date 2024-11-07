// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import Home from './pages/Home';



import TasksPage from './pages/Tasks';
import SettingsPage from './pages/Settings';

import CropsPage from './pages/Crops';

import AddListing from './pages/addList';
import ProductPage from './pages/ProductPage';

import OrderDetails from './pages/OrderDetails';
import SearchPage from './pages/SearchPage';

import Info from './pages/info';
import UserDetails from './pages/UserDetails';
import HomePage from './pages/Advertisement';



const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
   
    <Route path="/home" element={<Home />} />
    <Route path="/" element={<HomePage />} />
     <Route path="/info" element={<Info />} />
     <Route path="/user-details" element={<UserDetails />} />
 
   < Route path="/settings" element={<SettingsPage />} />
     <Route path="/tasks" element={<TasksPage />} />
  
  
    <Route path="/sign-up" element={<SignUp />} />
    <Route path='/sign-in' element={<Signin />} />
    <Route path='/add-listing' element={<AddListing/>} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/orders" element={<OrderDetails />} />
    <Route path="/search" element={<SearchPage />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
