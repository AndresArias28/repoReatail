import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Building2,
  Lightbulb,
  Upload,
  Settings,
  Bell,
  HelpCircle,
  SettingsIcon,
  User,
  BarChart3,
  FileText,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';

export function DashboardLayout() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');
  const { user, logout } = useAuth();
  const isEmpleado = user?.rol === 'empleado';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutDashboard, path: '/dashboard', roles: ['empleado', 'administrador'] },
    { id: 'ventas', label: 'Ventas por Mes', icon: TrendingUp, path: '/dashboard/ventas', roles: ['empleado', 'administrador'] },
    { id: 'inventario', label: 'Inventario Actual', icon: Package, path: '/dashboard/inventario', roles: ['empleado', 'administrador'] },
    { id: 'sucursales', label: 'Sucursales', icon: Building2, path: '/dashboard/sucursales', roles: ['administrador'] },
    { id: 'facturas', label: 'Facturas', icon: FileText, path: '/dashboard/facturas', roles: ['empleado', 'administrador'] },
    { id: 'recomendaciones', label: 'Recomendaciones', icon: Lightbulb, path: '/dashboard/recomendaciones', roles: ['empleado', 'administrador'] },
    { id: 'carga', label: 'Carga de Datos', icon: Upload, path: '/dashboard/carga', roles: ['empleado', 'administrador'] },
    { id: 'configuracion', label: 'Configuración', icon: Settings, path: '/dashboard/configuracion', roles: ['empleado', 'administrador'] },
  ];
  
  // Filtrar menú según rol del usuario
  const menuItems = allMenuItems.filter(item => 
    item.roles.includes(user?.rol || 'empleado')
  );

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
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nombres} {user?.apellidos}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.rol === 'administrador' ? 'Administrador' : 'Empleado'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center gradient-bless">
                <User className="w-5 h-5 text-white" />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </Button>
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
