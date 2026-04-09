# 🚀 NexusHub - Deployment Guide

## Deployment Overview

This guide covers deploying NexusHub to production with industry best practices.

---

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database backed up
- [ ] Frontend bundle optimized
- [ ] Backend error handling tested
- [ ] Security measures in place
- [ ] API rate limiting configured
- [ ] Monitoring set up
- [ ] DNS/Domain configured
- [ ] SSL certificate ready

---

## Backend Deployment

### Option 1: Heroku (Easiest)

#### Prerequisites
```bash
npm install -g heroku
heroku login
```

#### Steps
```bash
cd nexushub/backend

# Create Heroku app
heroku create nexushub-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set GROQ_API_KEY=your_groq_api_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Update Frontend
```javascript
// In frontend/script.js
const API_BASE_URL = 'https://nexushub-api.herokuapp.com/api';
```

### Option 2: Render (Recommended)

#### Steps
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Configure:
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment variables (same as .env)
6. Deploy

#### Update Frontend
```javascript
const API_BASE_URL = 'https://nexushub-api.onrender.com/api';
```

### Option 3: AWS EC2

#### Steps
1. Launch EC2 instance (Ubuntu 20.04)
2. Connect via SSH
3. Install Node.js and MongoDB
4. Clone repository
5. Configure .env
6. Use PM2 for process management:

```bash
npm install -g pm2

# Start server
pm2 start server.js --name "nexushub-api"

# Save PM2 configuration
pm2 save

# Setup PM2 to restart on reboot
pm2 startup
```

7. Configure Nginx as reverse proxy:

```nginx
upstream nexushub_backend {
  server localhost:5000;
}

