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
   * Backend: GET /inventario/obtener
   * Respuesta: Array simple (no paginado)
   */
  async getInventory(params?: {
    page?: number;
    per_page?: number;
    idSucursal?: number;
    search?: string;
  }): Promise<PaginatedResponse<Inventario>> {
    const response = await apiService.get<Inventario[]>(
      API_ENDPOINTS.INVENTORY.LIST,
      params
    );
    
    // Debug: Ver respuesta del backend
    console.log('🔍 Backend Response:', response);
    console.log('🔍 Is Array?', Array.isArray(response));
    
    // El backend devuelve un array simple, no paginado
    // Crear respuesta paginada manualmente
    const data = Array.isArray(response) ? response : [];
    console.log('📦 Data after validation:', data);
    
    const page = params?.page || 1;
    const perPage = params?.per_page || 10;
    const start = (page - 1) * perPage;
    const paginatedData = data.slice(start, start + perPage);
    
    console.log('📄 Paginated Data:', paginatedData);
    
    return {
      success: true,
      data: paginatedData,
      meta: {
        total: data.length,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(data.length / perPage),
      },
    };
  },

  /** Crear registro de inventario */
  async create(payload: { idproducto: number; idsucursal: number; stock: number }): Promise<Inventario> {
    return apiService.post<Inventario>(API_ENDPOINTS.INVENTORY.CREATE, payload);
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
