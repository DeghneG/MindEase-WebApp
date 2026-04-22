// Axios/Fetch calls to backend
// Uses a relative path so it works both locally (via proxy) and on Vercel (via rewrites)
const API_URL = process.env.REACT_APP_API_URL || '/api';

export const sendMessage = async (message, history = []) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};
