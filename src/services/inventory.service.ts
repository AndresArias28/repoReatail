// ============================================
// SERVICIO DE INVENTARIO
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type {
  ApiResponse,
  PaginatedResponse,
  Inventario,
  InventarioConAlerta,
} from '../types/database.types';

export const inventoryService = {
  /**
   * Obtener lista de inventario
   */
  async getInventory(params?: {
    page?: number;
    per_page?: number;
    idSucursal?: number;
    search?: string;
  }): Promise<PaginatedResponse<Inventario>> {
    return apiService.get<PaginatedResponse<Inventario>>(
      API_ENDPOINTS.INVENTORY.LIST,
      params
    );
  },

  /**
   * Obtener inventario por ID
   */
  async getInventoryById(id: number): Promise<ApiResponse<Inventario>> {
    return apiService.get<ApiResponse<Inventario>>(
      API_ENDPOINTS.INVENTORY.BY_ID(id)
    );
  },

  /**
   * Obtener inventario por sucursal
   */
  async getInventoryBySucursal(
    idSucursal: number
  ): Promise<ApiResponse<Inventario[]>> {
    return apiService.get<ApiResponse<Inventario[]>>(
      API_ENDPOINTS.INVENTORY.BY_SUCURSAL(idSucursal)
    );
  },

  /**
   * Obtener productos con stock bajo
   */
  async getLowStockProducts(
    idSucursal?: number
  ): Promise<ApiResponse<InventarioConAlerta[]>> {
    return apiService.get<ApiResponse<InventarioConAlerta[]>>(
      API_ENDPOINTS.INVENTORY.LOW_STOCK,
      { idSucursal }
    );
  },

  /**
   * Actualizar stock de un producto
   */
  async updateStock(
    id: number,
    stock: number
  ): Promise<ApiResponse<Inventario>> {
    return apiService.patch<ApiResponse<Inventario>>(
      API_ENDPOINTS.INVENTORY.UPDATE_STOCK(id),
      { stock }
    );
  },
};
