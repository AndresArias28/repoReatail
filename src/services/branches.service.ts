// ============================================
// SERVICIO DE SUCURSALES
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, Sucursal } from '../types/database.types';

export const branchesService = {
  /**
   * Obtener lista de sucursales
   */
  async getBranches(): Promise<ApiResponse<Sucursal[]>> {
    return apiService.get<ApiResponse<Sucursal[]>>(
      API_ENDPOINTS.BRANCHES.LIST
    );
  },

  /**
   * Obtener sucursal por ID
   */
  async getBranchById(id: number): Promise<ApiResponse<Sucursal>> {
    return apiService.get<ApiResponse<Sucursal>>(
      API_ENDPOINTS.BRANCHES.BY_ID(id)
    );
  },
};
