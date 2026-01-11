// Simple sessionStorage-based auth (prototype only)
const KEY = 'isAuthenticated';

export function login() {
  try {
    sessionStorage.setItem(KEY, 'true');
    return true;
  } catch (e) {
    console.error('login error', e);
    return false;
  }
}

export function logout() {
  try {
    sessionStorage.removeItem(KEY);
  } catch (e) {
    console.error('logout error', e);
  }
}

export function isAuthenticated() {
  try {
    return sessionStorage.getItem(KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export default { login, logout, isAuthenticated };
