const router = require('express').Router();

// Import routers
const userRoutes = require('./userRoutes');
const postRoutes = require('./PostRoutes');
const protectedRoutes = require('./protectedRoutes'); 
const commentRoutes = require('./comment'); 


// Setup routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comment', commentRoutes);
router.use('/posts', protectedRoutes);
// More route uses if you have additional routers

module.exports = router;
