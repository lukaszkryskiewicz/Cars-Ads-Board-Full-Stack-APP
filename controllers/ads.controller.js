const Ad = require('../models/Ad.model');
const getImageFileType = require('../utils/getImageFileType')
const fs = require('fs');


exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find({}));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postAd = async (req, res) => {
  console.log(req.body)
  try {
    const { title, content, date, price, address, seller } = req.body;
    const image = req.file
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

    if (title && content && date && price && address && seller && image && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      const newAd = new Ad({ title, content, date, price, address, seller, image: image.filename })
      await newAd.save();
      res.json({ message: 'Ad successfully added' });
    } else {
      fs.unlinkSync(image.path)
      res.status(400).send({ message: 'Bad request' })
    }
  }
  catch (err) {
    console.log(req.body)
    res.status(500).json({ message: err });
  }
};

exports.editAd = async (req, res) => {
  console.log(req.body);
  const { title, content, date, price, address, seller } = req.body;
  const updateFields = {
    title,
    content,
    date,
    price,
    address,
    seller,
  };

  if (req.file) {
    updateFields.image = req.file;
  }
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.updateOne({ _id: req.params.id }, { $set: updateFields });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }


};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id })
      res.json({ message: 'Ok' })
    }
  }
  catch {
    res.status(500).json({ message: err })
  }
};

exports.searchByPhrase = async (req, res) => {
  try {
    const Ads = await Ad.find({ title: { $regex: req.params.searchPhrase, $options: 'i' } });
    if (Ads.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(Ads);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

