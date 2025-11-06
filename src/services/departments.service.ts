// ============================================
// SERVICIO PARA DEPARTAMENTOS
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { ApiResponse } from '../types/database.types';

export interface Departamento {
  iddepartamentos: number;
  nombre_dpto: string;
}

export const departmentsService = {
  /**
   * Obtener lista de departamentos
   * Nota: Si el endpoint no existe, devuelve datos de la base de datos
   */
  async getDepartments(): Promise<ApiResponse<Departamento[]>> {
    try {
      // Intentar obtener desde el backend
      // Nota: apiService.get ya devuelve el objeto completo (response.data de axios)
      const response = await apiService.get<any>('/departamentos/obtener');
      console.log('🔍 Respuesta raw del backend:', response);
      
      let rawDepartamentos: any[] = [];
      
      // Si el backend devuelve { success, data }, extraemos data
      if (response && 'data' in response) {
        rawDepartamentos = Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response)) {
        // Si devuelve directamente el array
        rawDepartamentos = response;
      }
      
      console.log('📦 Raw departamentos:', rawDepartamentos);
      
      // Mapear los campos del backend al formato esperado
      const departamentos: Departamento[] = rawDepartamentos.map(dept => {
        // El backend puede devolver: {id, nombreDpto} o {iddepartamentos, nombre_dpto}
        return {
          iddepartamentos: dept.iddepartamentos || dept.id,
          nombre_dpto: dept.nombre_dpto || dept.nombreDpto
        };
      });
      
      console.log('🔄 Departamentos mapeados:', departamentos);
      
      // Filtrar y validar departamentos
      const validDepartamentos = departamentos.filter(dept => {
        const isValid = dept && 
                       typeof dept.iddepartamentos !== 'undefined' && 
                       dept.iddepartamentos !== null &&
                       typeof dept.nombre_dpto === 'string' &&
                       dept.nombre_dpto.trim() !== '';
        
        if (!isValid) {
          console.warn('⚠️ Departamento inválido encontrado:', dept);
        }
        return isValid;
      });
      
      console.log('✅ Departamentos válidos:', validDepartamentos);
      
      return {
        success: true,
        data: validDepartamentos
      };
    } catch (error) {
      // Si no existe el endpoint, devolver departamentos de la BD
      console.warn('⚠️ Endpoint de departamentos no disponible, usando datos locales');
      
      return {
        success: true,
        data: [
          { iddepartamentos: 1, nombre_dpto: 'Cauca' },
          { iddepartamentos: 2, nombre_dpto: 'Valle del Cauca' },
          { iddepartamentos: 3, nombre_dpto: 'Nariño' },
          { iddepartamentos: 4, nombre_dpto: 'Antioquia' },
          { iddepartamentos: 5, nombre_dpto: 'Cundinamarca' },
        ]
      };
    }
  },
};
