# 🛍️ Sistema de Gestión de Inventario Retail - Frontend

Sistema web moderno para la gestión integral de inventarios, ventas y análisis de datos para tiendas de ropa. Construido con React 18, TypeScript, Vite y Axios.

## ✨ Características Principales

- **📊 Dashboard Analítico**: Visualización en tiempo real de métricas clave
- **📦 Gestión de Inventario**: Control completo de productos y stock
- **📈 Análisis de Ventas**: Reportes detallados por mes, productos y tallas
- **🏢 Multi-Sucursal**: Soporte para múltiples ubicaciones (preparado para multi-tenant)
- **🔐 Autenticación JWT**: Sistema seguro de login y gestión de sesiones
- **📱 Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **⚡ Performance**: Carga rápida con lazy loading y optimización de bundle

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Backend corriendo en `http://localhost:3333` (o configurar `.env`)

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd retail/repoReatail
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env`:
   ```env
   VITE_API_BASE_URL=https://hackatomventaprendasback.onrender.com
   ```

4. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible en `http://localhost:3000`

5. **Construir para producción**:
   ```bash
   npm run build
   npm run preview  # Para previsualizar el build
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── dashboard/           # Componentes del dashboard
│   │   ├── DashboardLayout.tsx
│   │   └── Sidebar.tsx
│   ├── DashboardNew.tsx     # Dashboard principal con analytics
│   ├── InventoryNew.tsx     # Gestión de inventario
│   ├── SalesMonthNew.tsx    # Análisis de ventas mensuales
│   ├── LandingPage.tsx      # Página de inicio pública
│   ├── LoginPage.tsx        # Autenticación
│   └── ui/                  # Componentes UI reutilizables (shadcn/ui)
├── services/
│   ├── api.service.ts       # Cliente Axios base con interceptores
│   ├── auth.service.ts      # Servicios de autenticación
│   ├── analytics.service.ts # Servicios de estadísticas
│   ├── inventory.service.ts # Servicios de inventario
│   ├── branches.service.ts  # Servicios de sucursales
│   └── upload.service.ts    # Carga de archivos
├── hooks/
│   ├── useAuth.ts           # Hook de autenticación
│   ├── useAnalytics.ts      # Hooks de analytics
│   ├── useInventory.ts      # Hooks de inventario
│   └── useBranches.ts       # Hooks de sucursales
├── context/
│   └── AuthContext.tsx      # Contexto global de autenticación
├── config/
│   └── api.config.ts        # Configuración de endpoints y URLs
├── types/
│   └── database.types.ts    # Tipos TypeScript del sistema
├── styles/
│   └── globals.css          # Estilos globales
├── App.tsx                  # Componente raíz con rutas
└── main.tsx                 # Punto de entrada
```

## 🎯 Módulos del Sistema

### 1. **Dashboard Principal**
- Métricas en tiempo real (ventas, productos, clientes)
- Gráficos de productos más vendidos
- Distribución de tallas vendidas
- Productos de baja rotación

### 2. **Gestión de Inventario**
- Lista completa de productos en stock
- Filtros por sucursal y búsqueda
- Indicadores de stock (Alto/Medio/Bajo)
- Paginación de resultados
- Estadísticas de inventario

### 3. **Análisis de Ventas**
- Ventas por mes con filtros
- Top 5 productos más vendidos
- Métricas de ventas totales
- Promedio diario de ventas
- Unidades vendidas

### 4. **Autenticación**
- Login con JWT
- Gestión de sesión
- Protección de rutas privadas
- Logout seguro

## 🛠️ Stack Tecnológico

### Core
- **React 18** - Biblioteca de UI con hooks
- **TypeScript** - Tipado estático y mejor DX
- **Vite 6** - Build tool ultra-rápido
- **React Router DOM** - Enrutamiento SPA

### HTTP & Estado
- **Axios** - Cliente HTTP con interceptores
- **React Hooks** - Gestión de estado local
- **Context API** - Estado global (Auth)

### UI & Estilos
- **Tailwind CSS** - Framework de utilidades CSS
- **shadcn/ui** - Componentes accesibles y personalizables
- **Lucide React** - Iconos modernos
- **Radix UI** - Primitivos de UI accesibles
- **Recharts** - Gráficos y visualizaciones

