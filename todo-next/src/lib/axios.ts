import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000, // 超时 10 秒
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：自动携带 Token
instance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器：统一错误处理
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 请求错误:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
