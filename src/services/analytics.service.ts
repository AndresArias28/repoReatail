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
   * Obtener productos más vendidos
   * Backend: GET /estadisticas/masVendidos?mes=1&idsucursal=1
   * Respuesta: [{ idcategoria, categoria, idproducto, producto, total_vendido }]
   */
  async getTopProducts(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<ProductoMasVendido[]>> {
    const response = await apiService.get<any[]>(
      API_ENDPOINTS.ANALYTICS.TOP_PRODUCTS,
      filtros
    );
    // Transformar la respuesta del backend al formato esperado por el frontend
    const data = Array.isArray(response) ? response.map(item => ({
      idproducto: item.idproducto,
      nombre: item.producto || 'Producto sin nombre',
      categoria: item.categoria || 'Sin categoría',
      cantidad: Number(item.total_vendido) || 0,
      ventas_totales: Number(item.total_vendido) || 0, // El backend no devuelve ventas en $, solo cantidad
      total_vendido: Number(item.total_vendido) || 0
    })) : [];
    return { data };
  },

  /**
   * Obtener productos menos vendidos
   * Backend: GET /estadisticas/menosVendidos?mes=1&idsucursal=1
   * Respuesta: [{ idcategoria, categoria, idproducto, producto, total_vendido }]
   */
  async getLowProducts(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<ProductoMasVendido[]>> {
    const response = await apiService.get<ProductoMasVendido[]>(
      API_ENDPOINTS.ANALYTICS.LOW_PRODUCTS,
      filtros
    );
    return { data: Array.isArray(response) ? response : [] };
  },

  /**
   * Obtener distribución de ventas por talla
   * Backend: GET /estadisticas/tallasMayorSalida?mes=1&idsucursal=1
   * Respuesta: [{ talla, total_vendido }]
   */
  async getSalesBySize(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasPorTalla[]>> {
    const response = await apiService.get<any[]>(
      API_ENDPOINTS.ANALYTICS.SALES_BY_SIZE,
      filtros
    );
    
    // Transformar la respuesta del backend al formato esperado por el frontend
    if (!Array.isArray(response) || response.length === 0) {
      return { data: [] };
    }
    
    // Calcular el total de ventas para obtener porcentajes
    const total = response.reduce((sum, item) => sum + (Number(item.total_vendido) || 0), 0);
    
    const data = response.map(item => {
      const cantidad = Number(item.total_vendido) || 0;
      const porcentaje = total > 0 ? Math.round((cantidad / total) * 100) : 0;
      
      return {
        talla: item.talla || 'SIN_TALLA',
        cantidad,
        porcentaje
      };
    });
    
    return { data };
  },

  /**
   * Aplicar descuento a productos de baja rotación
   * Backend: POST /estadisticas/descuentoBajaRotacion
   * Body: { mes?, idsucursal?, porcentaje }
   * Respuesta: { porcentaje, updated, productos: [] }
   */
  async applyDiscountLowRotation(
    porcentaje: number,
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<any>> {
    const response = await apiService.post<any>(
      API_ENDPOINTS.ANALYTICS.DISCOUNT_LOW_ROTATION,
      { ...filtros, porcentaje }
    );
    return { data: response };
  },

  // ============================================
  // MÉTODOS NO IMPLEMENTADOS EN EL BACKEND
  // Estos devuelven arrays vacíos para evitar errores
  // ============================================

  /**
   * KPIs - NO IMPLEMENTADO EN BACKEND
   * Devuelve null para usar datos mock en el frontend
   */
  async getKPIs(filtros?: FiltrosAnalytics): Promise<ApiResponse<KPIData>> {
    console.warn('⚠️ getKPIs: Ruta no implementada en el backend, usando datos mock');
    return { data: null };
  },

  /**
   * Ventas por categoría - NO IMPLEMENTADO EN BACKEND
   * Devuelve array vacío para usar datos mock en el frontend
   */
  async getSalesByCategory(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasPorCategoria[]>> {
    console.warn('⚠️ getSalesByCategory: Ruta no implementada en el backend, usando datos mock');
    return { data: [] };
  },

  /**
   * Ventas mensuales - NO IMPLEMENTADO EN BACKEND
   * Devuelve array vacío para usar datos mock en el frontend
   */
  async getSalesByMonth(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasPorMes[]>> {
    console.warn('⚠️ getSalesByMonth: Ruta no implementada en el backend, usando datos mock');
    return { data: [] };
  },

  /**
   * Ventas diarias - NO IMPLEMENTADO EN BACKEND
   * Devuelve array vacío para usar datos mock en el frontend
   */
  async getDailySales(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<VentasDiarias[]>> {
    console.warn('⚠️ getDailySales: Ruta no implementada en el backend, usando datos mock');
    return { data: [] };
  },

  /**
   * Recomendaciones - NO IMPLEMENTADO EN BACKEND
   * Devuelve array vacío para usar datos mock en el frontend
   */
  async getRecommendations(
    filtros?: FiltrosAnalytics
  ): Promise<ApiResponse<Recomendacion[]>> {
    console.warn('⚠️ getRecommendations: Ruta no implementada en el backend, usando datos mock');
    return { data: [] };
  },
};
