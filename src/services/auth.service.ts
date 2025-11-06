// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type {
  ApiResponse,
  LoginCredentials,
  AuthResponse,
  Usuario,
} from '../types/database.types';

export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<any> {
    const response = await apiService.post<any>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Guardar token en localStorage
    // El backend devuelve: { message, token, expiresIn, usuario }
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.usuario));
    }

    return response;
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<ApiResponse<Usuario>> {
    return apiService.get<ApiResponse<Usuario>>(API_ENDPOINTS.AUTH.ME);
  },

  /**
   * Verificar si hay sesión activa
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Obtener token almacenado
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  /**
   * Obtener usuario almacenado
   */
  getStoredUser(): Usuario | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};
