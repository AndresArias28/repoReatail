# 🚀 Guía de Deploy en Vercel

## Preparación del Proyecto

El proyecto ya está configurado para desplegarse en Vercel con la carpeta `dist`.

### Archivos de Configuración

- ✅ `vite.config.ts` - Configurado con `outDir: 'dist'`
- ✅ `vercel.json` - Configuración de rewrites y headers
- ✅ `package.json` - Scripts de build y preview
- ✅ `.gitignore` - Excluye dist/ y archivos innecesarios
- ✅ `.env.example` - Template de variables de entorno

## 📋 Pasos para Deploy en Vercel

### Opción 1: Deploy desde la Web (Recomendado)

1. **Ir a [Vercel](https://vercel.com)**
   - Iniciar sesión con GitHub

2. **Importar Proyecto**
   - Click en "Add New..." → "Project"
   - Seleccionar el repositorio del frontend
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configurar el Proyecto**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Configurar Variables de Entorno**
   - En "Environment Variables" agregar:
   ```
   VITE_API_BASE_URL=https://hackatomventaprendasback.onrender.com
   ```

5. **Deploy**
   - Click en "Deploy"
   - Esperar a que termine el build (2-3 minutos)
   - ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

### Opción 2: Deploy desde CLI

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login en Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd c:\monoHack\retail\repoReatail
   vercel
   ```

4. **Configurar en el primer deploy**
   - Set up and deploy? `Y`
   - Which scope? Seleccionar tu cuenta
   - Link to existing project? `N`
   - Project name? `retail-inventory` (o el que prefieras)
   - In which directory is your code located? `./`
   - Want to override settings? `N`

5. **Deploy a Producción**
   ```bash
   vercel --prod
   ```

## 🔧 Build Local (Opcional)

Para probar el build antes de deployar:

```bash
# Instalar dependencias
npm install

# Crear build
npm run build

# Previsualizar build localmente
npm run preview
```

La preview estará disponible en `http://localhost:4173`

## 🌐 Variables de Entorno en Vercel

Después del deploy, configurar en Vercel Dashboard:

1. Ir a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agregar:

```
VITE_API_BASE_URL=https://hackatomventaprendasback.onrender.com
```

4. Redeploy para aplicar cambios

## 📊 Configuración del Proyecto

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Características del Deploy
- ✅ **SPA Routing**: Todas las rutas redirigen a index.html
- ✅ **Cache Optimizado**: Assets cacheados por 1 año
- ✅ **Build Automático**: Deploy automático en cada push a main
- ✅ **Preview Deployments**: Deploy preview en cada PR
- ✅ **HTTPS**: SSL automático

## 🔄 Deploy Automático

Para habilitar deploy automático:

1. Conectar repositorio en Vercel
2. Configurar rama de producción (main o master)
3. Cada push a esa rama hará deploy automático

## 🐛 Troubleshooting

### Error: "Build failed"
- Verificar que todas las dependencias estén en `package.json`
- Revisar que no haya errores de TypeScript
- Verificar que `npm run build` funcione localmente

### Error: "404 on page refresh"
- Verificar que `vercel.json` tenga los rewrites correctos
- El archivo ya está configurado correctamente

### Error: "API calls failing"
- Verificar que `VITE_API_BASE_URL` esté configurada
- Verificar que el backend esté corriendo
- Revisar CORS en el backend

## 📱 URLs del Proyecto

- **Frontend (Vercel)**: `https://tu-proyecto.vercel.app`
- **Backend (Render)**: `https://hackatomventaprendasback.onrender.com`

## ✅ Checklist Pre-Deploy

- [x] `vite.config.ts` configurado con `outDir: 'dist'`
- [x] `vercel.json` creado
- [x] Scripts de build en `package.json`
- [x] `.gitignore` actualizado
- [x] Variables de entorno documentadas
- [x] Build local exitoso
- [x] README actualizado

## 🎉 Post-Deploy

Después del deploy exitoso:

1. Probar todas las rutas principales:
   - `/` - Landing page
   - `/login` - Login
   - `/dashboard` - Dashboard (requiere auth)
   - `/admin` - Panel admin (requiere auth)

2. Verificar que la API se conecte correctamente

3. Configurar dominio personalizado (opcional):
   - Settings → Domains
   - Agregar dominio custom

---

**¡Tu aplicación está lista para producción! 🚀**
