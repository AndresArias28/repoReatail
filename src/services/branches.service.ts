// ============================================
// SERVICIO DE SUCURSALES
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse, Sucursal } from '../types/database.types';

export interface CreateSucursalDto {
  idmunicipio: number;
  nit: string;
  nombre: string;
  direccion: string;
  email: string;
}

export interface UpdateSucursalDto extends Partial<CreateSucursalDto> {}

export const branchesService = {
  /**
   * Obtener lista de sucursales
   */
  async getBranches(): Promise<Sucursal[]> {
    const response = await apiService.get<any>(API_ENDPOINTS.BRANCHES.LIST);
    // El backend devuelve el array directamente
    return Array.isArray(response) ? response : [];
  },

  /**
   * Obtener sucursal por ID
   */
  async getBranchById(id: number): Promise<Sucursal> {
    return apiService.get<Sucursal>(API_ENDPOINTS.BRANCHES.BY_ID(id));
  },

  /**
   * Crear nueva sucursal
   */
  async createBranch(data: CreateSucursalDto): Promise<Sucursal> {
    return apiService.post<Sucursal>(API_ENDPOINTS.BRANCHES.CREATE, data);
  },

  /**
   * Actualizar sucursal
   */
  async updateBranch(id: number, data: UpdateSucursalDto): Promise<Sucursal> {
    return apiService.put<Sucursal>(API_ENDPOINTS.BRANCHES.UPDATE(id), data);
  },

  /**
   * Eliminar sucursal
   */
  async deleteBranch(id: number): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(API_ENDPOINTS.BRANCHES.DELETE(id));
  },
};
