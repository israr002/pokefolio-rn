import axios from 'axios';
import { API } from 'constants/config';

const api = axios.create({
  baseURL: API.BASE_URL,
  timeout: API.TIMEOUT,
  headers: {
    'Accept': 'application/json',
  },
});

export default api;
