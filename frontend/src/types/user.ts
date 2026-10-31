export type UserRole = 'student' | 'club_coordinator' | 'faculty_coordinator';

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: UserRole | string;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: UserRole | string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}
