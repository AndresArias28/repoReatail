// ============================================
// SERVICIO DE ANALYTICS
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type {
  ApiResponse,
  KPIData,
  VentasPorCategoria,
  VentasPorTalla,
  VentasPorMes,
  VentasDiarias,
  ProductoMasVendido,
  Recomendacion,
  FiltrosAnalytics,
} from '../types/database.types';

export const analyticsService = {
  /**
   * Obtener KPIs principales del dashboard
   */
  async getKPIs(filtros?: FiltrosAnalytics): Promise<ApiResponse<KPIData>> {
    return apiService.get<ApiResponse<KPIData>>(
      API_ENDPOINTS.ANALYTICS.KPI,
      filtros
    );
  },

  /**
   * Obtener ventas por categoría
   */
  async getSalesByCategory(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasPorCategoria[]>> {
    return apiService.get<ApiResponse<VentasPorCategoria[]>>(
      API_ENDPOINTS.ANALYTICS.SALES_BY_CATEGORY,
      filtros
    );
  },

  /**
   * Obtener distribución de ventas por talla
   */
  async getSalesBySize(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasPorTalla[]>> {
    return apiService.get<ApiResponse<VentasPorTalla[]>>(
      API_ENDPOINTS.ANALYTICS.SALES_BY_SIZE,
      filtros
    );
  },

  /**
   * Obtener ventas mensuales
   */
  async getSalesByMonth(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasPorMes[]>> {
    return apiService.get<ApiResponse<VentasPorMes[]>>(
      API_ENDPOINTS.ANALYTICS.SALES_BY_MONTH,
      filtros
    );
  },

  /**
   * Obtener ventas diarias
   */
  async getDailySales(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasDiarias[]>> {
    return apiService.get<ApiResponse<VentasDiarias[]>>(
      API_ENDPOINTS.ANALYTICS.SALES_DAILY,
      filtros
    );
  },

  /**
   * Obtener productos más vendidos
   */
  async getTopProducts(
    limit: number = 5,
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<ProductoMasVendido[]>> {
    return apiService.get<ApiResponse<ProductoMasVendido[]>>(
      API_ENDPOINTS.ANALYTICS.TOP_PRODUCTS,
      { ...filtros, limit }
    );
  },

  /**
   * Obtener recomendaciones inteligentes
   */
  async getRecommendations(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<Recomendacion[]>> {
    return apiService.get<ApiResponse<Recomendacion[]>>(
      API_ENDPOINTS.ANALYTICS.RECOMMENDATIONS,
      filtros
    );
  },
};
