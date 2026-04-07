require('dotenv').config();
const Product = require('../models/Product');
const OpenAI = require('openai');

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// simple fallback: keyword search
const chat = async (req, res) => {
  const { message } = req.body;
  if (openai) {
    const prompt = `You are a helpful shopping assistant. User: ${message}. Provide 5 product suggestions from the store by name, short reason, and optional product ids if found.`;
    const g = await openai.chat.completions.create({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }] });
    return res.json({ reply: g.choices[0].message.content });
  }

  // fallback: do a quick DB search for keywords
  const keywords = message.split(/\s+/).slice(0, 5).join(' ');
  const products = await Product.find({ $text: { $search: keywords } }).limit(5).lean();
  if (!products.length) {
    const fallback = await Product.find({ name: { $regex: keywords.split(' ')[0] || '', $options: 'i' } }).limit(5);
    return res.json({ reply: 'Found products', products: fallback });
  }
  res.json({ reply: 'Found products', products });
};

module.exports = { chat };
