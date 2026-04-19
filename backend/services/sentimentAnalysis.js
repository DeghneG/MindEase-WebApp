// Logic for determining stress levels

const analyze = async (message) => {
  const lowerMessage = message.toLowerCase();

  let intent = 'general';
  if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('quiz') || lowerMessage.includes('grade')) intent = 'exams';
  else if (lowerMessage.includes('thank') || lowerMessage.includes('appreciate')) intent = 'gratitude';
  else if (lowerMessage.includes('tired') || lowerMessage.includes('sleep') || lowerMessage.includes('exhaustid') || lowerMessage.includes('exhausted')) intent = 'exhaustion';
  else if (lowerMessage.includes('okay') || lowerMessage.includes('fine') || lowerMessage.includes('good') || lowerMessage.includes('better')) intent = 'okay';
  else if (lowerMessage.includes('breath') || lowerMessage.includes('exercise')) intent = 'coping';

  const highStressKeywords = [
    'hopeless', 'cant take it', "can't take it", 'give up', 'overwhelmed',
    'panic', 'crisis', 'breaking down', 'crying', 'desperate', 'failing',
    'worthless', 'helpless', 'exhausted', 'burned out', 'burnout'
  ];

  const moderateStressKeywords = [
    'stressed', 'anxious', 'worried', 'nervous', 'pressure',
    'deadline', 'struggling', 'difficult', 'hard', 'tough',
    'confused', 'frustrated', 'tired', 'cant sleep', "can't sleep",
    'exam', 'test'
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
    intent,
    message,
  };
};

module.exports = { analyze };
