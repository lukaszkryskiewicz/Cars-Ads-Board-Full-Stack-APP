const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware')
const auth = require('../controllers/auth.controller');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/checkSession', authMiddleware, auth.getUser);
router.delete('/logout', authMiddleware, auth.logout)

module.exports = router;