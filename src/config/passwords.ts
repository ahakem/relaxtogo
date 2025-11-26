// Password configuration for protected routes

export const VALID_PASSWORDS = [
  'relaxtogo2024',
  'yoga123',
  'wellness456',
  'mindful789'
];

// Check if a password is valid
export const isValidPassword = (password: string): boolean => {
  return VALID_PASSWORDS.includes(password);
};

// Session storage key for authentication
export const AUTH_STORAGE_KEY = 'relaxtogo_auth';

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const authData = sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!authData) return false;
  
  try {
    const { timestamp } = JSON.parse(authData);
    const now = Date.now();
    const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
    
    return (now - timestamp) < sessionTimeout;
  } catch {
    return false;
  }
};

// Set authentication
export const setAuthentication = (): void => {
  const authData = {
    timestamp: Date.now(),
    authenticated: true
  };
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

// Clear authentication
export const clearAuthentication = (): void => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};