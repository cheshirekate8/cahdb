export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    name?: string;
  };
  app_metadata?: {
    provider?: string;
    providers?: string[];
  };
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword?: string;
}

export type SocialProvider = 'google' | 'github';

export enum AuthErrorType {
  INVALID_CREDENTIALS = 'invalid_credentials',
  USER_NOT_FOUND = 'user_not_found',
  EMAIL_TAKEN = 'email_taken',
  WEAK_PASSWORD = 'weak_password',
  NETWORK_ERROR = 'network_error',
  UNKNOWN = 'unknown',
}

export interface AuthError {
  type: AuthErrorType;
  message: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  animationsEnabled: boolean;
  compactMode: boolean;
}
