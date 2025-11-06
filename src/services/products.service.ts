// ============================================
// SERVICIO DE PRODUCTOS
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { Producto, ApiResponse } from '../types/database.types';

export const productsService = {
  async list(): Promise<Producto[]> {
    const res = await apiService.get<Producto[] | ApiResponse<Producto[]>>(
      API_ENDPOINTS.PRODUCTS.LIST
    );
    if (Array.isArray(res)) return res;
    const maybe = (res as ApiResponse<Producto[]>).data;
    return Array.isArray(maybe) ? maybe : [];
  },
  async getById(id: number): Promise<Producto | null> {
    const res = await apiService.get<Producto | ApiResponse<Producto>>(
      API_ENDPOINTS.PRODUCTS.BY_ID(id)
    );
    if (res && (res as any).id) return res as Producto;
    const data = (res as ApiResponse<Producto>)?.data as any;
    return data && data.id ? (data as Producto) : null;
  },
  async create(payload: Partial<Producto>): Promise<Producto> {
    return apiService.post<Producto>(API_ENDPOINTS.PRODUCTS.CREATE, payload);
  },
  async update(id: number, payload: Partial<Producto>): Promise<Producto> {
    return apiService.put<Producto>(API_ENDPOINTS.PRODUCTS.UPDATE(id), payload);
  },
  async remove(id: number): Promise<{ message: string } | any> {
    return apiService.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  },
};
