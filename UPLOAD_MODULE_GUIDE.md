# 📤 Guía del Módulo de Carga de Datos

## 🎯 Descripción

El módulo de carga de datos permite importar información masiva de productos, inventario y ventas mediante archivos CSV o Excel.

---

## ✨ Características Implementadas

### 1. **Carga de Archivos**
- ✅ Drag & Drop (arrastrar y soltar)
- ✅ Selección manual de archivos
- ✅ Validación de formato (.csv, .xlsx, .xls)
- ✅ Validación de tamaño (máximo 10MB)
- ✅ Vista previa de datos (primeras 5 filas)
- ✅ Indicadores de progreso

### 2. **Tipos de Datos Soportados**
- **Productos**: Catálogo de productos con marca, precio, talla, etc.
- **Inventario**: Stock por sucursal y producto
- **Ventas/Facturas**: Transacciones de venta

### 3. **Plantillas Descargables**
- Plantillas pre-formateadas para cada tipo de dato
- Descarga directa desde el componente
- Formato CSV para fácil edición

### 4. **Feedback Visual**
- Estados de carga (subiendo, exitoso, error)
- Contador de registros procesados
- Detalles de errores por fila
- Mensajes claros y descriptivos

---

## 🔌 Endpoints del Backend

El backend debe implementar estos endpoints:

### **POST /api/upload/products**
Subir archivo de productos

**Request:**
```
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- file: File (CSV o Excel)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Productos cargados exitosamente",
    "processed": 150,
    "errors": 2,
    "errorDetails": [
      {
        "row": 45,
        "error": "Precio inválido"
      },
      {
        "row": 78,
        "error": "Categoría no existe"
      }
    ]
  }
}
```

### **POST /api/upload/inventory**
Subir archivo de inventario

**Request:**
```
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- file: File (CSV o Excel)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Inventario actualizado exitosamente",
    "processed": 892,
    "errors": 0
  }
}
```

### **POST /api/upload/sales**
Subir archivo de ventas/facturas

**Request:**
```
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- file: File (CSV o Excel)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Ventas registradas exitosamente",
    "processed": 1245,
    "errors": 5,
    "errorDetails": [...]
  }
}
```

### **GET /api/upload/template/:type**
Descargar plantilla de ejemplo

**Parámetros:**
- `type`: 'products' | 'inventory' | 'sales'

**Response:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="plantilla_products.csv"

[Archivo CSV con headers y datos de ejemplo]
```

---

## 📋 Formato de Plantillas

### **Plantilla de Productos** (`plantilla_products.csv`)
```csv
nombre,marca,precio,talla,descripcion,categoria,subcategoria
T-Shirt Básica Blanca,Nike,25.99,M,Camiseta de algodón 100%,Ropa,T-Shirts
Jean Skinny Azul,Levi's,45.50,L,Jean ajustado color azul,Ropa,Jeans
```

**Campos requeridos:**
- `nombre`: Nombre del producto
- `marca`: Marca del producto
- `precio`: Precio (número decimal)
- `talla`: Talla (XS, S, M, L, XL, etc.)
- `descripcion`: Descripción del producto
- `categoria`: Nombre de la categoría
- `subcategoria`: Nombre de la subcategoría

### **Plantilla de Inventario** (`plantilla_inventory.csv`)
```csv
producto_id,sucursal_id,stock
1,1,145
2,1,23
3,2,67
```

**Campos requeridos:**
- `producto_id`: ID del producto (debe existir en la BD)
- `sucursal_id`: ID de la sucursal (debe existir en la BD)
- `stock`: Cantidad en stock (número entero)

### **Plantilla de Ventas** (`plantilla_sales.csv`)
```csv
numero_factura,fecha,cliente_id,sucursal_id,producto_id,cantidad,precio
F-2025-001,2025-01-15,1,1,1,2,25.99
F-2025-001,2025-01-15,1,1,2,1,45.50
F-2025-002,2025-01-16,2,1,3,3,35.00
```

**Campos requeridos:**
- `numero_factura`: Número único de factura
- `fecha`: Fecha de venta (YYYY-MM-DD)
- `cliente_id`: ID del cliente (debe existir en la BD)
- `sucursal_id`: ID de la sucursal
- `producto_id`: ID del producto
- `cantidad`: Cantidad vendida
- `precio`: Precio unitario

---

## 🔧 Implementación en el Backend (AdonisJS)

### **Ejemplo: Controller de Upload**

```typescript
// app/Controllers/Http/UploadController.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import csv from 'csv-parser'
import fs from 'fs'

