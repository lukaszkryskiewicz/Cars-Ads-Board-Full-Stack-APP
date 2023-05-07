const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller')

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.post('/ads', AdController.postAd);
router.put('/ads/:id', AdController.editAd);
router.delete('/ads/:id', AdController.deleteAd);
router.get('/ads/search/:searchPhrase', AdController.searchByPhrase);

module.exports = router;