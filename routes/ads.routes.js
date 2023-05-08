const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller')
const imageUpload = require('../utils/imageUpload')
const authMiddleware = require('../utils/authMiddleware')

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.post('/ads', authMiddleware, imageUpload.single('image'), AdController.postAd);
router.put('/ads/:id', authMiddleware, imageUpload.single('image'), AdController.editAd);
router.delete('/ads/:id', authMiddleware, AdController.deleteAd);
router.get('/ads/search/:searchPhrase', AdController.searchByPhrase);

module.exports = router;