// ============================================
// CONFIGURACIÓN DE API PARA ADONISJS
// ============================================

// URL base del backend AdonisJS
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REGISTER: '/api/auth/register',
  },

  // Analytics
  ANALYTICS: {
    KPI: '/api/analytics/kpi',
    SALES_BY_CATEGORY: '/api/analytics/sales-by-category',
    SALES_BY_SIZE: '/api/analytics/sales-by-size',
    SALES_BY_MONTH: '/api/analytics/sales-by-month',
    SALES_DAILY: '/api/analytics/sales-daily',
    TOP_PRODUCTS: '/api/analytics/top-products',
    RECOMMENDATIONS: '/api/analytics/recommendations',
  },

  // Inventario
  INVENTORY: {
    LIST: '/api/inventory',
    BY_ID: (id: number) => `/api/inventory/${id}`,
    BY_SUCURSAL: (idSucursal: number) => `/api/inventory/sucursal/${idSucursal}`,
    LOW_STOCK: '/api/inventory/low-stock',
    UPDATE_STOCK: (id: number) => `/api/inventory/${id}/stock`,
  },

  // Productos
  PRODUCTS: {
    LIST: '/api/products',
    BY_ID: (id: number) => `/api/products/${id}`,
    CREATE: '/api/products',
    UPDATE: (id: number) => `/api/products/${id}`,
    DELETE: (id: number) => `/api/products/${id}`,
  },

  // Facturas
  INVOICES: {
    LIST: '/api/invoices',
    BY_ID: (id: number) => `/api/invoices/${id}`,
    CREATE: '/api/invoices',
    BY_SUCURSAL: (idSucursal: number) => `/api/invoices/sucursal/${idSucursal}`,
    BY_DATE_RANGE: '/api/invoices/date-range',
  },

  // Clientes
  CUSTOMERS: {
    LIST: '/api/customers',
    BY_ID: (id: number) => `/api/customers/${id}`,
    CREATE: '/api/customers',
    UPDATE: (id: number) => `/api/customers/${id}`,
  },

  // Sucursales
  BRANCHES: {
    LIST: '/api/branches',
    BY_ID: (id: number) => `/api/branches/${id}`,
  },

  // Categorías
  CATEGORIES: {
    LIST: '/api/categories',
    WITH_SUBCATEGORIES: '/api/categories/with-subcategories',
  },

  // Usuarios
  USERS: {
    LIST: '/api/users',
    BY_ID: (id: number) => `/api/users/${id}`,
    CREATE: '/api/users',
    UPDATE: (id: number) => `/api/users/${id}`,
  },

  // Upload de archivos
  UPLOAD: {
    PRODUCTS: '/api/upload/products',
    INVENTORY: '/api/upload/inventory',
    SALES: '/api/upload/sales',
    TEMPLATE: (type: string) => `/api/upload/template/${type}`,
  },
};

// Headers por defecto
export const getAuthHeaders = (token?: string | null) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};
