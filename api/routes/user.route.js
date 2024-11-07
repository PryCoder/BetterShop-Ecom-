import express from 'express';

import { getUserById, signout,  updateUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signout',signout);
router.get('/:id', getUserById);

// PUT to update user details by ID
router.put('/:id', updateUserById);


export default router;