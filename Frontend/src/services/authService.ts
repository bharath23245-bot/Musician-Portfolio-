// Authentication service prepared for future Node.js + Express backend
import { AdminUser } from '../types';

const AUTH_USER_KEY = 'maestro_admin_auth_user';

export async function hashPassword(password: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_maestro_salt_2025');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = (hash << 5) - hash + password.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }
}

export const authService = {
  getCurrentUser: (): AdminUser | null => {
    try {
      const data = localStorage.getItem(AUTH_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  },

  login: async (email: string, _passwordHash: string, name?: string): Promise<AdminUser> => {
    // In future: POST /api/admin/login
    const resolvedName = name || (email.includes('@') ? email.split('@')[0] : 'Bharath Kannan');
    const user: AdminUser = {
      id: 'USR-001',
      name: resolvedName,
      email: email,
      role: 'admin',
      token: `maestro_jwt_mock_${Date.now()}`,
    };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return user;
  },

  logout: async (): Promise<void> => {
    // In future: POST /api/admin/logout
    localStorage.removeItem(AUTH_USER_KEY);
  },
};
