# 🚀 Guía de Integración con Backend AdonisJS + Supabase

## 📋 Resumen

Este proyecto está **100% preparado** para consumir las APIs del backend. Solo necesitas configurar la URL del backend y las APIs comenzarán a funcionar automáticamente.

---

## ⚙️ Configuración Inicial

### 1. Crear archivo `.env`

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

### 2. Configurar URL del Backend

Edita el archivo `.env` y configura la URL de tu backend AdonisJS:

```env
VITE_API_BASE_URL=http://localhost:3333
```

**Nota:** Cambia `http://localhost:3333` por la URL de tu servidor AdonisJS en producción.

---

## 📁 Estructura Creada

```
src/
├── types/
│   └── database.types.ts          # Tipos TypeScript basados en PostgreSQL
├── config/
│   └── api.config.ts               # Configuración de endpoints y headers
├── services/
│   ├── api.service.ts              # Servicio base para peticiones HTTP
│   ├── analytics.service.ts        # Servicio de analytics
│   ├── inventory.service.ts        # Servicio de inventario
│   ├── auth.service.ts             # Servicio de autenticación
│   └── branches.service.ts         # Servicio de sucursales
├── hooks/
│   ├── useAnalytics.ts             # Hooks para datos de analytics
│   ├── useInventory.ts             # Hooks para inventario
│   └── useBranches.ts              # Hooks para sucursales
├── context/
│   └── AuthContext.tsx             # Contexto de autenticación
└── components/
    └── DashboardNew.tsx            # Dashboard con integración API
```

---

## 🔌 Endpoints Configurados

### Analytics
- `GET /api/analytics/kpi` - KPIs principales
- `GET /api/analytics/sales-by-category` - Ventas por categoría
- `GET /api/analytics/sales-by-size` - Ventas por talla
- `GET /api/analytics/sales-by-month` - Ventas mensuales
- `GET /api/analytics/sales-daily` - Ventas diarias
- `GET /api/analytics/top-products` - Productos más vendidos
- `GET /api/analytics/recommendations` - Recomendaciones

### Inventario
- `GET /api/inventory` - Lista de inventario (paginado)
- `GET /api/inventory/:id` - Inventario por ID
- `GET /api/inventory/sucursal/:id` - Inventario por sucursal
- `GET /api/inventory/low-stock` - Productos con stock bajo
- `PATCH /api/inventory/:id/stock` - Actualizar stock

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Usuario actual

### Sucursales
- `GET /api/branches` - Lista de sucursales
- `GET /api/branches/:id` - Sucursal por ID

---

## 📊 Estructura de Datos Esperada

### KPIs
```typescript
{
  "success": true,
  "data": {
    "ventas_totales": 19200,
    "producto_mas_vendido": "T-Shirts",
    "stock_promedio": 72,
    "rotacion_mensual": 85,
    "cambio_ventas": 12.5,
    "cambio_rotacion": 3.2
  }
}
```

### Ventas por Categoría
```typescript
{
  "success": true,
  "data": [
    {
      "categoria": "T-Shirts",
      "ventas": 4500,
      "cantidad": 450
    }
  ]
}
```

### Inventario (Paginado)
```typescript
{
  "success": true,
  "data": [
    {
      "idInventario": 1,
      "idproducto": 1,
      "idSucursal": 1,
      "stock": 145,
      "producto": {
        "nombre": "T-Shirt Básica",
        "marca": "Nike",
        "precio": 25.99,
        "talla": "M"
      }
    }
  ],
  "meta": {
    "total": 100,
    "per_page": 10,
    "current_page": 1,
    "last_page": 10
  }
}
```

---

## 🎯 Cómo Usar los Hooks

### Ejemplo: Dashboard con Analytics

```typescript
import { useKPIs, useSalesByCategory } from '../hooks/useAnalytics';

function Dashboard() {
  const { data: kpis, loading, error } = useKPIs({
    idSucursal: 1,
    fecha_inicio: '2025-01-01',
    fecha_fin: '2025-01-31'
  });

  const { data: salesByCategory } = useSalesByCategory({
    idSucursal: 1
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Ventas: ${kpis?.ventas_totales}</h1>
      {/* ... */}
    </div>
  );
}
```

