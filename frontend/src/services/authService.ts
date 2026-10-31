import { apiClient, setAuthToken, removeAuthToken } from '@/lib/api';
import { LoginRequest, RegisterRequest, TokenResponse, User } from '@/types';

export const authService = {
  /**
   * Register a new user.
   */
  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/api/auth/register', data);
    return response.data;
  },

  /**
   * Login user and save returned JWT access token.
   */
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>('/api/auth/login', data);
    if (response.data.access_token) {
      setAuthToken(response.data.access_token);
    }
    return response.data;
  },

  /**
   * Retrieve current authenticated user's profile from /api/auth/me.
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/auth/me');
    return response.data;
  },

  /**
   * Clear session token.
   */
  logout: (): void => {
    removeAuthToken();
  },
};
