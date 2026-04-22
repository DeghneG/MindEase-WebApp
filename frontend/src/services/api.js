// Axios/Fetch calls to backend

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
