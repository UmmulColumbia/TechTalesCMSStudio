const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');  

// Post a new comment
router.post('/', withAuth, async (req, res) => {
    try {
       
        if (!req.body.text || !req.body.postId) {
            return res.status(400).json({ message: 'Text and Post ID are required for a comment' });
        }

        const newComment = await Comment.create({
            text: req.body.text,
            postId: req.body.postId,
            userId: req.session.userId 
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error posting a new comment:', error);
        res.status(500).json(error);
    }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId  // Ensure that only the user who made the comment can delete it
            }
        });

        if (deletedComment) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json(error);
    }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            { text: req.body.text },
            {
                where: {
                    id: req.params.id,
                    userId: req.session.userId  // Ensure that only the user who made the comment can update it
                }
            }
        );

        if (updatedComment) {
            res.json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json(error);
    }
});

module.exports = router;
