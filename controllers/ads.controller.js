const Ad = require('../models/Ad.model');
const getImageFileType = require('../utils/getImageFileType')
const fs = require('fs');
const mongoose = require('mongoose')


exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find({}).populate('seller'));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('seller');
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postAd = async (req, res) => {
  try {
    const { title, content, date, price, address } = req.body;
    const image = req.file
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'
    if (title && content && date && price && address && image && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      const newAd = new Ad({ title, content, date, price, address, seller: req.session.user.id, image: image.filename })
      await newAd.save();
      res.json({ message: 'Ad successfully added' });
    } else {
      //  fs.unlinkSync(image.path)
      res.status(400).send({ message: 'Bad request' })
    }
  }
  catch (err) {
    // fs.unlinkSync(image.path)
    console.log(err)
    res.status(500).json({ message: err });
  }
};

exports.editAd = async (req, res) => {
  const { title, content, date, price, address } = req.body;
  const updateFields = {
    title,
    content,
    date,
    price,
    address,
  };

  if (req.file) {
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'
    if (['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      updateFields.image = req.file.filename;
    } else {
      fs.unlinkSync(req.file.path)
      return res.status(400).send({ message: 'Bad request' })
    }
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }


  try {
    const ad = await Ad.findById(req.params.id).populate('seller');
    console.log(ad)
    if (ad && ad.seller.id === req.session.user.id) {
      console.log(ad)
      const oldImage = ad.image
      await Ad.updateOne({ _id: req.params.id }, { $set: updateFields });
      res.json({ message: 'OK' });
      if (oldImage && updateFields.image && updateFields.image !== oldImage) {
        fs.unlinkSync('public/uploads/' + oldImage)
      }
    } else res.status(404).json({ message: 'You have no power here...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }


};


exports.deleteAd = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const ad = await Ad.findById(req.params.id).populate('seller');
    if (ad && ad.seller.id === req.session.user.id) {
      await Ad.deleteOne({ _id: req.params.id })
      fs.unlinkSync('public/uploads/' + ad.image)
      res.json({ message: 'Ok' })
    } else res.status(404).json({ message: 'You have no power here...' });
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
};

exports.searchByPhrase = async (req, res) => {
  try {
    const Ads = await Ad.find({ title: { $regex: req.params.searchPhrase, $options: 'i' } }).populate('seller');
    if (Ads.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(Ads);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

