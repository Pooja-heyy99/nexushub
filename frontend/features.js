// ============================================
// NEW FEATURES - BADGES, EVENTS, RESOURCES, DISCUSSIONS
// ============================================

// Load Badges
const loadBadges = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/badges/user`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await response.json();
    if (data.success) {
      renderBadges(data.badges);
    }
  } catch (error) {
    console.error('Error loading badges:', error);
  }
};

const renderBadges = (badges) => {
  const badgesList = document.getElementById('badgesList');
  badgesList.innerHTML = '';
  
  if (badges.length === 0) {
    badgesList.innerHTML = '<p>No badges earned yet. Complete challenges to earn badges!</p>';
    return;
  }

  badges.forEach(badge => {
    const badgeCard = document.createElement('div');
    badgeCard.className = 'badge-card';
    badgeCard.innerHTML = `
      <div class="badge-icon">${badge.icon || '⭐'}</div>
      <div class="badge-name">${badge.name}</div>
      <div class="badge-earned">Earned!</div>
      <p style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${badge.description}</p>
    `;
    badgesList.appendChild(badgeCard);
  });
};

// Load Events
const loadEvents = async (filter = 'all') => {
  try {
    const response = await fetch(`${API_BASE_URL}/events?filter=${filter}`);
    const data = await response.json();
    if (data.success) {
      renderEvents(data.events);
    }
  } catch (error) {
    console.error('Error loading events:', error);
  }
};

const renderEvents = (events) => {
  const eventsList = document.getElementById('eventsList');
  eventsList.innerHTML = '';

  if (events.length === 0) {
    eventsList.innerHTML = '<p>No events found.</p>';
    return;
  }

  events.forEach(event => {
    const eventDate = new Date(event.date).toLocaleDateString();
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <div class="event-header">
        <div class="event-type">${event.eventType.toUpperCase()}</div>
        <div class="event-title">${event.title}</div>
        <div class="event-date">📅 ${eventDate}</div>
      </div>
      <div class="event-body">
        <p class="event-description">${event.description || 'No description'}</p>
        <div class="event-attendees">👥 ${event.attendees.length} attendees</div>
        ${event.location ? `<div style="font-size: 14px;">📍 ${event.location}</div>` : ''}
      </div>
      <div class="event-footer">
        <button class="btn btn-small" onclick="registerEvent('${event._id}')">Register</button>
        <button class="btn btn-small" style="background: transparent; border: 1px solid var(--border-color);">Details</button>
      </div>
    `;
    eventsList.appendChild(eventCard);
  });
};

const registerEvent = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ eventId })
    });
    const data = await response.json();
    if (data.success) {
      showToast('Registered for event!', 'success');
      loadEvents();
    }
  } catch (error) {
    showToast('Error registering for event', 'error');
  }
};

// Load Resources
const loadResources = async (category = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/resources?category=${category}`);
    const data = await response.json();
    if (data.success) {
      renderResources(data.resources);
    }
  } catch (error) {
    console.error('Error loading resources:', error);
  }
};

const renderResources = (resources) => {
  const resourcesList = document.getElementById('resourcesList');
  resourcesList.innerHTML = '';

  if (resources.length === 0) {
    resourcesList.innerHTML = '<p>No resources found.</p>';
    return;
  }

  resources.forEach(resource => {
    const resourceCard = document.createElement('div');
    resourceCard.className = 'resource-card';
    resourceCard.innerHTML = `
      <div class="resource-title">${resource.title}</div>
      <p class="resource-description">${resource.description || ''}</p>
      <div class="resource-meta">
        <span class="resource-tag">${resource.category}</span>
        <span class="resource-tag">${resource.difficulty}</span>
      </div>
      <div class="resource-actions">
        <button class="btn btn-small" onclick="window.open('${resource.url}', '_blank')">Open</button>
        <button class="btn btn-small" onclick="saveResource('${resource._id}')" style="background: transparent; border: 1px solid var(--border-color);">Save</button>
      </div>
    `;
    resourcesList.appendChild(resourceCard);
  });
};

const saveResource = async (resourceId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resources/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ resourceId })
    });
    const data = await response.json();
    if (data.success) {
      showToast('Resource saved!', 'success');
    }
  } catch (error) {
    showToast('Error saving resource', 'error');
  }
};

// Load Discussions
const loadDiscussions = async (category = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/discussions?category=${category}`);
    const data = await response.json();
    if (data.success) {
      renderDiscussions(data.discussions);
    }
  } catch (error) {
    console.error('Error loading discussions:', error);
  }
};

const renderDiscussions = (discussions) => {
  const discussionsList = document.getElementById('discussionsList');
  discussionsList.innerHTML = '';

  if (discussions.length === 0) {
    discussionsList.innerHTML = '<p>No discussions found. Be the first to start one!</p>';
    return;
  }

  discussions.forEach(discussion => {
    const discussionCard = document.createElement('div');
    discussionCard.className = 'discussion-card';
    discussionCard.innerHTML = `
      <div class="discussion-header">
        <div class="discussion-avatar">${discussion.author.name.charAt(0)}</div>
        <div class="discussion-info">
          <div class="discussion-author">${discussion.author.name}</div>
          <div class="discussion-time">${new Date(discussion.createdAt).toLocaleDateString()}</div>
        </div>
        ${discussion.isSolved ? '<span class="discussion-badge">✓ SOLVED</span>' : ''}
      </div>
      <div class="discussion-title">${discussion.title}</div>
      <div class="discussion-content">${discussion.content.substring(0, 150)}...</div>
      <div class="discussion-meta">
        <div class="discussion-stat">💬 ${discussion.replies.length} replies</div>
        <div class="discussion-stat">👁️ ${discussion.views} views</div>
        <div class="discussion-stat">👍 ${discussion.upvotes} upvotes</div>
      </div>
    `;
    discussionsList.appendChild(discussionCard);
  });
};

// Create Discussion
const handleCreateDiscussion = async () => {
  const title = prompt('Discussion title:');
  if (!title) return;

  const content = prompt('Description:');
  if (!content) return;

  try {
    const response = await fetch(`${API_BASE_URL}/discussions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, content, category: 'discussion', tags: [] })
    });
    const data = await response.json();
    if (data.success) {
      showToast('Discussion created!', 'success');
      loadDiscussions();
    }
  } catch (error) {
    showToast('Error creating discussion', 'error');
  }
};

// Event Listeners for New Features
window.addEventListener('load', () => {
  // Badge filters
  // Event filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadEvents(filter === 'all' ? '' : filter);
    });
  });

  // Resource category filter
  const resourceCategory = document.getElementById('resourceCategory');
  if (resourceCategory) {
    resourceCategory.addEventListener('change', (e) => {
      loadResources(e.target.value);
    });
  }

  // Create discussion button
  const createDiscussionBtn = document.getElementById('createDiscussionBtn');
  if (createDiscussionBtn) {
    createDiscussionBtn.addEventListener('click', handleCreateDiscussion);
  }
});
