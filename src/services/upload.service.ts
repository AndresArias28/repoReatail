// ============================================
// SERVICIO DE CARGA DE DATOS CON AXIOS
// ============================================

import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../config/api.config';
import type { ApiResponse } from '../types/database.types';

export interface UploadResponse {
  success: boolean;
  message: string;
  processed: number;
  errors: number;
  errorDetails?: Array<{
    row: number;
    error: string;
  }>;
}

export interface UploadPreview {
  headers: string[];
  rows: any[];
  totalRows: number;
}

class UploadService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 60000, // 60 segundos para uploads
    });

    // Interceptor para agregar el token
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Subir archivo de productos con inventario
   * Backend: POST /api/imports/productos
   * Params: file (Excel), idsucursal (opcional)
   */
  async uploadProducts(file: File, idsucursal?: number): Promise<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    if (idsucursal) {
      formData.append('idsucursal', idsucursal.toString());
    }

    const response = await this.axiosInstance.post(
      '/api/imports/productos',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Mapear respuesta del backend al formato esperado
    const backendData = response.data;
    return {
      success: backendData.status === 'ok' || backendData.status === 'partial',
      data: {
        success: backendData.status === 'ok' || backendData.status === 'partial',
        message: backendData.status === 'ok' 
          ? `Carga exitosa: ${backendData.inserted} productos creados, ${backendData.updated} actualizados`
          : backendData.status === 'partial'
          ? `Carga parcial: ${backendData.inserted + backendData.updated} procesados, ${backendData.errors} errores`
          : 'Error en la carga',
        processed: (backendData.inserted || 0) + (backendData.updated || 0),
        errors: backendData.errors || 0,
        errorDetails: (backendData.details || []).map((d: any) => ({
          row: d.row,
          error: d.error
        }))
      }
    };
  }

  /**
   * NOTA: Los endpoints de inventario y ventas no están implementados en el backend
   * El endpoint de productos maneja tanto productos como inventario si se pasa idsucursal
   */
  async uploadInventory(file: File): Promise<ApiResponse<UploadResponse>> {
    throw new Error('Endpoint no implementado. Use uploadProducts con idsucursal.');
  }

  async uploadSales(file: File): Promise<ApiResponse<UploadResponse>> {
    throw new Error('Endpoint no implementado en el backend.');
  }

  /**
   * Previsualizar archivo antes de subir
   */
  async previewFile(file: File): Promise<UploadPreview> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim());
          
          if (lines.length === 0) {
            reject(new Error('El archivo está vacío'));
            return;
          }

          const headers = lines[0].split(',').map(h => h.trim());
          const rows = lines.slice(1, Math.min(6, lines.length)).map(line => {
            const values = line.split(',').map(v => v.trim());
            const row: any = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            return row;
          });

          resolve({
            headers,
            rows,
            totalRows: lines.length - 1,
          });
        } catch (error) {
          reject(new Error('Error al leer el archivo'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Validar formato de archivo
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    // Validar extensión
    const validExtensions = ['.xlsx', '.xls'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(extension)) {
      return {
        valid: false,
        error: 'Formato de archivo no válido. Use Excel (.xlsx, .xls)',
      };
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'El archivo es demasiado grande. Tamaño máximo: 5MB',
      };
    }

    return { valid: true };
  }

  /**
   * Descargar plantilla de ejemplo (generada localmente)
   */
  async downloadTemplate(type: 'products' | 'inventory' | 'sales'): Promise<void> {
    let csvContent = '';
    
    if (type === 'products') {
      csvContent = 'Subcategoría,Nombre,Marca,Precio,Talla,Descripción,Stock\n';
      csvContent += 'BUZOS Hombre,Buzo Ejemplo,Nike,120000,M,Descripción del producto,30\n';
      csvContent += 'ABRIGO Hombre,Abrigo Ejemplo,Adidas,150000,L,Descripción del producto,25\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantilla_${type}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

export const uploadService = new UploadService();
