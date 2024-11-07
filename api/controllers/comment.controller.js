// Create a new comment
import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/error.js';

export const createComment = async (req, res, next) => {
    try {
        const { content, listingId } = req.body; // userId will come from req.user

        // Log incoming request body for debugging
        console.log("Request body:", req.body);

        if (!content || !listingId) {
            return next(errorHandler(400, 'Content and listingId are required'));
        }

        if (!req.user || !req.user.id) {
            return next(errorHandler(401, 'User not authenticated')); // Added check for user authentication
        }

        const newComment = new Comment({
            content,
            listingId,
            userId: req.user.id, // Use the user ID from req.user instead of req.body
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment); // Use 201 for resource creation
    } catch (error) {
        // Log the error for debugging
        console.error("Error creating comment:", error);
        next(error);
    }
};

export const getListingComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ listingId: req.params.listingId }).sort({
            createdAt: -1,
        });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }
        
        const userId = req.user.id; // Use req.user for the authenticated user's ID
        const userIndex = comment.likes.indexOf(userId);

        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(userId);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }

        if (comment.userId.toString() !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit this comment'));
        }

        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { content: req.body.content },
            { new: true }
        );
        
        res.status(200).json(editedComment);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }

        if (comment.userId.toString() !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to delete this comment'));
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('Comment has been deleted');
    } catch (error) {
        next(error);
    }
};

export const getComments = async (req, res, next) => {
    if (!req.user.isAdmin) return next(errorHandler(403, 'You are not allowed to get all comments'));
    
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;

        const comments = await Comment.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalComments = await Comment.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthComments = await Comment.countDocuments({ createdAt: { $gte: oneMonthAgo } });

        res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
        next(error);
    }
};
