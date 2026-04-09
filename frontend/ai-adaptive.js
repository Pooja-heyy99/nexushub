// ============================================
// ADVANCED AI ENGINE - REAL-TIME ADAPTIVE SYSTEM
// ============================================

// Real-time Adaptive Recommendation Engine
class AdaptiveAIEngine {
  constructor(userData) {
    this.userData = userData;
    this.behavior = this.analyzeBehavior();
    this.recommendations = [];
  }

  // Track user behavior patterns
  analyzeBehavior() {
    const user = this.userData;
    return {
      activityLevel: this.calculateActivityLevel(user.activity),
      skillLevel: this.determineSkillLevel(user.rank),
      learningPace: this.determineLearningPace(user.challenges),
      engagementScore: this.calculateEngagement(user),
      preferredCategories: this.extractPreferences(user.challenges),
      improvementAreas: this.identifyWeaknesses(user.skills),
      motivationLevel: this.assessMotivation(user),
    };
  }

  calculateActivityLevel(activity) {
    // Scale: 0-100
    return Math.min(activity * 10, 100);
  }

  determineSkillLevel(rank) {
    const levels = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4,
    };
    return levels[rank] || 1;
  }

  determineLearningPace(challenges) {
    // Analyze how quickly user completes challenges
    if (challenges.length < 2) return 'slow';
    const pace = challenges.length / 30; // per day estimate
    if (pace > 1) return 'fast';
    if (pace > 0.3) return 'moderate';
    return 'slow';
  }

  calculateEngagement(user) {
    const lastActiveDays = this.daysSinceLastActive(user.lastActive);
    if (lastActiveDays === 0) return 100;
    if (lastActiveDays < 7) return 80;
    if (lastActiveDays < 30) return 50;
    return 20;
  }

  daysSinceLastActive(lastActive) {
    const now = new Date();
    const last = new Date(lastActive);
    return Math.floor((now - last) / (1000 * 60 * 60 * 24));
  }

  extractPreferences(challenges) {
    // Find most engaged categories
    const categoryMap = {};
    challenges.forEach(chall => {
      categoryMap[chall.category] = (categoryMap[chall.category] || 0) + 1;
    });
    return Object.keys(categoryMap).sort((a, b) => categoryMap[b] - categoryMap[a]);
  }

  identifyWeaknesses(skills) {
    // Skills user should focus on
    const allSkills = [
      'JavaScript', 'React', 'Node.js', 'Python', 'Django',
      'Machine Learning', 'Data Science', 'DevOps', 'Cloud',
      'iOS', 'Android', 'Web Dev', 'Backend', 'Frontend'
    ];
    return allSkills.filter(skill => !skills.includes(skill)).slice(0, 5);
  }

  assessMotivation(user) {
    // 0-10 scale
    const pointsRecent = this.recentPoints(user) / 100;
    const streakBonus = user.activity > 5 ? 3 : 0;
    return Math.min(pointsRecent + streakBonus, 10);
  }

  recentPoints(user) {
    // Points from last 7 days (estimate)
    return user.points > 0 ? Math.min(user.points / 10, 100) : 0;
  }

  // Generate real-time adaptive recommendations
  getAdaptiveRecommendations() {
    return {
      nextChallenge: this.recommendNextChallenge(),
      skillToLearn: this.recommendSkillToLearn(),
      teamMateProfile: this.recommendTeammate(),
      learningResources: this.recommendResources(),
      engagementTrigger: this.getEngagementTrigger(),
      motivationalMessage: this.generateMotivation(),
    };
  }

  recommendNextChallenge() {
    const behavior = this.behavior;
    const difficulty = this.difficulty[behavior.skillLevel];
    const category = behavior.preferredCategories[0] || 'General';
    
    return {
      difficulty,
      category,
      reason: `Based on your ${difficulty} level and interest in ${category}`,
      estimatedTime: this.estimateTime(difficulty),
    };
  }

  difficulty = { 1: 'Easy', 2: 'Medium', 3: 'Hard', 4: 'Expert' };

  estimateTime(difficulty) {
    const times = { 'Easy': 30, 'Medium': 60, 'Hard': 120, 'Expert': 180 };
    return times[difficulty] || 60;
  }

  recommendSkillToLearn() {
    const weaknesses = this.behavior.improvementAreas;
    const preferredCategory = this.behavior.preferredCategories[0] || 'Web Dev';
    
    return {
      skill: weaknesses[0],
      relatedCategory: preferredCategory,
      reason: `Missing in ${preferredCategory}. Only ${this.userData.skills.length} skills mastered so far.`,
      resources: this.getResourcesForSkill(weaknesses[0]),
    };
  }

  getResourcesForSkill(skill) {
    const resourceMap = {
      'JavaScript': ['MDN JavaScript Guide', 'JavaScript.info', 'FreeCodeCamp JS'],
      'React': ['React Official Docs', 'React.dev', 'Epic React'],
      'Python': ['Python.org Docs', 'Real Python', 'DataCamp Python'],
      'Machine Learning': ['Fast.ai', 'Coursera ML Course', 'Kaggle Learn'],
    };
    return resourceMap[skill] || ['Pluralsight', 'Udemy', 'YouTube'];
  }

  recommendTeammate() {
    return {
      profile: 'Complementary skills user',
      skillGap: 'JavaScript - needs Python developer',
      compatibility: '92% match',
      reason: 'Your strength is their weakness',
    };
  }

  recommendResources() {
    const category = this.behavior.preferredCategories[0];
    return {
      primary: `${category} Advanced Guide`,
      secondary: `Building projects with ${category}`,
      difficulty: this.behavior.skillLevel > 2 ? 'Advanced' : 'Intermediate',
    };
  }

  getEngagementTrigger() {
    const lastActive = this.daysSinceLastActive(this.userData.lastActive);
    
    if (lastActive > 7) {
      return {
        type: 'inactive',
        message: `It's been ${lastActive} days! Jump back in with a new challenge.`,
        action: 'recommend_challenge',
      };
    } else if (this.userData.points % 100 === 0) {
      return {
        type: 'milestone',
        message: `🎉 Milestone reached! You're ${this.userData.rank} now.`,
        action: 'celebrate',
      };
    } else {
      return {
        type: 'encouragement',
        message: 'Keep the streak going! One more challenge today?',
        action: 'promote_challenge',
      };
    }
  }

  generateMotivation() {
    const messages = {
      1: '🌟 You\'re just starting! Every expert was once a beginner.',
      2: '💪 You\'re progressing fast! Keep pushing forward.',
      3: '🚀 You\'re almost there! Advanced challenges await.',
      4: '👑 You\'re a master! Help others grow.',
    };
    return messages[this.behavior.skillLevel];
  }
}

// Export for use
window.AdaptiveAIEngine = AdaptiveAIEngine;