server {
  listen 80;
  server_name api.nexushub.dev;

  location / {
    proxy_pass http://nexushub_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

8. Enable HTTPS with Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.nexushub.dev
```

---

## Frontend Deployment

### Option 1: Netlify (Best for Static Sites)

#### Method A: GitHub Integration
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect GitHub account
4. Select repository
5. Configure:
   - Build command: (leave blank for static site)
   - Publish directory: `frontend`
6. Deploy
7. Set custom domain

#### Method B: CLI
```bash
npm install -g netlify-cli
cd nexushub/frontend
netlify deploy --prod
```

### Option 2: Vercel

```bash
npm install -g vercel

# Deploy
cd nexushub/frontend
vercel --prod

# Set environment variables in Vercel dashboard
```

### Option 3: GitHub Pages

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Copy frontend files to root (if needed)
# Push branch
git push origin gh-pages

# Enable Pages in GitHub repo settings
```

### Option 4: AWS S3 + CloudFront

#### Steps
1. Create S3 bucket
2. Upload frontend files
3. Enable static website hosting
4. Create CloudFront distribution
5. Set custom domain

```bash
aws s3 sync frontend s3://nexushub-front --delete
```

### Option 5: AWS Amplify

```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

---

## Database Deployment

### MongoDB Atlas (Recommended)

#### Steps
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create new project
4. Create cluster (M0 free tier)
5. Set up database user
6. Whitelist IP addresses
7. Get connection string
8. Add to environment variable:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexushub?retryWrites=true&w=majority
```

#### Backup Strategy
```bash
# Regular mongodump backups
mongodump --uri="mongodb+srv://..." --out=backups/

# Automated backups (set up in Atlas)
# Atlas Dashboard → Backup → Enable Automated Backups
```

### Self-Hosted MongoDB

For production on dedicated server:

```bash
# Install MongoDB
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod

# Create admin user
mongo
> use admin
> db.createUser({user: "admin", pwd: "password", roles: ["root"]})

# Update connection string
MONGODB_URI=mongodb://admin:password@localhost:27017/nexushub?authSource=admin
```

---

## Environment Configuration

### Production .env
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nexushub

# JWT
JWT_SECRET=your_secure_random_key_min_32_chars

# Groq API
GROQ_API_KEY=gsk_your_key_here

# Server
PORT=5000
NODE_ENV=production

# CORS
FRONTEND_URL=https://nexushub.dev

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Security Best Practices
1. **Never commit .env** - Use .gitignore
2. **Use strong secrets** - Generate with `crypto.randomBytes(32).toString('hex')`
3. **Rotate secrets regularly** - Every 90 days
4. **Use managed services** - For secrets management
5. **Enable HTTPS** - Always in production

---

## Post-Deployment

### 1. Monitoring

#### NewRelic
```bash
npm install newrelic --save
# Add to server.js top:
# require('newrelic');
```

#### Datadog
```bash
npm install @datadog/browser-rum
```

#### Error Tracking - Sentry
```bash
npm install @sentry/node
npm install @sentry/tracing

# In server.js
import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: "your_sentry_dsn",
  environment: "production"
});
```

### 2. Logging

```javascript
// Use structured logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'nexushub-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Use in routes
logger.info('User logged in', { userId: user._id });
```

### 3. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Health Checks

```javascript
// In server.js
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

### 5. Performance Optimization

#### Compression
```bash
npm install compression
```

```javascript
import compression from 'compression';
app.use(compression());
```

#### Caching
```javascript
app.get('/api/challenges', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  // ... rest of handler
});
```

### 6. Database Optimization

```javascript
// Add indexes to MongoDB
db.users.createIndex({ email: 1 });
db.challenges.createIndex({ category: 1 });
db.challenges.createIndex({ difficulty: 1 });
```

---

## Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: |
          cd backend
          npm install
      
      - name: Run tests
        run: |
          cd backend
          npm test
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "nexushub-api"
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - deploy

test:
  stage: test
  image: node:16
  script:
    - cd backend && npm install && npm test

deploy:
  stage: deploy
  script:
    - cd backend && npm install
    - heroku git:remote -a nexushub-api
    - git push heroku main
```

---

## Domain & DNS

### Subdomain Setup

```
API: api.nexushub.dev → Backend Server
WWW: nexushub.dev → Frontend (Netlify/Vercel)
```

### DNS Records
```
Type: A
Name: api
Value: 1.2.3.4 (Your backend IP)

Type: CNAME
Name: www
Value: nexushub.dev

Type: MX
For email support
```

---

## SSL Certificate

### Let's Encrypt (Free)

```bash
sudo apt install certbot

# For Nginx
sudo certbot certonly --nginx -d api.nexushub.dev

# For Standalone
sudo certbot certonly --standalone -d api.nexushub.dev

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Auto-Renewal with Crond
```bash
0 3 * * * certbot renew --quiet
```

---

## Scaling

### Horizontal Scaling
```javascript
// Use load balancer (Nginx, HAProxy)
// Deploy multiple backend instances
// Use sticky sessions for JWT
```

### Vertical Scaling
```bash
# Increase server resources
# Upgrade database tier
# Optimize queries
```

### Database Scaling
```javascript
// MongoDB sharding
// Read replicas
// Connection pooling
```

---

## Backup & Recovery

### Automated Backups
```bash
# MongoDB Atlas - Enable automated backups
# AWS - Enable RDS backups
# Self-hosted - Use cron jobs

# Monthly backup schedule
0 2 1 * * mongodump --uri="..." --out=/backups/$(date +\%Y-\%m-\%d)
```

### Disaster Recovery Plan
1. **RTO** (Recovery Time Objective): < 1 hour
2. **RPO** (Recovery Point Objective): < 15 minutes
3. **Backup frequency**: Every 6 hours
4. **Backup location**: Different region/provider

---

## Monitoring Dashboard

### Key Metrics
- ✅ API Response Time
- ✅ Error Rate
- ✅ CPU Usage
- ✅ Memory Usage
- ✅ Database Query Time
- ✅ Active Users
- ✅ Request Volume
- ✅ Uptime %

### Recommended Tools
- **Datadog** - Complete monitoring
- **New Relic** - APM
- **PagerDuty** - Alerting
- **CloudFlare** - CDN & DDoS
- **UptimeRobot** - Uptime monitoring

---

## Go-Live Checklist

- [ ] Backend deployed and tested
- [ ] Frontend deployed and tested
- [ ] Database configured and backed up
- [ ] SSL certificate installed
- [ ] DNS records configured
- [ ] Monitoring active
- [ ] Error tracking configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Load testing completed
- [ ] Team trained on deployment
- [ ] Rollback procedure documented
- [ ] SLA defined

---

## Post-Launch Monitoring

### First 24 Hours
- Monitor error rates
- Check API response times
- Verify database stability
- Watch user registration
- Monitor CPU/Memory

### First Week
- Analyze performance metrics
- Identify bottlenecks
- Optimize queries
- Scale as needed
- Gather user feedback

### Ongoing
- Daily log review
- Weekly performance analysis
- Monthly optimization
- Quarterly security audit
- Annual disaster recovery test

---

## Rollback Procedure

### If Issues Detected

```bash
# Backend Rollback (Heroku)
heroku releases
heroku rollback v999

# Frontend Rollback (Netlify)
# Go to Deploys → Select previous version → Publish

# Database Rollback
# Use MongoDB backups
mongorestore --uri="..." backup/nexushub
```

---

## Cost Estimation

### Monthly Costs (Production)
| Service | Cost | Notes |
|---------|------|-------|
| MongoDB Atlas | $57 | M10 cluster |
| Heroku Dyno | $50 | 2x Standard |
| Netlify | Free | Pro: $19 |
| Groq API | $5-20 | Based on usage |
| Domain | $12 | .dev domain |
| **Total** | **~$124** | **Starting** |

---

**Happy Deploying! 🚀**

For more help, check the official documentation:
- [Heroku Docs](https://devcenter.heroku.com)
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
