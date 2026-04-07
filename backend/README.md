# ShopEasyy AI — Backend

This backend provides REST APIs for ShopEasyy AI (MERN stack). Features included:

- JWT authentication (bcrypt)
- Product CRUD with Cloudinary image uploads
- Orders with Razorpay integration and Socket.io updates
- AI chat endpoint using OpenAI or DB fallback
- Centralized error handling

Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:

```powershell
cd backend; npm install
```

3. Run in dev:

```powershell
npm run dev
```

API:

- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- POST /api/products (admin)
- POST /api/orders
- POST /api/ai/chat

Note: This project is scaffolded to be production-ready but may need extra hardening, validation and tests before deployment.
