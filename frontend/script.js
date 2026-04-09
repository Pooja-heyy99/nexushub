// ============================================
// NEXUSHUB - FRONTEND JAVASCRIPT
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';

let currentUser = null;
let allChallenges = [];
let currentPage = 'overview';

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
    checkAuthStatus();
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

document.getElementById('themeToggle')?.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Landing Page
    document.getElementById('getStartedBtn')?.addEventListener('click', openAuthModal);
    document.getElementById('learnMoreBtn')?.addEventListener('click', scrollToFeatures);
    document.getElementById('navLoginBtn')?.addEventListener('click', openAuthModal);

    // Auth Modal
    document.getElementById('toSignup')?.addEventListener('click', toggleAuthForm);
    document.getElementById('toLogin')?.addEventListener('click', toggleAuthForm);
    document.querySelector('.modal-close')?.addEventListener('click', closeAuthModal);
    document.getElementById('authModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'authModal') closeAuthModal();
    });

    // Auth Forms
    document.getElementById('loginSubmit')?.addEventListener('submit', handleLogin);
    document.getElementById('signupSubmit')?.addEventListener('submit', handleSignup);

    // Dashboard
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);

    // Challenges
    document.getElementById('categoryFilter')?.addEventListener('change', filterChallenges);
    document.getElementById('difficultyFilter')?.addEventListener('change', filterChallenges);
    document.getElementById('refreshAIBtn')?.addEventListener('click', refreshAIEngine);

    // Profile
    document.getElementById('profileForm')?.addEventListener('submit', handleProfileUpdate);

    // Chat
    document.getElementById('chatForm')?.addEventListener('submit', handleChatSubmit);

    // Search
    document.getElementById('searchInput')?.addEventListener('input', handleSearch);

    // Notification
    document.querySelector('.notification-btn')?.addEventListener('click', toggleNotifications);
}

// ============================================
// AUTHENTICATION
// ============================================

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!data.success) {
            showToast(data.message || 'Login failed', 'error');
            return;
        }

        localStorage.setItem('token', data.token);
        currentUser = data.user;
        
        closeAuthModal();
        showDashboard();
        loadDashboardData();
        showToast('Welcome back! 🎉', 'success');
    } catch (error) {
        showToast('Error logging in: ' + error.message, 'error');
        console.error('Login error:', error);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!data.success) {
            showToast(data.message || 'Signup failed', 'error');
            return;
        }

        localStorage.setItem('token', data.token);
        currentUser = data.user;
        
        closeAuthModal();
        showDashboard();
        loadDashboardData();
        showToast('Account created! Welcome to NexusHub 🚀', 'success');
    } catch (error) {
        showToast('Error signing up: ' + error.message, 'error');
        console.error('Signup error:', error);
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    currentUser = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('landingPage').classList.remove('hidden');
    showToast('Logged out successfully', 'success');
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token && currentUser) {
        showDashboard();
        loadDashboardData();
    } else {
        showLanding();
    }
}

// ============================================
// DASHBOARD MANAGEMENT
// ============================================

function showDashboard() {
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    updateUserDisplay();
}

function showLanding() {
    document.getElementById('landingPage').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function updateUserDisplay() {
    if (!currentUser) return;
    
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`;
    document.getElementById('userAvatar').src = avatar;
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRank').textContent = currentUser.rank || 'Beginner';
    document.getElementById('profileAvatar').src = avatar;
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
}

async function loadDashboardData() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        // Load user profile
        const profileResponse = await fetch(`${API_BASE_URL}/user/profile`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const profileData = await profileResponse.json();
        
        if (profileData.success) {
            currentUser = { ...currentUser, ...profileData.user };
            updateUserDisplay();
            updateDashboardStats();
        }

        // Load challenges
        loadChallenges(token);
        
        // Load AI Engine
        loadAIEngine(token);
        
        // Load leaderboard
        loadLeaderboard();
        
        // Load team matches
        loadTeamMatches(token);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

async function updateDashboardStats() {
    if (!currentUser) return;

    document.getElementById('userPoints').textContent = currentUser.points || 0;
    document.getElementById('challengesCompleted').textContent = currentUser.challenges?.length || 0;
    document.getElementById('userActivity').textContent = currentUser.activity || 0;
    document.getElementById('userTeam').textContent = currentUser.team ? 'Active' : 'None';
}

// ============================================
// CHALLENGES
// ============================================

async function loadChallenges(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/challenges`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
            allChallenges = data.challenges;
            renderChallenges(allChallenges);
        }
    } catch (error) {
        console.error('Error loading challenges:', error);
    }
}

