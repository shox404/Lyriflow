const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} = require('../controllers/auth');
const { verifyJWT } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.get('/me', verifyJWT, getCurrentUser);

module.exports = router;