export default class UploadController {
  public async uploadProducts({ request, response }: HttpContextContract) {
    const file = request.file('file', {
      size: '10mb',
      extnames: ['csv', 'xlsx', 'xls'],
    })

    if (!file) {
      return response.badRequest({ message: 'Archivo no válido' })
    }

    await file.move(Application.tmpPath('uploads'))

    const results: any[] = []
    const errors: any[] = []
    let processed = 0

    // Leer archivo CSV
    fs.createReadStream(file.filePath!)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          // Validar y crear producto
          await Database.table('producto').insert({
            nombre: row.nombre,
            marca: row.marca,
            precio: parseFloat(row.precio),
            talla: row.talla,
            descripcion: row.descripcion,
            // ... otros campos
          })
          processed++
        } catch (error) {
          errors.push({
            row: processed + 1,
            error: error.message,
          })
        }
      })
      .on('end', () => {
        return response.ok({
          success: true,
          data: {
            success: errors.length === 0,
            message: errors.length === 0 
              ? 'Productos cargados exitosamente' 
              : 'Carga completada con errores',
            processed,
            errors: errors.length,
            errorDetails: errors.slice(0, 10), // Primeros 10 errores
          },
        })
      })
  }

  public async downloadTemplate({ params, response }: HttpContextContract) {
    const { type } = params

    const templates = {
      products: 'nombre,marca,precio,talla,descripcion,categoria,subcategoria\n' +
                'T-Shirt Básica,Nike,25.99,M,Camiseta algodón,Ropa,T-Shirts\n',
      inventory: 'producto_id,sucursal_id,stock\n1,1,145\n',
      sales: 'numero_factura,fecha,cliente_id,sucursal_id,producto_id,cantidad,precio\n' +
             'F-2025-001,2025-01-15,1,1,1,2,25.99\n',
    }

    const template = templates[type]
    if (!template) {
      return response.notFound({ message: 'Plantilla no encontrada' })
    }

    response.header('Content-Type', 'text/csv')
    response.header('Content-Disposition', `attachment; filename="plantilla_${type}.csv"`)
    return response.send(template)
  }
}
```

### **Rutas (routes.ts)**

```typescript
Route.group(() => {
  Route.post('/upload/products', 'UploadController.uploadProducts')
  Route.post('/upload/inventory', 'UploadController.uploadInventory')
  Route.post('/upload/sales', 'UploadController.uploadSales')
  Route.get('/upload/template/:type', 'UploadController.downloadTemplate')
}).middleware('auth')
```

---

## 🎨 Uso del Componente

```typescript
import { UploadDataNew } from './components/UploadDataNew';

function App() {
  return (
    <div>
      <UploadDataNew />
    </div>
  );
}
```

---

## ✅ Validaciones Implementadas

### **Frontend**
- ✅ Formato de archivo (.csv, .xlsx, .xls)
- ✅ Tamaño máximo (10MB)
- ✅ Vista previa antes de subir

### **Backend (Recomendado)**
- Validar estructura de columnas
- Validar tipos de datos
- Validar existencia de IDs referenciados
- Validar rangos de valores (precios, stock, etc.)
- Validar duplicados
- Transacciones para rollback en caso de error

---

## 🚨 Manejo de Errores

El componente maneja automáticamente:
- Archivos con formato inválido
- Archivos demasiado grandes
- Errores de red
- Errores del servidor
- Muestra detalles de errores por fila

---

## 📊 Ejemplo de Flujo Completo

1. Usuario selecciona "Productos" en el selector
2. Descarga la plantilla de productos
3. Completa la plantilla con datos
4. Arrastra el archivo al área de carga
5. Ve la vista previa (primeras 5 filas)
6. Hace clic en "Subir Archivo"
7. El sistema procesa y muestra:
   - ✓ 148 registros procesados
   - ✗ 2 errores
   - Detalles de los errores

---

## 🔐 Seguridad

- ✅ Requiere autenticación (token JWT)
- ✅ Validación de tipo de archivo
- ✅ Límite de tamaño
- ⚠️ Backend debe validar permisos por rol
- ⚠️ Backend debe sanitizar datos de entrada

---

## 📝 Notas para el Backend

1. **Procesamiento Asíncrono**: Para archivos grandes, considera procesar en background
2. **Logs**: Registra todas las cargas para auditoría
3. **Rollback**: Usa transacciones para revertir en caso de error
4. **Notificaciones**: Envía email cuando termine el procesamiento
5. **Límites**: Considera límite de registros por archivo (ej: 10,000)

---

**¡El módulo de carga de datos está listo para usar! 🚀**
