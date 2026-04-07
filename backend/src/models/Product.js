const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    stock: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    reviews: [reviewSchema],
    meta: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
