# 🔌 NexusHub - API Quick Reference

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.nexushub.dev/api
```

## Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer {your_jwt_token}
```

---

## 📝 Authentication Endpoints

### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rank": "Beginner"
  }
}
```

---

### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rank": "Beginner",
    "points": 0,
    "avatar": "https://api.dicebear.com/..."
  }
}
```

---

## 👤 User Endpoints (Protected)

### 3. Get User Profile
```http
GET /api/user/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://api.dicebear.com/...",
    "bio": "Full-stack developer",
    "skills": ["JavaScript", "React", "Node.js"],
    "rank": "Intermediate",
    "points": 350,
    "activity": 7,
    "challenges": ["507f191e810c19729de860ea"],
    "team": null,
    "notifications": [],
    "lastActive": "2026-04-09T10:30:00Z"
  }
}
```

---

### 4. Update User Profile
```http
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Updated bio",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
  "avatar": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "...updated user data..."
  }
}
```

---

### 5. Get AI Engine Response
```http
GET /api/user/ai-engine
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "mentorResponse": "Great progress! You've completed 5 challenges. Keep pushing your boundaries...",
    "challengeRecommendation": "Based on your JavaScript skills, try 'React Todo App' next.",
    "teamMatchSuggestion": "Look for teammates with strong backend skills to complement your frontend expertise.",
    "growthInsight": "You're advancing quickly! In 2 weeks of consistent effort, you could reach Advanced level.",
    "notification": "New challenge available: Node.js REST API - matches your skill level perfectly!",
    "weeklyDigest": "This week: 3 hours coding, 2 challenges completed. Excellent progress! 🎉",
    "motivationalTip": "Every expert was once a beginner. You're doing amazing! Keep learning! 🚀"
  },
  "timestamp": "2026-04-09T10:30:00Z"
}
```

---

### 6. Get Challenges
```http
GET /api/user/challenges?category=Web%20Dev&difficulty=Medium
Authorization: Bearer {token}
```

**Query Parameters:**
- `category` (optional): Web Dev | ML/AI | Mobile | DevOps | Cloud | Data Science
- `difficulty` (optional): Easy | Medium | Hard

**Response:**
```json
{
  "success": true,
  "challenges": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "React Todo App",
      "description": "Build a fully functional todo application...",
      "difficulty": "Medium",
      "category": "Web Dev",
      "requiredSkills": ["React", "JavaScript"],
      "points": 150,
      "completedBy": ["507f1f77bcf86cd799439011"],
      "createdAt": "2026-03-01T00:00:00Z"
    }
  ]
}
```

---

### 7. Complete Challenge
```http
POST /api/user/complete-challenge
Authorization: Bearer {token}
Content-Type: application/json

{
  "challengeId": "507f191e810c19729de860ea"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Challenge completed!",
  "points": 150,
  "newTotal": 500
}
```

---

## 👥 Team Endpoints

### 8. Get Team Matches
```http
GET /api/team/matches
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "matches": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Sarah Chen",
      "email": "sarah@example.com",
      "avatar": "https://api.dicebear.com/...",
      "rank": "Advanced",
      "skills": ["Python", "TensorFlow", "ML"],
      "points": 950
    }
  ]
}
```

---

### 9. Create Team
```http
POST /api/team/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Code Warriors",
  "description": "Building awesome projects together",
  "memberIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Team created successfully",
  "team": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Code Warriors",
    "description": "Building awesome projects together",
    "members": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
    "leader": "507f1f77bcf86cd799439011",
    "skills": [],
    "projects": [],
    "points": 0
  }
}
```

---

### 10. Get Leaderboard
```http
GET /api/team/leaderboard
```

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Sarah Chen",
      "email": "sarah@example.com",
      "avatar": "https://api.dicebear.com/...",
      "points": 1200,
      "rank": "Expert",
      "activity": 20
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Mike Williams",
      "email": "mike@example.com",
      "avatar": "https://api.dicebear.com/...",
      "points": 950,
      "rank": "Advanced",
      "activity": 18
    }
  ]
}
```

---

## ❌ Error Responses

### Authentication Error (401)
```json
{
  "success": false,
  "message": "No token provided"
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Please provide name, email, and password"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "User not found"
}
```

### Conflict Error (409)
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"Pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Pass123"}'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Complete Challenge
```bash
curl -X POST http://localhost:5000/api/user/complete-challenge \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"challengeId":"507f191e810c19729de860ea"}'
```

---

## 🔄 Testing with Postman

1. **Import Collection**
   - Download Postman
   - Create new Collection "NexusHub API"

2. **Set Up Variables**
   ```
   {{baseUrl}} = http://localhost:5000/api
   {{token}} = (auto-filled after login)
   ```

3. **Add Requests**
   - Register
   - Login
   - Get Profile
   - Update Profile
   - Get Challenges
   - Complete Challenge
   - Get Team Matches
   - Get Leaderboard

4. **Use Pre-Request Script**
   ```javascript
   // For login request
   var response = pm.response.json();
   pm.environment.set("token", response.token);
   ```

---

## 📊 Data Models Reference

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  skills: [String],
  rank: "Beginner" | "Intermediate" | "Advanced" | "Expert",
  points: Number,
  activity: Number,
  challenges: [ObjectId],      // Challenge IDs
  team: ObjectId | null,       // Team ID
  notifications: [{
    message: String,
    type: String,
    read: Boolean,
    createdAt: Date
  }],
  lastActive: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Challenge Schema
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  difficulty: "Easy" | "Medium" | "Hard",
  category: String,
  requiredSkills: [String],
  points: Number,
  completedBy: [ObjectId],    // User IDs
  createdAt: Date,
  updatedAt: Date
}
```

### Team Schema
```javascript
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  members: [ObjectId],         // User IDs
  leader: ObjectId,            // User ID
  skills: [String],
  projects: [String],
  points: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 💾 Rate Limits

Currently, rate limiting is not implemented but recommended:

```
GET requests: 100 per 15 minutes
POST requests: 50 per 15 minutes
PUT requests: 50 per 15 minutes
```

---

## 🔒 Security Headers

Recommended headers set by Express:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

---

## 📱 Frontend Integration Examples

### JavaScript (Fetch API)

#### Login
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
});

const data = await response.json();
localStorage.setItem('token', data.token);
```

#### Get Profile
```javascript
const response = await fetch('http://localhost:5000/api/user/profile', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

const data = await response.json();
console.log(data.user);
```

### React Example
```javascript
import { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return loading ? <div>Loading...</div> : <div>{user.name}</div>;
}
```

---

## ✅ Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "NexusHub API is running",
  "timestamp": "2026-04-09T10:30:00Z"
}
```

---

## 📞 Support

For API issues:
1. Check this documentation
2. Verify endpoint URL
3. Confirm token is valid
4. Check request body format
5. Review error message
6. See troubleshooting in README

---

**API Version**: 1.0.0  
**Last Updated**: April 2026  
**Status**: Production Ready ✅
