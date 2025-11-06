# 🎨 Bless Card - Super Landing Page

Una landing page moderna y vibrante para Bless Card, la tarjeta que bendice tu futuro financiero. Construida con React, TypeScript, Vite y la paleta de colores oficial de Bless Card.

## ✨ Características

- **🎨 Paleta de Colores Bless Card**: Implementación completa de los colores oficiales
- **📱 Diseño Responsive**: Optimizada para todos los dispositivos
- **⚡ Animaciones Fluidas**: Contadores animados y transiciones suaves
- **🚀 Performance Optimizada**: Construida con Vite para máxima velocidad
- **🎯 Conversión Orientada**: Diseño enfocado en generar leads y conversiones

## 🎨 Paleta de Colores

| Color | Descripción | Código HEX |
|-------|-------------|------------|
| 🟡 | Amarillo brillante | `#FFD400` |
| 🟠 | Naranja | `#F7931E` |
| 🟢 | Verde medio | `#009245` |
| 🔵 | Azul | `#0071BC` |
| 🟣 | Morado | `#662D91` |
| 🌸 | Fucsia | `#ED1E79` |
| ⚪ | Blanco | `#FFFFFF` |

## 🚀 Inicio Rápido

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── LandingPage.tsx      # Componente principal de la landing
│   ├── AnimatedCounter.tsx  # Contador animado para estadísticas
│   └── ui/                  # Componentes de UI (shadcn/ui)
├── styles/
│   └── globals.css          # Variables CSS con paleta Bless Card
├── App.tsx                  # Componente raíz
└── main.tsx                 # Punto de entrada
```

## 🎯 Secciones de la Landing Page

1. **Hero Section**: Presentación impactante con CTA principal
2. **Beneficios**: Tarjetas con los principales beneficios de Bless Card
3. **Estadísticas**: Contadores animados con números impresionantes
4. **Cómo Funciona**: Proceso de 3 pasos para obtener la tarjeta
5. **Testimonios**: Reseñas de usuarios satisfechos
6. **CTA Final**: Llamada a la acción para conversión
7. **Footer**: Información de contacto y enlaces útiles

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Iconos
- **Radix UI** - Primitivos de UI accesibles

## 🎨 Personalización

Las variables de color están definidas en `src/styles/globals.css`:

```css
:root {
  --bless-yellow: #FFD400;
  --bless-orange: #F7931E;
  --bless-green: #009245;
  --bless-blue: #0071BC;
  --bless-purple: #662D91;
  --bless-fucsia: #ED1E79;
  --bless-white: #FFFFFF;
}
```

## 📱 Responsive Design

La landing page está optimizada para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🚀 Deploy

El proyecto está listo para ser desplegado en cualquier plataforma:

- **Netlify**: `npm run build` y sube la carpeta `dist`
- **Vercel**: Conecta el repositorio directamente
- **GitHub Pages**: Usa GitHub Actions para deploy automático

## 📄 Licencia

Este proyecto utiliza componentes de [shadcn/ui](https://ui.shadcn.com/) bajo licencia MIT.