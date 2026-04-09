#!/bin/bash
# ============================================
# NEXUSHUB SETUP SCRIPT
# ============================================

echo "╔════════════════════════════════════════╗"
echo "║   🚀 NexusHub Setup Script             ║"
echo "║   AI-Powered Tech Club Platform        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js is installed${NC}"
echo "  Version: $(node --version)"
echo ""

# Check if MongoDB is available
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB is not installed${NC}"
    echo "Please install MongoDB from https://www.mongodb.com/try/download/community"
    echo "Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
    echo ""
fi

# Setup Backend
echo -e "${BLUE}--- Setting up Backend ---${NC}"
cd backend

# Install dependencies
echo "Installing dependencies..."
npm install

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp ../.env.example .env
    echo -e "${YELLOW}⚠ Please update .env with your configuration${NC}"
    echo "  Required:"
    echo "  - MONGODB_URI"
    echo "  - JWT_SECRET"
    echo "  - GROQ_API_KEY"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

echo ""
echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Summary
echo "╔════════════════════════════════════════╗"
echo "║   📋 NEXT STEPS                        ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "1️⃣  Update configuration:"
echo "    Edit backend/.env with your settings"
echo ""
echo "2️⃣  Start MongoDB:"
echo "    mongod"
echo ""
echo "3️⃣  Seed sample data (optional):"
echo "    cd backend && node seed.js"
echo ""
echo "4️⃣  Start Backend Server:"
echo "    cd backend && npm run dev"
echo ""
echo "5️⃣  Start Frontend Server:"
echo "    cd frontend && python -m http.server 3000"
echo "    (or use any local server)"
echo ""
echo "6️⃣  Open in browser:"
echo "    http://localhost:3000"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
