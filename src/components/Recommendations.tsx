import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Target,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const recommendations = [
  {
    id: 1,
    type: 'stock',
    priority: 'alta',
    title: 'Aumentar stock de T-Shirts talla M',
    description: 'La demanda ha aumentado un 45% en las últimas 2 semanas. Stock actual: 145 unidades (rotación: 3 días).',
    action: 'Reabastecer 200 unidades',
    icon: TrendingUp,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 2,
    type: 'promo',
    priority: 'alta',
    title: 'Aplicar descuento a Jeans XL',
    description: 'Baja rotación detectada (19 unidades sin movimiento en 30 días). Riesgo de inventario estancado.',
    action: 'Descuento 20-30%',
    icon: AlertTriangle,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 3,
    type: 'urgente',
    priority: 'crítica',
    title: 'Stock crítico: Short Deportivo talla S',
    description: 'Solo quedan 5 unidades. Producto con alta rotación en temporada actual.',
    action: 'Compra urgente',
    icon: Zap,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 4,
    type: 'oportunidad',
    priority: 'media',
    title: 'Impulsar venta de Vestidos Cóctel',
    description: 'Temporada de eventos sociales próxima. Ventas históricas muestran incremento del 60% en noviembre.',
    action: 'Campaña promocional',
    icon: Target,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 5,
    type: 'stock',
    priority: 'media',
    title: 'Optimizar inventario de Abrigos',
    description: 'Stock actual de 12 unidades es suficiente para las próximas 2 semanas basado en tendencias.',
    action: 'Mantener nivel actual',
    icon: Sparkles,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 6,
    type: 'promo',
    priority: 'baja',
    title: 'Liquidar Vestidos Florales de Verano',
    description: 'Temporada finalizando. 67 unidades en stock. Preparar para nueva colección.',
    action: 'Liquidación 40%',
    icon: TrendingUp,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
];

export function Recommendations() {
  const getPriorityBadge = (priority: string) => {
    const configs = {
      crítica: { label: 'Crítica', className: 'bg-red-600 hover:bg-red-700' },
      alta: { label: 'Alta', className: 'bg-orange-600 hover:bg-orange-700' },
      media: { label: 'Media', className: 'bg-blue-600 hover:bg-blue-700' },
      baja: { label: 'Baja', className: 'bg-gray-600 hover:bg-gray-700' },
    };
    
    const config = configs[priority as keyof typeof configs];
    return (
      <Badge className={`${config.className} text-white`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-l-4 border-l-[#1E88E5] shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#1E88E5]" />
            Recomendaciones Inteligentes
          </CardTitle>
          <p className="text-sm text-gray-600">
            Sugerencias automáticas basadas en análisis de datos y patrones de venta
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <Card key={rec.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${rec.bgColor}`}>
                    <Icon className={`h-6 w-6 ${rec.iconColor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="text-lg">{rec.title}</h3>
                      {getPriorityBadge(rec.priority)}
                    </div>
                    
                    <p className="mb-4 text-sm text-gray-600">
                      {rec.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Button size="sm" className="gap-2 bg-[#1E88E5] hover:bg-[#1976D2]">
                        {rec.action}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Estadísticas de recomendaciones */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Recomendaciones</p>
            <p className="mt-1 text-2xl">6</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Prioridad Crítica</p>
            <p className="mt-1 text-2xl text-red-600">1</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Prioridad Alta</p>
            <p className="mt-1 text-2xl text-orange-600">2</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Implementadas Este Mes</p>
            <p className="mt-1 text-2xl text-green-600">8</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
