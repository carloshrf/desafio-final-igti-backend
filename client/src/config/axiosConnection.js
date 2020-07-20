import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001/api/transaction',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'http://localhost:3001'
  },
});