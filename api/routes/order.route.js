// routes/order.routes.js
import express from 'express';
import { createOrder,  deleteOrder,  getOrderById,  getOrders, updateOrder } from '../controllers/order.controller.js'; // Adjust the path as necessary

import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();

// Create Order route
router.post('/', createOrder);
router.get('/',verifyToken, getOrders);

// Route for getting a specific order by ID
router.get('/:id',verifyToken, getOrderById);

// Route for updating an order
router.put('/:id',verifyToken, updateOrder);

// Route for deleting an order by ID
router.delete('/:id',verifyToken, deleteOrder);

export default router;
