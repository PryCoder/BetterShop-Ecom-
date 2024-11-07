// models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  }, // Assume you have user authentication
  paymentMethod: { type: String, required: true },
  deliveryOption: { type: String, required: true },
  orderStatus: { type: String, default: 'Pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
