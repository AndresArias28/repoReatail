// ============================================
// TIPOS BASADOS EN LA BASE DE DATOS POSTGRESQL
// ============================================

export interface Cliente {
  idCliente: number;
  nombres: string;
  identificacion: string;
  email: string;
}

export interface Departamento {
  iddepartamentos: number;
  nombre_dpto: string;
}

export interface Municipio {
  idmunicipio: number;
  iddepartamentos: number;
  nombre_municipio: string;
  departamento?: Departamento;
}

export interface Sucursal {
  idSucursal: number;
  idmunicipio: number;
  NIT: string;
  nombre: string;
  direccion: string;
  email: string;
  municipio?: Municipio;
}

export interface Categoria {
  idCategoria: number;
  nombre_categoria: string;
}

export interface Subcategoria {
  idsubcategoria: number;
  idCategoria: number;
  nombre_subcategoria: string;
  categoria?: Categoria;
}

export interface Producto {
  idproducto: number;
  idsubcategoria: number;
  nombre: string;
  marca: string;
  precio: number;
  talla: string;
  descripcion: string;
  subcategoria?: Subcategoria;
}

export interface Inventario {
  idInventario: number;
  idproducto: number;
  idSucursal: number;
  stock: number;
  producto?: Producto;
  sucursal?: Sucursal;
}

export interface Factura {
  idFactura: number;
  numero_factura: string;
  fecha: string; // ISO date string
  idCliente: number;
  idSucursal: number;
  cliente?: Cliente;
  sucursal?: Sucursal;
  detalles?: Detalle[];
}

export interface Detalle {
  idDetalle: number;
  idFactura: number;
  idproducto: number;
  cantidad: number;
  precio: number;
  precio_total: number;
  factura?: Factura;
  producto?: Producto;
}

export interface Usuario {
  idUsuario: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  email: string;
  password?: string; // No debe venir del backend
  rol: 'empleado' | 'administrador';
  idSucursal: number;
  sucursal?: Sucursal;
}

// ============================================
// TIPOS PARA ANALYTICS Y REPORTES
// ============================================

export interface VentasPorCategoria {
  categoria: string;
  ventas: number;
  cantidad: number;
}

export interface VentasPorTalla {
  talla: string;
  cantidad: number;
  porcentaje: number;
}

export interface VentasPorMes {
  mes: string;
  ventas: number;
  cantidad: number;
}

export interface VentasDiarias {
  fecha: string;
  ventas: number;
  cantidad: number;
}

export interface ProductoMasVendido {
  idproducto: number;
  nombre: string;
  marca: string;
  categoria: string;
  cantidad: number;
  ventas_totales: number;
}

export interface InventarioConAlerta {
  idInventario: number;
  idproducto: number;
  nombre: string;
  categoria: string;
  talla: string;
  stock: number;
  nivel: 'alto' | 'medio' | 'bajo' | 'critico';
  sucursal: string;
}

export interface Recomendacion {
  id: number;
  type: 'stock' | 'promo' | 'urgente' | 'oportunidad';
  priority: 'critica' | 'alta' | 'media' | 'baja';
  title: string;
  description: string;
  action: string;
  idproducto?: number;
  producto?: string;
}

export interface KPIData {
  ventas_totales: number;
  producto_mas_vendido: string;
  stock_promedio: number;
  rotacion_mensual: number;
  cambio_ventas: number;
  cambio_rotacion: number;
}

// ============================================
// TIPOS PARA FILTROS
// ============================================

export interface FiltrosAnalytics {
  idSucursal?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  genero?: 'Hombre' | 'Mujer' | 'Niño' | 'Niña' | 'Todos';
  categoria?: number;
  subcategoria?: number;
  marca?: string;
  talla?: string;
}

// ============================================
// TIPOS PARA RESPUESTAS DE API
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

// ============================================
// TIPOS PARA AUTENTICACIÓN
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Usuario;
}

export interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
