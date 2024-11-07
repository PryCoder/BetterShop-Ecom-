// controllers/order.controller.js
import Order from '../models/order.model.js'; // Adjust the path as necessary

export const createOrder = async (req, res) => {
  const { listingId, userId, paymentMethod, deliveryOption } = req.body;

  // Validate required fields
  if (!listingId || !userId || !paymentMethod || !deliveryOption) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({
      listingId,
      userId,
      paymentMethod,
      deliveryOption,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json({ order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Failed to create order' });
  }
};

export const getOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const orders = await Order.find({ userId: req.user.id })
      .populate('listingId') // Populate the listing information if needed
      .populate('userId', 'username profilePicture'); // Populate user details

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Get a specific order by ID for the current user
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    // Validate that the user is allowed to update the order
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Update order fields
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    // Validate that the user is allowed to delete the order
    const deletedOrder = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: error.message });
  }
};