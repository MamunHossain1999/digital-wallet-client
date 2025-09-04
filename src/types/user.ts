// frontend/src/types/user.ts
export type UserRole = 'admin' | 'user' | 'agent';
export type UserStatus = 'active' | 'blocked';

export interface User {
  id?: string;           
  name: string;
  password: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  createdAt?: string;    
  updatedAt?: string;    
  commissionRate?: number;
  isApproved?: boolean;
}
