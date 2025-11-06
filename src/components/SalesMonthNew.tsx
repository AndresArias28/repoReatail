// ============================================
// VENTAS POR MES CON INTEGRACIÓN API
// ============================================

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, DollarSign, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useTopProducts } from '../hooks/useAnalytics';
import { useBranches } from '../hooks/useBranches';
import type { FiltrosAnalytics } from '../types/database.types';

// Sin datos mock: se mostrará estado vacío si el backend no retorna datos

export function SalesMonthNew() {
  const [filtros, setFiltros] = useState<FiltrosAnalytics>({
    mes: new Date().getMonth() + 1, // Mes actual (1-12)
  });

  // Cargar datos del backend (top 5 productos del mes actual)
  const { data: sucursales } = useBranches();
  const { data: topProducts, loading: loadingTop } = useTopProducts(5, filtros);

  // Usar datos del backend (sin fallback)
  const topProductsData = Array.isArray(topProducts) ? topProducts : [];

  // Calcular métricas basadas en los productos más vendidos del mes actual
  const totalUnidadesVendidas = topProductsData.reduce((sum, item) => sum + (item?.cantidad || 0), 0);
  const totalVentas = topProductsData.reduce((sum, item) => sum + (item?.ventas_totales || 0), 0);
  
  // Calcular promedio diario basado en los días del mes actual
  const diasDelMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const promedioDiario = diasDelMes > 0 ? Math.round(totalVentas / diasDelMes) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Filtros:</span>
            
            {/* Filtro de Mes */}
            <Select
              value={String(filtros.mes ?? new Date().getMonth() + 1)}
              onValueChange={(value) =>
                setFiltros({ ...filtros, mes: parseInt(value, 10) })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Enero</SelectItem>
                <SelectItem value="2">Febrero</SelectItem>
                <SelectItem value="3">Marzo</SelectItem>
                <SelectItem value="4">Abril</SelectItem>
                <SelectItem value="5">Mayo</SelectItem>
                <SelectItem value="6">Junio</SelectItem>
                <SelectItem value="7">Julio</SelectItem>
                <SelectItem value="8">Agosto</SelectItem>
                <SelectItem value="9">Septiembre</SelectItem>
                <SelectItem value="10">Octubre</SelectItem>
                <SelectItem value="11">Noviembre</SelectItem>
                <SelectItem value="12">Diciembre</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Filtro de Sucursal */}
            <Select

              value={filtros.idSucursal != null ? String(filtros.idSucursal) : 'todas'}
              onValueChange={(value) =>
                setFiltros({ ...filtros, idSucursal: value === 'todas' ? undefined : parseInt(value, 10) })

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

                {Array.isArray(sucursales)
                  ? sucursales
                      .filter((s) => typeof (s as any)?.idSucursal === 'number' && !Number.isNaN((s as any).idSucursal))
                      .map((s) => (
                        <SelectItem key={(s as any).idSucursal} value={String((s as any).idSucursal)}>
                          {(s as any).nombre}
                        </SelectItem>
                      ))
                  : null}

                {sucursales.map((sucursal) => (
                  <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
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
                <p className="text-sm text-gray-600">Unidades Vendidas</p>
                <p className="text-2xl font-bold text-green-600">{totalUnidadesVendidas.toLocaleString()}</p>
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

      {/* Productos más vendidos del mes */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Top 5 Productos del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingTop ? (
            <div className="flex h-[200px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : topProductsData.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center text-sm text-gray-500">
              No hay datos para el período seleccionado
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
                      <p className="text-sm font-medium">{item.nombre || 'Producto sin nombre'}</p>
                      <p className="text-xs text-gray-500">{item.cantidad || 0} unidades</p>
                    </div>
                  </div>
                  <p className="font-bold" style={{ color: '#0071BC' }}>
                    {item.ventas_totales ? `$${item.ventas_totales.toLocaleString()}` : '$0'}
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
