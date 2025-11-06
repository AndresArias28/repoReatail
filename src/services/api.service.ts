// ============================================
// SERVICIO PRINCIPAL DE API CON AXIOS
// ============================================

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { API_BASE_URL } from '../config/api.config';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 segundos
    });

    // Interceptor para agregar el token en cada petición
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar errores de respuesta
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;
          
          // Si es 401, el token expiró o es inválido
          if (status === 401) {
            console.warn('⚠️ Token inválido o expirado. Redirigiendo al login...');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            
            // Redirigir al login si no estamos ya ahí
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
            
            throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
          }
          
          // Otros errores
          const message = (error.response.data as any)?.message || error.message;
          throw new Error(message);
        } else if (error.request) {
          // La petición se hizo pero no hubo respuesta
          throw new Error('No se pudo conectar con el servidor');
        } else {
          // Error al configurar la petición
          throw new Error(error.message);
        }
      }
    );
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint);
    return response.data;
  }
}

export const apiService = new ApiService();
