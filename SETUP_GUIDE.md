# NexusHub - Quick Start Guide

## 🚀 Project Overview

**NexusHub** is a production-ready, full-stack web application featuring:
- Premium dark UI with glassmorphism effects
- AI-powered mentorship and recommendations
- Team matching system
- Challenge completion tracking
- Real-time leaderboard
- Responsive design (mobile, tablet, desktop)

---

## 📦 Installation Steps

### Step 1: Install Dependencies

```bash
cd nexushub/backend
npm install
```

### Step 2: Configure Environment Variables

```bash
copy .env.example .env
```

Edit `.env` file with your settings:

```env
# MongoDB Connection - Use Local or Atlas
MONGODB_URI=mongodb://localhost:27017/nexushub
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexushub

# JWT Secret - Generate something secure
JWT_SECRET=your_super_secret_key_min_32_chars_change_in_production

# Groq API Key - Get from https://console.groq.com
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas Cloud**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string
- Update `MONGODB_URI` in `.env`

### Step 4: Seed Sample Data (Optional)

```bash
cd nexushub/backend
npm install  # if not already done
node seed.js
```

This creates:
- 5 sample users (with passwords)
- 10 sample challenges
- Test data for leaderboard

### Step 5: Start Backend Server

```bash
cd nexushub/backend
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   🚀 NexusHub Backend Server           ║
║   Running on: http://localhost:5000    ║
║   Environment: development             ║
╚════════════════════════════════════════╝
```

### Step 6: Start Frontend Server

**Option A: Python** (Recommended)
```bash
cd nexushub/frontend
python -m http.server 3000
```

**Option B: Node.js HTTP Server**
```bash
npm install -g http-server
cd nexushub/frontend
http-server . -p 3000
```

**Option C: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### Step 7: Open in Browser

```
http://localhost:3000
```

---

## 🧪 Test the Application

### Test 1: Create Account
1. Click "Get Started" button
2. Fill signup form:
   - Name: Your Name
   - Email: test@example.com
   - Password: Test123Pass
3. Click "Create Account"
4. You should be logged in to dashboard

### Test 2: Login with Sample Data
If you ran `seed.js`, you can login with:
```
Email: alex@example.com
Password: Password123
```

### Test 3: Dashboard
1. **Overview Tab** - See AI insights, stats, challenges
2. **Challenges Tab** - Browse and complete challenges
3. **Team Tab** - Find teammates
4. **AI Mentor Tab** - Chat with AI mentor
5. **Leaderboard Tab** - See top users
6. **Profile Tab** - Update your profile

### Test 4: Features
- ✅ Complete a challenge → Earn points
- ✅ Update profile → Save skills
- ✅ Switch theme → Click 🌙 icon
- ✅ Search challenges → Type in search bar
- ✅ Filter challenges → Use dropdowns
- ✅ Get AI insights → Refresh button

---

## 🎨 UI Preview

### Landing Page
- Hero section with CTA buttons
- Feature cards grid
- Gradient animations
- Responsive layout

### Dashboard
- **Sidebar**: Navigation & user profile
- **Main Content**: Dynamic page content
- **Stats**: Points, challenges, activity, team
- **Cards**: AI insights, challenges, timeline

### Dark Theme Features
- **Colors**: Cyan (#00d4ff), Purple (#b100ff), Pink (#ff006e)
- **Effects**: Glassmorphism, gradient text, neon glows
- **Animations**: Smooth transitions, fade effects
- **Theme Toggle**: Light/Dark modes

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### User (Protected)
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/ai-engine` - Get AI insights
- `GET /api/user/challenges` - Get challenges
- `POST /api/user/complete-challenge` - Complete challenge

### Team
- `GET /api/team/matches` - Get team matches
- `POST /api/team/create` - Create team
- `GET /api/team/leaderboard` - Get leaderboard

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Ensure MongoDB is running (`mongod` command)
- Check `MONGODB_URI` in `.env`
- For Atlas, ensure IP whitelist includes your IP

### Issue: "Groq API Error"
**Solution**:
- Get API key from https://console.groq.com
- Ensure it's in `.env` as `GROQ_API_KEY`
- Check you have API credits

### Issue: "CORS Error in browser"
**Solution**:
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Should be `http://localhost:3000` for local testing

### Issue: "Port 5000 already in use"
**Solution**:
- Kill process: `lsof -i :5000` then `kill -9 <PID>`
- Or change `PORT` in `.env`

### Issue: "Login not working"
**Solution**:
- Check browser console for errors (F12)
- Ensure backend is running
- Check email/password are correct
- Try sample data: `alex@example.com` / `Password123`

---

## 📱 Responsive Design

The app adapts to all screen sizes:

- **Desktop** (1200px+): Full sidebar, complete layout
- **Tablet** (768px+): Optimized cards and spacing
- **Mobile** (< 768px): Collapsed sidebar, stacked layout

Test by:
1. Opening browser DevTools (F12)
2. Click device toolbar icon
3. Test on different screen sizes

---

## 🚀 Deployment

### Deploy Backend
**Option 1: Heroku**
```bash
heroku login
heroku create nexushub-api
git push heroku main
```

**Option 2: Render (Recommended)**
- Push to GitHub
- Connect repo to Render
- Set environment variables
- Deploy

### Deploy Frontend
**Option 1: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --dir=frontend
```

**Option 2: Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option 3: GitHub Pages**
- Push to GitHub
- Enable Pages in repo settings
- Use `frontend/` as source

---

## 📚 Project Files

### Frontend
- `index.html` - Main page with all sections
- `style.css` - Premium styling (2000+ lines)
- `script.js` - All frontend logic (700+ lines)

### Backend
- `server.js` - Express app setup
- `/routes` - API route handlers
- `/models` - MongoDB schemas
- `/controllers` - Business logic
- `/middleware` - Authentication
- `/config` - Database & Groq setup

### Configuration
- `.env.example` - Environment template
- `package.json` - Dependencies

---

## 💡 Key Features Explained

### AI Mentor
- Uses Groq's Llama3-70b model
- Analyzes user data (skills, points, activity)
- Provides 7 personalized insights
- Updates on demand

### Team Matching
- Finds users with similar skills
- Excludes already teamed members
- Suggests complementary skill matches

### Challenge System
- 10+ pre-seeded challenges
- Difficulty levels: Easy, Medium, Hard
- Categories: Web Dev, ML/AI, Mobile, DevOps, Cloud, Data Science
- Points awarded on completion
- Rank updates based on points

### Leaderboard
- Real-time ranking by points
- Shows top 20 users
- Displays name, points, level, activity

---

## 🎯 Next Steps

1. **Customize**: Update UI colors, text, images
2. **Add Data**: Create more challenges and users
3. **Implement Features**: Add more AI capabilities
4. **Deploy**: Push to production
5. **Monitor**: Track user engagement
6. **Improve**: Gather feedback and iterate

---

## 📞 Support

- **Docs**: See README.md for full documentation
- **Issues**: Check troubleshooting section
- **Code**: Well-commented for easy understanding

---

## ✨ Bonus Tips

1. **Test with different users** - Create multiple accounts
2. **Try different skills** - Update profile with various skills
3. **Max out challenges** - Complete all challenges for insights
4. **Use search** - Search for specific challenges
5. **Filter challenges** - Try different difficulty/category combos
6. **Toggle theme** - Switch between light/dark modes
7. **Check AI insights** - Refresh AI mentor for new responses
8. **Monitor leaderboard** - See who's leading

---

**Congratulations! 🎉 You've successfully set up NexusHub!**

Start building amazing things with your team! 🚀
