/* eslint-disable */


// Simple API service
const BASE_URL = "https://berhabzakarya.studxptm.com/api/v1/"

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

// Public API - no token required
export const publicApi = async (endpoint: string, options: ApiOptions = {}) => {
  const { method = 'GET', headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      ...headers, // Spread custom headers, but don't set Content-Type by default
    } as Record<string, string>,
  };

  if (body && method !== 'GET') {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
    if (!(body instanceof FormData)) {
      (config.headers as Record<string, string>)['Content-Type'] = 'application/json';
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  return response;
};

// Private API - requires bearer token
export const privateApi = async (endpoint: string, options: ApiOptions = {}) => {
  const token = localStorage.getItem('access_token')
      // const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  
  if (!token) {
    throw new Error('No access token found')
  }

  const { method = 'GET', headers = {}, body } = options
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...headers,
    },
  }

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}