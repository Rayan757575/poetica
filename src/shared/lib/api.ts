import axios from 'axios';

// Base para futuras chamadas (ex: busca de sinônimos na web, fase 3).
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? '',
  timeout: 10000,
});
