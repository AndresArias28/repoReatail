// ============================================
// RECOMENDACIONES CON INTEGRACIÓN API
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  ArrowRight,
  Sparkles,
  Loader2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useRecommendations } from '../hooks/useAnalytics';
import { useBranches } from '../hooks/useBranches';
import type { FiltrosAnalytics } from '../types/database.types';
import { realtimeService } from '../services/realtime.service';
import type { LowStockEvent } from '../services/realtime.service';

// Sin datos mock: se mostrará estado vacío si no hay datos del backend ni eventos en vivo

const getIcon = (type: string) => {
  switch (type) {
    case 'stock':
      return TrendingUp;
    case 'promo':
      return AlertTriangle;
    case 'urgente':
      return Zap;
    case 'oportunidad':
      return Target;
    default:
      return Sparkles;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'stock':
      return 'text-green-600';
    case 'promo':
      return 'text-orange-600';
    case 'urgente':
      return 'text-red-600';
    case 'oportunidad':
      return 'text-blue-600';
    default:
      return 'text-purple-600';
  }
};

const getBgColor = (type: string) => {
  switch (type) {
    case 'stock':
      return 'bg-green-50';
    case 'promo':
      return 'bg-orange-50';
    case 'urgente':
      return 'bg-red-50';
    case 'oportunidad':
      return 'bg-blue-50';
    default:
      return 'bg-purple-50';
  }
};

export function RecommendationsNew() {
  const [filtros, setFiltros] = useState<FiltrosAnalytics>({});
  const [liveRecs, setLiveRecs] = useState<any[]>([]);
  const navigate = useNavigate();

  // Cargar datos
  const { data: sucursales } = useBranches();
  const { data: recommendations, loading } = useRecommendations(filtros);

  const displayData = Array.isArray(recommendations) ? recommendations : [];
  const combined = [...liveRecs, ...displayData];

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<LowStockEvent>;
      const d = ev.detail;
      const prio = d.stock <= 2 ? 'critica' : 'alta';
      const rec = {
        id: Date.now(),
        type: 'stock',
        priority: prio,
        title: d.producto ? `Stock bajo: ${d.producto}` : 'Stock bajo detectado',
        description: `Stock actual: ${d.stock}. Umbral: ${d.threshold}.` ,
        action: 'Reabastecer',
      };
      setLiveRecs((prev) => [rec, ...prev].slice(0, 20));

      // Toast con acción para ir a Inventario
      toast.warning(rec.title, {
        description: rec.description,
        action: {
          label: 'Ver inventario',
          onClick: () => navigate('/dashboard/inventario'),
        },
      });
    };
    window.addEventListener('inventory.low_stock', handler as any);
    realtimeService.startLowStockWatcher(20000, 5, filtros.idSucursal);
    return () => {
      window.removeEventListener('inventory.low_stock', handler as any);
      realtimeService.stop();
    };
  }, [filtros.idSucursal]);

  // Calcular estadísticas
  const totalRecommendations = displayData.length;
  const criticalCount = displayData.filter(r => r.priority === 'critica').length;
  const highCount = displayData.filter(r => r.priority === 'alta').length;

  const getPriorityBadge = (priority: string) => {
    const configs = {
      critica: { label: 'Crítica', className: 'bg-red-600 hover:bg-red-700' },
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
      {/* Header con filtros */}
      <Card className="border-l-4 shadow-sm" style={{ borderLeftColor: '#0071BC' }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" style={{ color: '#0071BC' }} />
                Recomendaciones Inteligentes
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Sugerencias automáticas basadas en análisis de datos y patrones de venta
              </p>
            </div>
            <Select
              value={filtros.idSucursal != null ? String(filtros.idSucursal) : 'todas'}
              onValueChange={(value: string) =>
                setFiltros({ ...filtros, idSucursal: value === 'todas' ? undefined : parseInt(value, 10) })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sucursal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las sucursales</SelectItem>
                {Array.isArray(sucursales)
                  ? sucursales
                      .map((s: any) => ({ id: s?.id ?? s?.idSucursal ?? s?.idsucursal, name: s?.nombre ?? s?.nombre_sucursal }))
                      .filter((s) => typeof s.id === 'number' && !Number.isNaN(s.id))
                      .map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.name}
                        </SelectItem>
                      ))
                  : null}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de recomendaciones */}
      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : combined.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center text-sm text-gray-500">
          No hay recomendaciones en este momento
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {combined.map((rec) => {
            const Icon = getIcon(rec.type);
            return (
              <Card key={rec.id} className="shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${getBgColor(rec.type)}`}>
                      <Icon className={`h-6 w-6 ${getIconColor(rec.type)}`} />
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold">{rec.title}</h3>
                        {getPriorityBadge(rec.priority)}
                      </div>

                      <p className="mb-4 text-sm text-gray-600">
                        {rec.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          className="gap-2 hover:opacity-90"
                          style={{ background: 'linear-gradient(to right, #0071BC, #662D91)' }}
                        >
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
      )}

      {/* Estadísticas de recomendaciones */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Recomendaciones</p>
            <p className="mt-1 text-2xl font-bold">{totalRecommendations}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Prioridad Crítica</p>
            <p className="mt-1 text-2xl font-bold text-red-600">{criticalCount}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Prioridad Alta</p>
            <p className="mt-1 text-2xl font-bold text-orange-600">{highCount}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Implementadas Este Mes</p>
            <p className="mt-1 text-2xl font-bold text-green-600">8</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
