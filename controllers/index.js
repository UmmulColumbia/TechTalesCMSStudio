const router = require('express').Router();

// Import other routers
const userRoutes = require('./userRoutes');
const postRoutes = require('./PostRoutes');
const protectedRoutes = require('./protectedRoutes'); 
// More route imports if you have additional routers

// Setup routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// More route uses if you have additional routers

module.exports = router;
