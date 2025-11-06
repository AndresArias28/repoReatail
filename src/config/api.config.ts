// ============================================
// CONFIGURACIÓN DE API PARA ADONISJS
// ============================================

// URL base del backend AdonisJS
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';

// Endpoints de la API (ajustados a las rutas reales del backend)
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },

  // Estadísticas (Analytics)
  ANALYTICS: {
    TOP_PRODUCTS: '/estadisticas/masVendidos',
    SALES_BY_SIZE: '/estadisticas/tallasMayorSalida',
    LOW_PRODUCTS: '/estadisticas/menosVendidos',
    DISCOUNT_LOW_ROTATION: '/estadisticas/descuentoBajaRotacion',
    // Endpoints que podrían no existir aún en el backend
    KPI: '/estadisticas/kpi',
    SALES_BY_CATEGORY: '/estadisticas/ventasPorCategoria',
    SALES_BY_MONTH: '/estadisticas/ventasPorMes',
    SALES_DAILY: '/estadisticas/ventasDiarias',
    RECOMMENDATIONS: '/estadisticas/recomendaciones',
  },

  // Inventario
  INVENTORY: {
    LIST: '/inventario/obtener',
    BY_ID: (id: number) => `/inventario/obtenerPorId/${id}`,
    CREATE: '/inventario/crear',
    UPDATE: (id: number) => `/inventario/actualizar/${id}`,
    DELETE: (id: number) => `/inventario/eliminar/${id}`,
    BY_SUCURSAL: (idSucursal: number) => `/inventario/sucursal/${idSucursal}`,
    LOW_STOCK: '/inventario/stockBajo',
    UPDATE_STOCK: (id: number) => `/inventario/actualizar/${id}`,
  },

  // Productos
  PRODUCTS: {
    LIST: '/productos/obtener',
    BY_ID: (id: number) => `/productos/obtenerPorId/${id}`,
    CREATE: '/productos/crear',
    UPDATE: (id: number) => `/productos/actualizar/${id}`,
    DELETE: (id: number) => `/productos/eliminar/${id}`,
  },

  // Facturas
  INVOICES: {
    LIST: '/facturacion/obtener',
    BY_ID: (id: number) => `/facturacion/obtenerPorId/${id}`,
    CREATE: '/facturacion/crear',
    BY_SUCURSAL: (idSucursal: number) => `/facturacion/sucursal/${idSucursal}`,
    BY_DATE_RANGE: '/facturacion/rangoFechas',
  },

  // Clientes (endpoints que podrían no existir aún)
  CUSTOMERS: {
    LIST: '/clientes/obtener',
    BY_ID: (id: number) => `/clientes/obtenerPorId/${id}`,
    CREATE: '/clientes/crear',
    UPDATE: (id: number) => `/clientes/actualizar/${id}`,
  },

  // Sucursales (NOTA: Backend usa /sucursal en singular)
  BRANCHES: {
    LIST: '/sucursal/obtener',
    BY_ID: (id: number) => `/sucursal/obtenerPorId/${id}`,
    CREATE: '/sucursal/crear',
    UPDATE: (id: number) => `/sucursal/actualizar/${id}`,
    DELETE: (id: number) => `/sucursal/eliminar/${id}`,
  },

  // Categorías (endpoints que podrían no existir aún)
  CATEGORIES: {
    LIST: '/categorias/obtener',
    WITH_SUBCATEGORIES: '/categorias/conSubcategorias',
  },

  // Usuarios (endpoints que podrían no existir aún)
  USERS: {
    LIST: '/usuarios/obtener',
    BY_ID: (id: number) => `/usuarios/obtenerPorId/${id}`,
    CREATE: '/usuarios/crear',
    UPDATE: (id: number) => `/usuarios/actualizar/${id}`,
  },

  // Upload de archivos
  UPLOAD: {
    PRODUCTS: '/api/imports/productos',
    INVENTORY: '/api/imports/inventario',
    SALES: '/api/imports/ventas',
    TEMPLATE: (type: string) => `/api/imports/plantilla/${type}`,
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
