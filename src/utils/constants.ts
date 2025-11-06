import { BlessCardColors } from '../types';

// Bless Card Official Color Palette
export const BLESS_COLORS: BlessCardColors = {
  yellow: '#FFD400',
  orange: '#F7931E', 
  green: '#009245',
  blue: '#0071BC',
  purple: '#662D91',
  fucsia: '#ED1E79',
  white: '#FFFFFF',
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { id: 'beneficios', label: 'Beneficios', path: '#beneficios' },
  { id: 'como-funciona', label: 'Cómo Funciona', path: '#como-funciona' },
  { id: 'testimonios', label: 'Testimonios', path: '#testimonios' },
  { id: 'contacto', label: 'Contacto', path: '#contacto' },
] as const;

// App configuration
export const APP_CONFIG = {
  name: 'Bless Card',
  tagline: 'La Tarjeta que Bendice tu Futuro',
  description: 'La tarjeta que bendice tu futuro financiero con beneficios únicos, recompensas increíbles y una experiencia bancaria revolucionaria.',
  contact: {
    phone: '+1 (800) BLESS-CARD',
    email: 'hola@blesscard.com',
    address: 'Ciudad de México, México',
  },
} as const;
