# 🚀 NexusHub - AI-Powered College Tech Club Platform

> **Hackathon-Winning Level Full-Stack Application**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel)](VERCEL_DEPLOYMENT_LINK_PLACEHOLDER)
[![tech-stack](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-blue?style=for-the-badge)](./frontend) 
[![backend](https://img.shields.io/badge/Backend-Node.js%2FExpress-green?style=for-the-badge)](./backend) 
[![database](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge)](https://mongodb.com) 
[![ai-engine](https://img.shields.io/badge/AI-Groq%20API-purple?style=for-the-badge)](https://groq.com)

NexusHub is a premium, production-ready web application that connects college students, provides AI mentorship, recommends challenges, matches teammates, and tracks growth in tech.

---

## ✨ Features

### 🤖 **AI-Powered Features**
- ✅ **AI Mentor** - Personalized mentoring powered by Groq's Llama3-70b
- ✅ **Smart Challenges** - Curated challenges matching your skill level
- ✅ **Team Matching** - Find perfect teammates with complementary skills
- ✅ **Growth Analytics** - Track your progress with intelligent dashboards
- ✅ **Smart Notifications** - Intelligent updates tailored to your journey
- ✅ **Weekly Digest** - Personalized progress summary and insights

### 💎 **Dashboard Features**
- ✅ **User Profile Management** - Customize your profile with skills and bio
- ✅ **Challenge Browser** - Browse 100+ challenges with filters & search
  - Filter by difficulty (Easy, Medium, Hard)
  - Filter by category (Web Dev, ML/AI, Mobile, DevOps, Data Science, Cloud)
  - Search functionality across all challenges
  - Points tracking and completion status
- ✅ **Team Matching System** - Discover teammates smartly
  - Skill-based matching algorithm
  - View suggested teammates
  - One-click invite functionality
- ✅ **Leaderboard** - Compete and track rankings
  - Global rankings by points
  - Rank progression (Beginner → Intermediate → Advanced → Expert)
  - Activity tracking
- ✅ **AI Mentor Chat** - Interactive conversation with AI mentor
  - Personalized guidance and recommendations
  - 7-part comprehensive response system
  - Real-time chat interface

### 🛡️ **Security & Authentication**
- ✅ JWT-based authentication (30-day token expiration)
- ✅ bcryptjs password hashing (10 salt rounds)
- ✅ Protected API routes with middleware
- ✅ Secure token management with localStorage
- ✅ CORS protection
- ✅ Input validation on frontend and backend
- ✅ Automatic logout on token expiration

### 🎨 **Premium UI/UX**
- ✅ Dark theme with neon accents (Blue, Purple, Pink)
- ✅ Glassmorphism UI with backdrop blur effects
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Theme toggle (Dark/Light mode)
- ✅ Toast notifications for user feedback
- ✅ Loading states and skeleton loaders
- ✅ Professional typography and spacing

### 📊 **Advanced Features**
- ✅ Points system with rank progression
- ✅ Challenge completion tracking
- ✅ Activity timeline and milestones
- ✅ Skill tagging and filtering
- ✅ User avatar generation
- ✅ Notification management
- ✅ Session persistence

---

## 🏗️ **Architecture**

### Project Structure
```
nexushub/
├── frontend/
│   ├── index.html              # Main HTML (landing, auth, dashboard)
│   ├── style.css               # Premium styling (glassmorphism, responsive)
│   └── script.js               # Complete frontend logic & interactivity
│
├── backend/
│   ├── server.js               # Express server & API setup
│   ├── package.json            # Dependencies
│   ├── seed.js                 # Sample data seeding
│   │
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication endpoints
│   │   ├── userRoutes.js       # User profile endpoints
│   │   ├── teamRoutes.js       # Team matching & leaderboard
│   │   ├── challengeRoutes.js  # Challenge endpoints
│   │   ├── discussionRoutes.js # Discussion endpoints
│   │   ├── eventRoutes.js      # Event endpoints
│   │   ├── badgeRoutes.js      # Badge endpoints
│   │   └── resourceRoutes.js   # Resource endpoints
│   │
│   ├── models/
│   │   ├── User.js             # User schema with methods
│   │   ├── Challenge.js        # Challenge schema
│   │   ├── Team.js             # Team schema
│   │   ├── Discussion.js       # Discussion schema
│   │   ├── Event.js            # Event schema
│   │   ├── Badge.js            # Badge schema
│   │   └── Resource.js         # Resource schema
│   │
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── userController.js   # User logic & AI integration
│   │   ├── teamController.js   # Team & leaderboard logic
│   │   ├── challengeController.js
│   │   ├── discussionController.js
│   │   ├── eventController.js
│   │   ├── badgeController.js
│   │   └── resourceController.js
│   │
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   │
│   └── config/
│       ├── database.js         # MongoDB connection
│       └── groq.js             # Groq AI engine integration
│
├── .env.example                # Environment variables template
├── README.md                   # Full documentation
├── SETUP_GUIDE.md              # Installation instructions
├── FEATURES.md                 # Detailed feature documentation
├── API_REFERENCE.md            # API endpoints reference
├── DEPLOYMENT.md               # Deployment guide
├── PROJECT_STRUCTURE.txt       # Project structure details
└── setup.sh                    # Automated setup script
```

---

## ⚡ **Tech Stack**

### Frontend
- **HTML5** - Semantic, accessible markup
- **CSS3** - Modern responsive design with glassmorphism effects
- **Vanilla JavaScript** - Pure ES6+ (no frameworks, lightweight)
- **LocalStorage API** - Client-side session management

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Lightweight web framework
- **MongoDB** - NoSQL database (Atlas or local)
- **Mongoose** - ODM for MongoDB with schema validation
- **bcryptjs** - Secure password hashing
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### AI Integration
- **Groq API** - LLM provider (Llama3-70b-8192 model)
- **groq-sdk** - Official Groq JavaScript SDK

### DevOps & Deployment
- **Vercel** - Frontend deployment
- **MongoDB Atlas** - Database hosting
- **Environment Variables** - Secure configuration

---

## 🚀 **Quick Start Guide**

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org))
- **MongoDB** running locally or [MongoDB Atlas](https://mongodb.com/cloud/atlas) connection
- **Groq API Key** (free at [groq.com](https://groq.com))

### Installation & Setup

#### 1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/nexushub.git
cd nexushub
```

#### 2️⃣ **Setup Backend**
```bash
cd backend
npm install
```

#### 3️⃣ **Configure Environment Variables**
```bash
# Copy example file
cp .env.example .env

# Edit .env with your values:
# - MONGODB_URI=your_mongodb_connection_string
# - GROQ_API_KEY=your_groq_api_key
# - JWT_SECRET=your_secret_key
```

#### 4️⃣ **Start Backend Server**
```bash
npm run dev
# Server runs on http://localhost:5000
```

#### 5️⃣ **Seed Initial Data (Optional)**
```bash
node seed.js
# Creates sample challenges, users, and demo data
```

#### 6️⃣ **Access Frontend**
Open `frontend/index.html` in your browser or serve it:
```bash
# From backend directory
cd ../frontend
python -m http.server 3000
# Or use any local server
```

---

## 📚 **API Endpoints**

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/leaderboard` - Get global leaderboard
- `GET /api/user/insights` - Get AI-generated insights

### Challenges
- `GET /api/challenges` - List all challenges (with filters)
- `GET /api/challenges/:id` - Get challenge details
- `POST /api/challenges/:id/complete` - Mark challenge complete

### Team Matching
- `GET /api/team/matches` - Get suggested teammates
- `POST /api/team/create` - Create a team
- `POST /api/team/invite` - Invite teammate

### AI Features
- `POST /api/user/insights` - Get AI mentor insights
- `POST /api/user/chat` - Chat with AI mentor

See [API_REFERENCE.md](./API_REFERENCE.md) for complete documentation.

---

## 🎓 **Usage Examples**

### Register & Login
```javascript
// Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Pass@123"}'

// Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Pass@123"}'
```

### Get AI Insights
```javascript
curl -X POST http://localhost:5000/api/user/insights \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🌐 **Deployment**

### Deploy to Vercel (Frontend)
1. Push repository to GitHub
2. Connect GitHub to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on each push

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📖 **Documentation**

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed installation & configuration
- **[FEATURES.md](./FEATURES.md)** - Complete feature documentation
- **[API_REFERENCE.md](./API_REFERENCE.md)** - API endpoints reference
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide for Vercel & production
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.txt)** - Detailed project structure

---

## 🛠️ **Development**

### Available Scripts

**Backend:**
```bash
npm run dev      # Start with nodemon (hot reload)
npm start        # Start production server
node seed.js     # Seed database with sample data
```

**Frontend:**
- Open `frontend/index.html` in browser
- All changes auto-reflect on browser refresh

### File Structure for Developers
- `backend/routes/` - Add new API endpoints here
- `backend/models/` - Define data schemas
- `backend/controllers/` - Implement business logic
- `frontend/script.js` - Frontend JavaScript logic
- `frontend/style.css` - Frontend styling

---

## 🤝 **Contributing**

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 **Support & Contact**

- 📧 Email: support@nexushub.io
- 🐛 Report bugs: [Open an issue](https://github.com/yourusername/nexushub/issues)
- 💡 Feature requests: [Discussions](https://github.com/yourusername/nexushub/discussions)

---

## 🎉 **Acknowledgments**

- **Groq** for providing powerful AI API
- **MongoDB** for flexible database solution
- **Express.js** community for excellent documentation
- All contributors and community members

---

**Made with ❤️ by the NexusHub Team**

⭐ Star this repository if you find it helpful!
