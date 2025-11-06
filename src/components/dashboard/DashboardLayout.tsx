import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  ShoppingBag,
  Building2,
  Lightbulb,
  Upload,
  Settings,
  Bell,
  HelpCircle,
  SettingsIcon,
  User,
  BarChart3,
  FileText
} from 'lucide-react';
import { Button } from '../ui/button';

export function DashboardLayout() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'ventas', label: 'Ventas por Mes', icon: TrendingUp, path: '/dashboard/ventas' },
    { id: 'productos', label: 'Productos', icon: ShoppingBag, path: '/dashboard/productos' },
    { id: 'inventario', label: 'Inventario Actual', icon: Package, path: '/dashboard/inventario' },
    { id: 'sucursales', label: 'Sucursales', icon: Building2, path: '/dashboard/sucursales' },
    { id: 'facturas', label: 'Facturas', icon: FileText, path: '/dashboard/facturas' },
    { id: 'recomendaciones', label: 'Recomendaciones', icon: Lightbulb, path: '/dashboard/recomendaciones' },
    { id: 'carga', label: 'Carga de Datos', icon: Upload, path: '/dashboard/carga' },
    { id: 'configuracion', label: 'Configuración', icon: Settings, path: '/dashboard/configuracion' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bless rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Fashion Analytics</h1>
              <p className="text-xs text-gray-500">Panel de Control Empresarial</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  navigate(item.path);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isActive ? {background: 'linear-gradient(to right, #0071BC, #662D91)'} : {}}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <SettingsIcon className="w-5 h-5 text-gray-600" />
            </Button>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">María González</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center gradient-bless">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