function renderChallenges(challenges) {
    const container = document.getElementById('challengesList');
    const recentContainer = document.getElementById('recentChallengesContainer');

    if (!challenges || challenges.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No challenges available</p>';
        return;
    }

    const challengesHTML = challenges.map((challenge, index) => `
        <div class="challenge-card">
            <div class="challenge-header">
                <span class="challenge-title">${challenge.title}</span>
                <span class="challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()}">
                    ${challenge.difficulty}
                </span>
            </div>
            <span class="challenge-category">${challenge.category}</span>
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-footer">
                <span class="challenge-points">+${challenge.points} pts</span>
                <button class="challenge-complete-btn" onclick="completeChallenge('${challenge._id}')">
                    ${currentUser?.challenges?.includes(challenge._id) ? '✓ Done' : 'Complete'}
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = challengesHTML;

    // Show recent challenges (first 3)
    if (recentContainer) {
        const recentHTML = challenges.slice(0, 3).map(challenge => `
            <div class="challenge-card">
                <span class="challenge-title">${challenge.title}</span>
                <span class="challenge-category">${challenge.category}</span>
                <div class="challenge-footer" style="margin-top: 1rem;">
                    <span class="challenge-points">+${challenge.points}</span>
                </div>
            </div>
        `).join('');
        recentContainer.innerHTML = recentHTML;
    }
}

async function completeChallenge(challengeId) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE_URL}/user/complete-challenge`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ challengeId }),
        });

        const data = await response.json();
        if (data.success) {
            currentUser.points = data.newTotal;
            currentUser.challenges = currentUser.challenges || [];
            currentUser.challenges.push(challengeId);
            updateDashboardStats();
            renderChallenges(allChallenges);
            showToast(`Challenge completed! +${data.points} points 🎉`, 'success');
        }
    } catch (error) {
        showToast('Error completing challenge', 'error');
        console.error('Error:', error);
    }
}

function filterChallenges() {
    const category = document.getElementById('categoryFilter')?.value;
    const difficulty = document.getElementById('difficultyFilter')?.value;

    let filtered = allChallenges;
    
    if (category) {
        filtered = filtered.filter(c => c.category === category);
    }
    if (difficulty) {
        filtered = filtered.filter(c => c.difficulty === difficulty);
    }

    renderChallenges(filtered);
}

// ============================================
// AI MENTOR
// ============================================

