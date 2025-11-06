// ============================================
// DASHBOARD CON INTEGRACIÓN API
// ============================================

import { useState } from 'react';
import { DollarSign, ShoppingBag, Package, Repeat, Calendar, Loader2 } from 'lucide-react';
import { KPICard } from './KPICard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { useKPIs, useSalesByCategory, useSalesBySize, useSalesByMonth } from '../hooks/useAnalytics';
import { useBranches } from '../hooks/useBranches';
import type { FiltrosAnalytics } from '../types/database.types';

const COLORS = ['#0071BC', '#009245', '#F7931E', '#ED1E79', '#662D91'];

// Datos mock como fallback
const MOCK_SALES_BY_CATEGORY = [
  { categoria: 'T-Shirts', ventas: 4500, cantidad: 450 },
  { categoria: 'Jeans', ventas: 3200, cantidad: 320 },
  { categoria: 'Buzos', ventas: 2800, cantidad: 280 },
  { categoria: 'Abrigos', ventas: 1900, cantidad: 190 },
  { categoria: 'Vestidos', ventas: 2400, cantidad: 240 },
  { categoria: 'Shorts', ventas: 1600, cantidad: 160 },
];

const MOCK_SALES_BY_SIZE = [
  { talla: 'XS', cantidad: 8, porcentaje: 8 },
  { talla: 'S', cantidad: 18, porcentaje: 18 },
  { talla: 'M', cantidad: 35, porcentaje: 35 },
  { talla: 'L', cantidad: 25, porcentaje: 25 },
  { talla: 'XL', cantidad: 14, porcentaje: 14 },
];

const MOCK_MONTHLY_TREND = [
  { mes: 'Ene', ventas: 12500, cantidad: 1250 },
  { mes: 'Feb', ventas: 13200, cantidad: 1320 },
  { mes: 'Mar', ventas: 14800, cantidad: 1480 },
  { mes: 'Abr', ventas: 13900, cantidad: 1390 },
  { mes: 'May', ventas: 16400, cantidad: 1640 },
  { mes: 'Jun', ventas: 15800, cantidad: 1580 },
  { mes: 'Jul', ventas: 17200, cantidad: 1720 },
  { mes: 'Ago', ventas: 16900, cantidad: 1690 },
  { mes: 'Sep', ventas: 18500, cantidad: 1850 },
  { mes: 'Oct', ventas: 19200, cantidad: 1920 },
];

export function DashboardNew() {
  const [filtros, setFiltros] = useState<FiltrosAnalytics>({});

  // Cargar sucursales
  const { data: sucursales } = useBranches();

  // Cargar datos con hooks
  const { data: kpis, loading: loadingKPIs } = useKPIs(filtros);
  const { data: salesByCategory, loading: loadingCategory } = useSalesByCategory(filtros);
  const { data: salesBySize, loading: loadingSize } = useSalesBySize(filtros);
  const { data: salesByMonth, loading: loadingMonth } = useSalesByMonth(filtros);

  // Usar datos de API o fallback a mock
  const categoryData = salesByCategory.length > 0 ? salesByCategory : MOCK_SALES_BY_CATEGORY;
  const sizeData = salesBySize.length > 0 ? salesBySize : MOCK_SALES_BY_SIZE;
  const monthData = salesByMonth.length > 0 ? salesByMonth : MOCK_MONTHLY_TREND;

  const handleApplyFilters = () => {
    // Los filtros ya se aplican automáticamente cuando cambia el estado
    console.log('Filtros aplicados:', filtros);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filtros:</span>
            </div>

            {/* Filtro por Sucursal */}
            <Select
              value={filtros.idSucursal?.toString()}
              onValueChange={(value) =>
                setFiltros({ ...filtros, idSucursal: value === 'todas' ? undefined : parseInt(value) })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sucursal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las sucursales</SelectItem>
                {sucursales.map((sucursal) => (
                  <SelectItem key={sucursal.idSucursal} value={sucursal.idSucursal.toString()}>
                    {sucursal.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro por Género */}
            <Select
              value={filtros.genero}
              onValueChange={(value) =>
                setFiltros({ ...filtros, genero: value as any })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Mujer">Mujer</SelectItem>
                <SelectItem value="Hombre">Hombre</SelectItem>
                <SelectItem value="Niño">Niño</SelectItem>
                <SelectItem value="Niña">Niña</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro por Fecha */}
            <Select
              onValueChange={(value) => {
                const now = new Date();
                let fecha_inicio, fecha_fin;

                if (value === 'mes_actual') {
                  fecha_inicio = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
                  fecha_fin = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
                } else if (value === 'mes_anterior') {
                  fecha_inicio = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
                  fecha_fin = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
                }

                setFiltros({ ...filtros, fecha_inicio, fecha_fin });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes_actual">Mes Actual</SelectItem>
                <SelectItem value="mes_anterior">Mes Anterior</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="ml-auto border-2 hover:text-white"
              onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(to right, #0071BC, #662D91)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      {loadingKPIs ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="💰 Ventas Totales del Mes"
            value={`$${kpis?.ventas_totales.toLocaleString() || '19,200'}`}
            icon={DollarSign}
            change={`${kpis?.cambio_ventas >= 0 ? '+' : ''}${kpis?.cambio_ventas || 12.5}% vs mes anterior`}
            changeType={kpis?.cambio_ventas >= 0 ? 'positive' : 'negative'}
            iconBgColor="#009245"
          />
          <KPICard
            title="👕 Productos Más Vendidos"
            value={kpis?.producto_mas_vendido || 'T-Shirts'}
            icon={ShoppingBag}
            change="4,500 unidades"
            changeType="neutral"
            iconBgColor="#0071BC"
          />
          <KPICard
            title="📦 Stock Promedio"
            value={`${kpis?.stock_promedio || 72}%`}
            icon={Package}
            change="Normal"
            changeType="positive"
            iconBgColor="#009245"
          />
          <KPICard
            title="🔁 Rotación Mensual"
            value={`${kpis?.rotacion_mensual || 85}%`}
            icon={Repeat}
            change={`${kpis?.cambio_rotacion >= 0 ? '+' : ''}${kpis?.cambio_rotacion || 3.2}% vs mes anterior`}
            changeType={kpis?.cambio_rotacion >= 0 ? 'positive' : 'negative'}
            iconBgColor="#F7931E"
          />
        </div>
      )}

      {/* Gráficas principales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico de barras - Ventas por categoría */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingCategory ? (
              <div className="flex h-[300px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ventas" fill="#0071BC" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Gráfico circular - Distribución por tallas */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Distribución de Tallas Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSize ? (
              <div className="flex h-[300px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sizeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ talla, porcentaje }) => `${talla}: ${porcentaje}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="cantidad"
                  >
                    {sizeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de línea - Evolución temporal */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Evolución de Ventas Mensuales (2025)</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingMonth ? (
            <div className="flex h-[350px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#0071BC"
                  strokeWidth={3}
                  dot={{ fill: '#0071BC', r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
