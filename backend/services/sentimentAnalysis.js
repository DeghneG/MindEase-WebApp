// Logic for determining stress levels

const analyze = async (message) => {
  // TODO: Integrate with a sentiment analysis API
  // This is a placeholder implementation using keyword matching

  const lowerMessage = message.toLowerCase();

  const highStressKeywords = [
    'hopeless', 'cant take it', "can't take it", 'give up', 'overwhelmed',
    'panic', 'crisis', 'breaking down', 'crying', 'desperate', 'failing',
    'worthless', 'helpless', 'exhausted', 'burned out', 'burnout'
  ];

  const moderateStressKeywords = [
    'stressed', 'anxious', 'worried', 'nervous', 'pressure',
    'deadline', 'struggling', 'difficult', 'hard', 'tough',
    'confused', 'frustrated', 'tired', 'cant sleep', "can't sleep"
  ];

  let stressLevel = 'low';
  let score = 0;

  for (const keyword of highStressKeywords) {
    if (lowerMessage.includes(keyword)) {
      stressLevel = 'high';
      score = 0.9;
      break;
    }
  }

  if (stressLevel === 'low') {
    for (const keyword of moderateStressKeywords) {
      if (lowerMessage.includes(keyword)) {
        stressLevel = 'moderate';
        score = 0.5;
        break;
      }
    }
  }

  return {
    stressLevel,
    score,
    message,
  };
};

module.exports = { analyze };
