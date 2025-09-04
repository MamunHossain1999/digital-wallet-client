// src/types/auth.ts

// ✅ User object
export interface AuthUser {
  id: string;    
  name: string;
  email: string;
  role: "user" | "agent" | "admin";
}

// ✅ Login/Register API response
export interface AuthResponse {
  user: AuthUser;
  accessToken: string;   
  refreshToken?: string;
  message?: string;
}

// ✅ Login request payload
export interface LoginRequest {
  email: string;
  password: string;
}

// ✅ Register request payload
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: "user" | "agent" | "admin"; 
}
