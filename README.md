# Recipe Book App

A dynamic, user-friendly web application for food enthusiasts to manage, discover, and share recipes, built with React, Firebase, and MongoDB.

- **Live Website**: https://recipe-react-pi.vercel.app/

## Main Technologies
- React
- Tailwind CSS
- Firebase (Authentication)
- MongoDB
- Express.js
- Lottie React, React Awesome Reveal
- Vercel
- Webstorm (IDE)

## Core Features
- Secure user authentication (Login, Register, Google Sign-In)
- Add, update, and delete personal recipes with a user-friendly form
- Browse all recipes with cuisine type filtering in a responsive grid
- Like recipes (except own) with real-time top recipes display
- Fully responsive design for mobile, tablet, and desktop
- Dark/light theme toggle for enhanced user experience
- Custom food-themed 404 page

## 📦 Key Dependencies

### Client Dependencies
```json
{
  "react": "^18.2.0",
  "@tanstack/react-query": "^4.29.0",
  "react-router-dom": "^6.8.0",
  "react-hook-form": "^7.43.0",
  "@stripe/stripe-js": "^1.52.0",
  "recharts": "^2.5.0",
  "react-hot-toast": "^2.4.0",
  "tailwindcss": "^3.2.0",
  "axios": "^1.3.0"
}
```

### Server Dependencies
```json
{
  "express": "^4.18.0",
  "mongodb": "^5.1.0",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.0",
  "stripe": "^12.0.0",
  "cors": "^2.8.0",
  "dotenv": "^16.0.0"
}
```

## 🚀 Local Setup Guide

### Prerequisites
- Node.js (v16+)
- MongoDB (local/Atlas)
- Git

### Client Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/mahfuz-7148/Medipeak.git
   cd mcms-client
   npm install
   ```

2. **Environment Variables**
   Create `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_API_URL=http://localhost:5000
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   ## 📞 Contact

**Developer:** Mahfuzur Rahman Shanto  
**Email:** mrahman7148@gmail.com  

