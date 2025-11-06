// ============================================
// SERVICIO DE SUCURSALES
// ============================================

import { apiService } from './api.service';
import type { Sucursal, ApiResponse } from '../types/database.types';

export const branchesService = {
  /**
   * Obtener lista de sucursales (array simple)
   * Backend: GET /sucursal/obtener
   */
  async getBranches(): Promise<Sucursal[]> {
    const res = await apiService.get<Sucursal[] | ApiResponse<Sucursal[]>>(
      '/sucursal/obtener'
    );
    if (Array.isArray(res)) return res;
    const maybe = (res as ApiResponse<Sucursal[]>).data;
    return Array.isArray(maybe) ? maybe : [];
  },

  /**
   * Obtener sucursal por ID (si aplica en backend)
   */
  async getBranchById(id: number): Promise<Sucursal> {
    return apiService.get<Sucursal>(`/sucursal/obtenerPorId/${id}`);
  },
};
