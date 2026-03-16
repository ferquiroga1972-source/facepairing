import client from './client'

export interface AuthResponse {
  access_token: string
  token_type: string
  user: { id: number; email: string; full_name: string; is_premium: boolean }
}

export const login = (email: string, password: string) =>
  client.post<AuthResponse>('/auth/login', { email, password })

export const register = (email: string, password: string, full_name?: string) =>
  client.post<AuthResponse>('/auth/register', { email, password, full_name })
