
// Auth utility functions

/**
 * Get authentication token from localStorage
 */
export const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  console.log('getToken called, token exists:', !!token);
  return token;
};

/**
 * Set authentication token in localStorage
 */
export const setToken = (token: string): void => {
  console.log('Setting token in localStorage:', token.substring(0, 10) + '...');
  localStorage.setItem('token', token);
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = (): void => {
  console.log('Removing token from localStorage');
  localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const isAuth = !!getToken();
  console.log('isAuthenticated check result:', isAuth);
  return isAuth;
};

/**
 * Get token with proper format for API requests
 */
export const getAuthHeader = (): { [key: string]: string } => {
  const token = getToken();
  const headers = token ? { 'Authorization': `Bearer ${token}`, 'x-auth-token': token } : {};
  console.log('Auth headers being used:', headers);
  return headers;
};
