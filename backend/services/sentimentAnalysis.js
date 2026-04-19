// Logic for determining stress levels and user intent

const analyze = async (message) => {
  const lowerMessage = message.toLowerCase();

  let intent = 'general';
  
  // Topic Detection (Intents)
  if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('quiz') || lowerMessage.includes('grade')) {
    intent = 'exams';
  } else if (lowerMessage.includes('organize') || lowerMessage.includes('task') || lowerMessage.includes('schedule') || lowerMessage.includes('plan') || lowerMessage.includes('to-do')) {
    intent = 'productivity';
  } else if (lowerMessage.includes('thank') || lowerMessage.includes('appreciate')) {
    intent = 'gratitude';
  } else if (lowerMessage.includes('tired') || lowerMessage.includes('sleep') || lowerMessage.includes('exhausted') || lowerMessage.includes('sleepy')) {
    intent = 'exhaustion';
  } else if (lowerMessage.includes('sad') || lowerMessage.includes('unhappy') || lowerMessage.includes('cry') || lowerMessage.includes('depressed') || lowerMessage.includes('miserable')) {
    intent = 'sadness';
  } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('nobody')) {
    intent = 'lonely';
  } else if (lowerMessage.includes('okay') || lowerMessage.includes('fine') || lowerMessage.includes('good') || lowerMessage.includes('better')) {
    intent = 'okay';
  } else if (lowerMessage.includes('breath') || lowerMessage.includes('exercise')) {
    intent = 'coping';
  } else if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || lowerMessage.includes('laugh')) {
    intent = 'joke';
  }

  // Stress Level Detection
  const highStressKeywords = [
    'hopeless', 'cant take it', "can't take it", 'give up', 'overwhelmed',
    'panic', 'crisis', 'breaking down', 'crying', 'desperate', 'failing',
    'worthless', 'helpless', 'exhausted', 'burned out', 'burnout', 'suicide', 'die'
  ];

  const moderateStressKeywords = [
    'stressed', 'anxious', 'worried', 'nervous', 'pressure',
    'deadline', 'struggling', 'difficult', 'hard', 'tough',
    'confused', 'frustrated', 'tired', 'cant sleep', "can't sleep",
    'exam', 'test', 'sad', 'lonely', 'overwhelmed'
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
