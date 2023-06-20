const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 25 },
  content: { type: String, required: true, minlength: 20, maxlength: 100 },
  date: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  seller: { type: String, required: true, ref: 'User' },
});


module.exports = mongoose.model('Ad', adSchema);