### Ejemplo: Inventario

```typescript
import { useInventory } from '../hooks/useInventory';

function Inventory() {
  const { data, loading, meta } = useInventory({
    page: 1,
    per_page: 20,
    idSucursal: 1
  });

  return (
    <div>
      {data.map(item => (
        <div key={item.idInventario}>
          {item.producto?.nombre} - Stock: {item.stock}
        </div>
      ))}
    </div>
  );
}
```

---

## 🔐 Autenticación

### 1. Envolver App con AuthProvider

```typescript
// src/main.tsx
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

### 2. Usar en componentes

```typescript
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'usuario@example.com',
        password: 'password123'
      });
      // Redirigir al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <button onClick={handleLogin}>Iniciar Sesión</button>
  );
}
```

---

## 🔄 Filtros Disponibles

Todos los endpoints de analytics aceptan estos filtros:

```typescript
interface FiltrosAnalytics {
  idSucursal?: number;           // Filtrar por sucursal
  fecha_inicio?: string;         // Fecha inicio (YYYY-MM-DD)
  fecha_fin?: string;            // Fecha fin (YYYY-MM-DD)
  genero?: 'Hombre' | 'Mujer' | 'Niño' | 'Niña' | 'Todos';
  categoria?: number;            // ID de categoría
  subcategoria?: number;         // ID de subcategoría
  marca?: string;                // Filtrar por marca
  talla?: string;                // Filtrar por talla
}
```

---

## 🧪 Modo de Desarrollo (Sin Backend)

El frontend tiene **datos mock** como fallback. Si el backend no está disponible:

1. Los componentes mostrarán datos de ejemplo
2. No habrá errores en consola
3. La UI funcionará normalmente

Cuando el backend esté listo, simplemente:
1. Configura `VITE_API_BASE_URL` en `.env`
2. Los datos reales reemplazarán automáticamente los datos mock

---

## ✅ Checklist para el Backend

El backend debe implementar estos endpoints con la estructura de datos especificada:

- [ ] `POST /api/auth/login` - Retorna `{ token, user }`
- [ ] `GET /api/analytics/kpi` - Retorna KPIs
- [ ] `GET /api/analytics/sales-by-category` - Retorna ventas por categoría
- [ ] `GET /api/analytics/sales-by-size` - Retorna ventas por talla
- [ ] `GET /api/analytics/sales-by-month` - Retorna ventas mensuales
- [ ] `GET /api/inventory` - Retorna inventario paginado
- [ ] `GET /api/branches` - Retorna lista de sucursales

---

## 🚨 Manejo de Errores

Todos los servicios manejan errores automáticamente:

```typescript
const { data, loading, error } = useKPIs();

if (error) {
  // Mostrar mensaje de error al usuario
  return <div className="text-red-600">{error}</div>;
}
```

---

## 📝 Notas Importantes

1. **CORS**: Asegúrate de que el backend AdonisJS tenga CORS configurado para aceptar peticiones del frontend
2. **Tokens**: Los tokens se guardan automáticamente en `localStorage`
3. **Headers**: Todos los requests incluyen automáticamente el token de autenticación
4. **TypeScript**: Todos los tipos están definidos y validados

---

## 🎨 Componentes Listos para API

- ✅ `DashboardNew.tsx` - Dashboard principal con filtros
- ✅ `Inventory.tsx` - Puede actualizarse fácilmente
- ✅ `SalesMonth.tsx` - Puede actualizarse fácilmente
- ✅ `Recommendations.tsx` - Puede actualizarse fácilmente

---

## 🔧 Próximos Pasos

1. Configurar `.env` con la URL del backend
2. Implementar los endpoints en AdonisJS
3. Probar la integración
4. Actualizar componentes restantes para usar hooks
5. Implementar página de login
6. Agregar rutas protegidas

---

**¡Todo está listo para conectar con el backend! 🚀**
