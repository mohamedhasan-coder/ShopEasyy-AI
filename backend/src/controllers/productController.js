const Product = require('../models/Product');
const cloudinary = require('../utils/cloudinary');

const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const images = [];
  if (req.body.images && Array.isArray(req.body.images)) {
    for (const img of req.body.images) {
      // img expected as base64/dataURL or remote URL
      const uploaded = await cloudinary.uploader.upload(img, { folder: 'shopeasyy' });
      images.push({ url: uploaded.secure_url, public_id: uploaded.public_id });
    }
  }
  const product = await Product.create({ name, description, price, category, stock, images });
  res.status(201).json(product);
};

const listProducts = async (req, res) => {
  const { page = 1, limit = 12, q, category } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });
  const total = await Product.countDocuments(filter);
  res.json({ data: products, total });
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  const updates = req.body;
  Object.assign(product, updates);
  await product.save();
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  // remove images from cloudinary if present
  for (const img of product.images || []) {
    if (img.public_id) await cloudinary.uploader.destroy(img.public_id);
  }
  await product.remove();
  res.json({ message: 'Deleted' });
};

module.exports = { createProduct, listProducts, getProduct, updateProduct, deleteProduct };
