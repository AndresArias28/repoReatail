// ============================================
// VENTAS POR MES CON INTEGRACIÓN API
// ============================================

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useDailySales, useTopProducts, useSalesByMonth } from '../hooks/useAnalytics';
import { useBranches } from '../hooks/useBranches';
import type { FiltrosAnalytics } from '../types/database.types';

// Datos mock como fallback
const MOCK_DAILY_SALES = Array.from({ length: 30 }, (_, i) => ({
  fecha: `${i + 1}`,
  ventas: Math.floor(Math.random() * 300) + 500,
  cantidad: Math.floor(Math.random() * 50) + 50,
}));

const MOCK_COMPARE_DATA = [
  { mes: 'Jul', actual: 17200, anterior: 16100 },
  { mes: 'Ago', actual: 16900, anterior: 15800 },
  { mes: 'Sep', actual: 18500, anterior: 17200 },
  { mes: 'Oct', actual: 19200, anterior: 17800 },
];

const MOCK_TOP_PRODUCTS = [
  { nombre: 'T-Shirt Básica Blanca M', cantidad: 450, ventas_totales: 4500 },
  { nombre: 'Jean Skinny Azul L', cantidad: 320, ventas_totales: 4160 },
  { nombre: 'Buzo con Capucha Negro', cantidad: 280, ventas_totales: 3920 },
  { nombre: 'Vestido Floral S', cantidad: 240, ventas_totales: 3360 },
  { nombre: 'T-Shirt Estampada L', cantidad: 220, ventas_totales: 2200 },
];

export function SalesMonthNew() {
  const [filtros, setFiltros] = useState<FiltrosAnalytics>({});

  // Cargar datos
  const { data: sucursales } = useBranches();
  const { data: dailySales, loading: loadingDaily } = useDailySales(filtros);
  const { data: monthlySales, loading: loadingMonthly } = useSalesByMonth(filtros);
  const { data: topProducts, loading: loadingTop } = useTopProducts(5, filtros);

  // Usar datos de API o fallback a mock
  const dailyData = dailySales.length > 0 ? dailySales : MOCK_DAILY_SALES;
  const compareData = monthlySales.length > 0 ? monthlySales.slice(-4) : MOCK_COMPARE_DATA;
  const topProductsData = topProducts.length > 0 ? topProducts : MOCK_TOP_PRODUCTS;

  // Calcular totales
  const totalVentas = dailyData.reduce((sum, item) => sum + item.ventas, 0);
  const promedioDiario = Math.round(totalVentas / dailyData.length);
  const crecimiento = compareData.length >= 2
    ? (((compareData[compareData.length - 1].ventas - compareData[compareData.length - 2].ventas) /
        compareData[compareData.length - 2].ventas) * 100).toFixed(1)
    : '7.9';

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Filtros:</span>
            <Select
              value={filtros.idSucursal?.toString() || 'todas'}
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
          </div>
        </CardContent>
      </Card>

      {/* Resumen mensual */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: '#0071BC' }}>
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total del Mes</p>
                <p className="text-2xl font-bold">${totalVentas.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: '#009245' }}>
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Crecimiento</p>
                <p className="text-2xl font-bold text-green-600">+{crecimiento}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: '#F7931E' }}>
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Promedio Diario</p>
                <p className="text-2xl font-bold">${promedioDiario.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ventas diarias */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Ventas Diarias - Mes Actual</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingDaily ? (
            <div className="flex h-[350px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#0071BC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Comparación con meses anteriores */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Comparación con Meses Anteriores</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingMonthly ? (
            <div className="flex h-[300px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={compareData}>
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
                  name="Ventas"
                  dot={{ fill: '#0071BC', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Top productos del mes */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Top 5 Productos del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingTop ? (
            <div className="flex h-[200px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-4">
              {topProductsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: '#0071BC' }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.nombre}</p>
                      <p className="text-xs text-gray-500">{item.cantidad} unidades</p>
                    </div>
                  </div>
                  <p className="font-bold" style={{ color: '#0071BC' }}>
                    ${item.ventas_totales.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
