import Groq from 'groq-sdk';

// Initialize with fallback if key is missing or dummy
const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'sk-placeholder-key',
  dangerouslyAllowBrowser: true,
});

const MASTER_PROMPT = `You are NexusHub AI - an intelligent mentor for a college tech club platform. 
You provide personalized guidance, recommendations, and insights based on user data.
Respond in valid JSON format ONLY with the following structure:
{
  "mentorResponse": "A personalized mentoring message",
  "challengeRecommendation": "Recommended challenge based on skills",
  "teamMatchSuggestion": "Teammate matching advice",
  "growthInsight": "Growth timeline and learning path",
  "notification": "Smart notification for the user",
  "weeklyDigest": "Weekly progress summary",
  "motivationalTip": "Motivational message"
}`;

export const callAIEngine = async (userData) => {
  try {
    const userDataStr = `
User: ${userData.name}
Skills: ${userData.skills.join(', ') || 'Not specified'}
Rank: ${userData.rank || 'Beginner'}
Challenges Completed: ${userData.challenges?.length || 0}
Activity Level: ${userData.activity || 'Not tracked'}
Bio: ${userData.bio || 'No bio'}
    `;

    const message = await groqClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${MASTER_PROMPT}\n\nUser Data:\n${userDataStr}\n\nProvide personalized AI responses.`,
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: 'json_object' },
    });

    const responseText = message.choices[0].message.content;
    const jsonResponse = JSON.parse(responseText);

    return {
      success: true,
      data: jsonResponse,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('AI Engine Error:', error.message);
    return {
      success: false,
      error: error.message,
      fallback: {
        mentorResponse: 'Great work! Keep pushing your boundaries and exploring new technologies.',
        challengeRecommendation: 'Try building a full-stack project to level up your skills.',
        teamMatchSuggestion: 'Look for teammates with complementary skills to yours.',
        growthInsight: 'You are on the right track. Focus on consistency.',
        notification: 'New challenge available matching your skill level!',
        weeklyDigest: 'This week: 3 hours coding, 1 project completed. Excellent progress!',
        motivationalTip: 'Every expert was once a beginner. Keep learning!',
      },
    };
  }
};

export default groqClient;