### Utilidades
- **date-fns** - Manejo de fechas
- **clsx** - Composición de clases CSS
- **tailwind-merge** - Merge inteligente de clases Tailwind

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño
- **Services Layer**: Encapsula toda la lógica de comunicación con el backend
- **Custom Hooks**: Abstrae la lógica de estado y efectos secundarios
- **Component Composition**: Componentes reutilizables y modulares
- **Context API**: Estado global para autenticación

### Flujo de Datos
```
Componente → Hook → Service → API Backend
   ↓          ↓        ↓           ↓
 UI Logic   State   HTTP      Database
```

### Interceptores Axios
- **Request**: Agrega automáticamente el token JWT
- **Response**: Maneja errores de forma centralizada
- **Timeout**: 30 segundos para peticiones normales, 60s para uploads

### Gestión de Errores
- Manejo centralizado en `api.service.ts`
- Fallbacks a datos mock cuando el backend no responde
- Validaciones defensivas en componentes
- Mensajes de error user-friendly

## 🔮 Roadmap y Desarrollo Futuro

### ✅ Implementado
- [x] Sistema de autenticación JWT
- [x] Dashboard con analytics en tiempo real
- [x] Gestión de inventario con filtros
- [x] Análisis de ventas mensuales
- [x] Migración de Fetch a Axios
- [x] Diseño responsive
- [x] Integración con backend AdonisJS

### 🚧 En Desarrollo
- [ ] **Multi-Tenant**: Soporte para múltiples empresas
  - Aislamiento de datos por tenant
  - Subdominios personalizados
  - Configuración por tenant
- [ ] Gestión completa de sucursales (CRUD)
- [ ] Módulo de facturación
- [ ] Reportes exportables (PDF/Excel)
- [ ] Gestión de usuarios y roles

### 📋 Planificado
- [ ] **Multi-Tenant Avanzado**:
  - Dashboard por tenant
  - Temas personalizables
  - Configuración de permisos granular
- [ ] Notificaciones en tiempo real
- [ ] Módulo de clientes
- [ ] Integración con sistemas de pago
- [ ] App móvil (React Native)
- [ ] PWA (Progressive Web App)
- [ ] Modo offline con sincronización

## 🏢 Multi-Tenant Architecture (Planificado)

### Estrategia
- **Database per Tenant**: Cada empresa tendrá su propia base de datos
- **Shared Schema**: Esquema compartido con columna `tenant_id`
- **Subdomain Routing**: `empresa1.sistema.com`, `empresa2.sistema.com`

### Implementación
```typescript
// Middleware de tenant
axios.interceptors.request.use((config) => {
  const tenantId = getTenantFromSubdomain();
  config.headers['X-Tenant-ID'] = tenantId;
  return config;
});
```

## 🚀 Deploy

### Variables de Entorno Requeridas
```env
VITE_API_BASE_URL=https://tu-backend.com
```

### Plataformas Soportadas

#### Netlify
```bash
npm run build
# Sube la carpeta dist/
```

#### Vercel
- Conecta el repositorio
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

#### Render
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

## 📊 Endpoints del Backend

### Autenticación
- `POST /auth/login` - Login de usuario
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/me` - Usuario actual

### Inventario
- `GET /inventario/obtener` - Lista de inventario
- `GET /inventario/obtenerPorId/:id` - Inventario por ID
- `POST /inventario/crear` - Crear inventario
- `PUT /inventario/actualizar/:id` - Actualizar inventario

### Estadísticas
- `GET /estadisticas/masVendidos` - Productos más vendidos
- `GET /estadisticas/tallasMayorSalida` - Tallas más vendidas
- `GET /estadisticas/menosVendidos` - Productos de baja rotación
- `GET /estadisticas/descuentoBajaRotacion` - Descuentos sugeridos

### Productos
- `GET /productos/obtener` - Lista de productos
- `GET /productos/obtenerPorId/:id` - Producto por ID

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Convenciones de Código

- **Componentes**: PascalCase (`DashboardNew.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useInventory.ts`)
- **Services**: camelCase con sufijo `.service` (`api.service.ts`)
- **Types**: PascalCase (`Inventario`, `ApiResponse`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 📄 Licencia

Este proyecto utiliza:
- [shadcn/ui](https://ui.shadcn.com/) - MIT License
- [Lucide Icons](https://lucide.dev/) - ISC License
- [Recharts](https://recharts.org/) - MIT License

## 👥 Equipo de Desarrollo

Proyecto desarrollado para la gestión de inventarios retail con enfoque en escalabilidad y multi-tenant.

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025