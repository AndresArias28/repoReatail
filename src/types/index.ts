// Global types for the Bless Card application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export interface BlessCardColors {
  yellow: string;
  orange: string;
  green: string;
  blue: string;
  purple: string;
  fucsia: string;
  white: string;
}

export interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface StatCard {
  icon: React.ReactNode;
  number: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color: string;
}

export interface TestimonialCard {
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  color: string;
}
