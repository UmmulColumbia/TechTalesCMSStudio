const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');

// Protected route for the dashboard
router.get('/dashboard', withAuth, (req, res) => {
    res.render('dashboard', {
        // You might pass additional data necessary for the dashboard here
    });
});

// Protected route for user profile
router.get('/profile', withAuth, (req, res) => {
    res.render('profile', {
        // Data specific to the user can be passed here
    });
});

module.exports = router;
