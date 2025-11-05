import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  Lightbulb, 
  Upload, 
  Settings 
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutDashboard },
    { id: 'sales', label: 'Ventas por Mes', icon: TrendingUp },
    { id: 'inventory', label: 'Inventario Actual', icon: Package },
    { id: 'recommendations', label: 'Recomendaciones', icon: Lightbulb },
    { id: 'upload', label: 'Carga de Datos', icon: Upload },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r bg-white">
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`justify-start gap-3 ${
                isActive 
                  ? 'bg-[#1E88E5] text-white hover:bg-[#1976D2]' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
