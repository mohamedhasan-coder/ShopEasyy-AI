const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

// Get all products with filtering and pagination
const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const products = await Product.find(filters)
            .limit(limit)
            .skip((page - 1) * limit);
        const total = await Product.countDocuments(filters);
        res.json({ total, page, products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product with image upload
const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);
        const newProduct = new Product({
            name,
            price,
            description,
            image: result.secure_url
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updates.image = result.secure_url;
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct };