const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller')
const imageUpload = require('../utils/imageUpload')

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.post('/ads', imageUpload.single('image'), AdController.postAd);
router.put('/ads/:id', imageUpload.single('image'), AdController.editAd);
router.delete('/ads/:id', AdController.deleteAd);
router.get('/ads/search/:searchPhrase', AdController.searchByPhrase);

module.exports = router;