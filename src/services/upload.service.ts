// ============================================
// SERVICIO DE CARGA DE DATOS
// ============================================

import { API_BASE_URL, getAuthHeaders } from '../config/api.config';
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
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Subir archivo de productos
   */
  async uploadProducts(file: File): Promise<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/api/upload/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
        // No incluir Content-Type, el navegador lo establece automáticamente con boundary
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error al subir archivo',
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Subir archivo de inventario
   */
  async uploadInventory(file: File): Promise<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/api/upload/inventory`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error al subir archivo',
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Subir archivo de ventas/facturas
   */
  async uploadSales(file: File): Promise<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/api/upload/sales`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error al subir archivo',
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
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
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(extension)) {
      return {
        valid: false,
        error: 'Formato de archivo no válido. Use CSV o Excel (.xlsx, .xls)',
      };
    }

    // Validar tamaño (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'El archivo es demasiado grande. Tamaño máximo: 10MB',
      };
    }

    return { valid: true };
  }

  /**
   * Descargar plantilla de ejemplo
   */
  async downloadTemplate(type: 'products' | 'inventory' | 'sales'): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/upload/template/${type}`, {
      method: 'GET',
      headers: getAuthHeaders(this.getToken()),
    });

    if (!response.ok) {
      throw new Error('Error al descargar plantilla');
    }

    const blob = await response.blob();
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
