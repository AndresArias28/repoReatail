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
};
