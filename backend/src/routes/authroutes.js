const express = require('express');

const router = express.Router();

const { register , login , getProfile } = require('../controllers/authController');

const { protect } = require('../middlewares/authMiddleware');

// route for registration
router.post('/register' , register);

// route for login
router.post('/login' , login);

//route for getting profile

router.get('/profile' , protect , getProfile);

module.exports = router;