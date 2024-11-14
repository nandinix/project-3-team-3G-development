import axios from 'axios';

const API_URL = 'http://localhost:5000/api/query';

async function executeQuery(query, params = []) {
  try {
    const response = await axios.post(API_URL, { query, params });
    return response.data;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

export { executeQuery };