async function loadAIEngine(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/ai-engine`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success && data.data) {
            renderAIResponse(data.data);
        }
    } catch (error) {
        console.error('Error loading AI Engine:', error);
    }
}

function renderAIResponse(aiData) {
    const container = document.getElementById('aiMentorContent');
    
    const html = `
        <div class="ai-response-item">
            <div class="ai-response-label">💬 Mentor Message</div>
            <div class="ai-response-text">${aiData.mentorResponse || 'Loading...'}</div>
        </div>
        <div class="ai-response-item">
            <div class="ai-response-label">🎯 Challenge Recommendation</div>
            <div class="ai-response-text">${aiData.challengeRecommendation || 'Loading...'}</div>
        </div>
        <div class="ai-response-item">
            <div class="ai-response-label">👥 Team Matching</div>
            <div class="ai-response-text">${aiData.teamMatchSuggestion || 'Loading...'}</div>
        </div>
        <div class="ai-response-item">
            <div class="ai-response-label">📈 Growth Insight</div>
            <div class="ai-response-text">${aiData.growthInsight || 'Loading...'}</div>
        </div>
        <div class="ai-response-item">
            <div class="ai-response-label">💡 Motivational Tip</div>
            <div class="ai-response-text">${aiData.motivationalTip || 'Loading...'}</div>
        </div>
    `;
    
    container.innerHTML = html;
}

function refreshAIEngine() {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const container = document.getElementById('aiMentorContent');
    container.innerHTML = '<div class="skeleton-loader"></div>';
    
    setTimeout(() => loadAIEngine(token), 500);
}

async function handleChatSubmit(e) {
    e.preventDefault();
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    const messagesContainer = document.getElementById('chatMessages');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message user';
    userMessageDiv.textContent = message;
    messagesContainer.appendChild(userMessageDiv);
    
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate AI response (in production, this would call the backend)
    setTimeout(() => {
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'chat-message ai';
        aiMessageDiv.textContent = getAIResponse(message);
        messagesContainer.appendChild(aiMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
}

function getAIResponse(userMessage) {
    // Simple AI responses based on keywords
    const responses = {
        challenge: "Great question! I recommend starting with a beginner-level challenge to build your foundation.",
        team: "Finding the right teammate is important. Look for someone with complementary skills to yours.",
        learn: "Learning is a journey! Focus on consistency over intensity. Practice a little bit every day.",
        build: "Building projects is one of the best ways to learn. Start with something simple and scale up.",
        help: "I'm here to help! Ask me about challenges, team matching, learning paths, or anything else tech-related.",
        default: "That's a great question! Keep pushing your boundaries and learning new things. You're doing great! 🚀"
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    return responses.default;
}

// ============================================
// TEAM MATCHING
// ============================================

async function loadTeamMatches(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/team/matches`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
            renderTeamMatches(data.matches);
        }
    } catch (error) {
        console.error('Error loading team matches:', error);
    }
}

function renderTeamMatches(matches) {
    const container = document.getElementById('teamMatchesList');

    if (!matches || matches.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No team matches available</p>';
        return;
    }

    const matchesHTML = matches.map(match => `
        <div class="team-match-card">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${match.email}" alt="${match.name}" class="teammate-avatar">
            <div class="teammate-name">${match.name}</div>
            <div class="teammate-rank">${match.rank}</div>
            <div class="teammate-skills">
                ${match.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <button class="teammate-action-btn" onclick="inviteTeammate('${match._id}')">
                Invite to Team
            </button>
        </div>
    `).join('');

    container.innerHTML = matchesHTML;
}

function inviteTeammate(userId) {
    showToast('Invite sent! 📬 They will see it in their notifications.', 'success');
}

// ============================================
// LEADERBOARD
// ============================================

