export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface AuthUser extends User {
  // Extended user properties from NextAuth
}