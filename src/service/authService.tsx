import { BASE_URL } from './config';
import axios from 'axios';

// src/api/apiClient.ts
export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export default apiClient;