async function loadLeaderboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/team/leaderboard`);
        const data = await response.json();

        if (data.success) {
            renderLeaderboard(data.leaderboard);
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

function renderLeaderboard(leaderboard) {
    const tbody = document.getElementById('leaderboardBody');

    if (!leaderboard || leaderboard.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No users yet</td></tr>';
        return;
    }

    const html = leaderboard.map((user, index) => `
        <tr>
            <td><span class="leaderboard-rank">#${index + 1}</span></td>
            <td>
                <div class="leaderboard-user">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || user._id}" alt="${user.name}" class="leaderboard-avatar">
                    <span class="leaderboard-name">${user.name}</span>
                </div>
            </td>
            <td><span class="leaderboard-points">${user.points}</span></td>
            <td><span class="leaderboard-level">${user.rank}</span></td>
            <td>${user.activity} activities</td>
        </tr>
    `).join('');

    tbody.innerHTML = html;
}

// ============================================
// PROFILE
// ============================================

async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) return;

    const bio = document.getElementById('profileBio').value;
    const skillsStr = document.getElementById('profileSkills').value;
    const skills = skillsStr.split(',').map(s => s.trim()).filter(s => s);

    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bio, skills }),
        });

        const data = await response.json();
        if (data.success) {
            currentUser = { ...currentUser, ...data.user };
            showToast('Profile updated successfully! ✨', 'success');
        }
    } catch (error) {
        showToast('Error updating profile', 'error');
    }
}

// ============================================
// NAVIGATION & PAGES
// ============================================

function handleNavigation(e) {
    const page = e.currentTarget.getAttribute('data-page');
    if (!page) return;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');

    // Update page title
    const titles = {
        overview: 'Overview',
        challenges: 'Challenges',
        team: 'Find Teammates',
        'ai-mentor': 'AI Mentor',
        badges: 'Your Achievements',
        events: 'Upcoming Events',
        resources: 'Learning Resources',
        discussions: 'Community Discussions',
        leaderboard: 'Leaderboard',
        profile: 'Profile',
    };
    document.getElementById('pageTitle').textContent = titles[page] || page;

    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected page
    const pageId = page === 'ai-mentor' ? 'aiMentorPage' : `${page}Page`;
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
        pageElement.classList.add('active');
    }

    // Load page-specific data
    if (page === 'profile') {
        loadProfileData();
    } else if (page === 'leaderboard') {
        loadLeaderboard();
    } else if (page === 'badges') {
        loadBadges();
    } else if (page === 'events') {
        loadEvents();
    } else if (page === 'resources') {
        loadResources();
    } else if (page === 'discussions') {
        loadDiscussions();
    }

    currentPage = page;
}

function loadProfileData() {
    if (!currentUser) return;
    document.getElementById('profileBio').value = currentUser.bio || '';
    document.getElementById('profileSkills').value = (currentUser.skills || []).join(', ');
}

// ============================================
// MODAL & FORM MANAGEMENT
// ============================================

function openAuthModal() {
    document.getElementById('authModal').classList.remove('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('loginSubmit').reset();
    document.getElementById('signupSubmit').reset();
}

function toggleAuthForm() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('signupForm').classList.toggle('hidden');
}

function scrollToFeatures() {
    document.querySelector('.features-grid')?.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// SEARCH & FILTER
// ============================================

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (currentPage === 'challenges') {
        const filtered = allChallenges.filter(c =>
            c.title.toLowerCase().includes(query) ||
            c.description.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query)
        );
        renderChallenges(filtered);
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

function toggleNotifications() {
    const dropdown = document.getElementById('notificationList');
    dropdown.classList.toggle('hidden');
    
    if (!dropdown.classList.contains('hidden')) {
        loadNotifications();
    }
}

function loadNotifications() {
    const dropdown = document.getElementById('notificationList');
    const notifications = currentUser?.notifications || [];

    if (notifications.length === 0) {
        dropdown.innerHTML = '<div style="padding: 1rem; color: var(--text-secondary);">No notifications</div>';
        return;
    }

    const html = notifications.map((notif, index) => `
        <div class="notification-item" onclick="markNotificationRead(${index})">
            <strong>${notif.message}</strong>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">
                ${new Date(notif.createdAt).toLocaleDateString()}
            </div>
        </div>
    `).join('');

    dropdown.innerHTML = html;
}

function markNotificationRead(index) {
    if (currentUser?.notifications) {
        currentUser.notifications[index].read = true;
    }
    toggleNotifications();
}

// ============================================
// UTILITIES
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// SEED DATA INITIALIZATION
// ============================================

async function initializeSampleData() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        // This would initialize sample data in the backend
        console.log('Initializing sample data...');
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

// ============================================
// EXPORT FOR EXTERNAL USE
// ============================================

window.completeChallenge = completeChallenge;
window.inviteTeammate = inviteTeammate;
window.markNotificationRead = markNotificationRead;
