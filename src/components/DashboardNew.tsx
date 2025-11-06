// ============================================
// DASHBOARD CON INTEGRACIÓN API
// ============================================

import { useState } from 'react';
import { DollarSign, ShoppingBag, Package, Repeat, Calendar, Loader2, Building2, Plus } from 'lucide-react';
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
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useSalesBySize, useTopProducts, useRecommendations } from '../hooks/useAnalytics';
import { useBranches } from '../hooks/useBranches';
import { useDepartments } from '../hooks/useDepartments';
import { branchesService, type CreateSucursalDto } from '../services/branches.service';
import type { FiltrosAnalytics } from '../types/database.types';

const COLORS = ['#0071BC', '#009245', '#F7931E', '#ED1E79', '#662D91'];

export function DashboardNew() {
  const [filtros, setFiltros] = useState<FiltrosAnalytics>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar sucursales y departamentos
  const { data: sucursales, refetch: refetchSucursales } = useBranches();
  const { data: departamentos, loading: loadingDepartments } = useDepartments();

  // Debug: Ver qué departamentos se cargaron
  console.log('🏢 Departamentos en componente:', departamentos);
  console.log('⏳ Loading departamentos:', loadingDepartments);
  
  // Debug adicional: inspeccionar cada departamento
  if (departamentos && departamentos.length > 0) {
    departamentos.forEach((dept, index) => {
      console.log(`📋 Dept[${index}]:`, {
        iddepartamentos: dept?.iddepartamentos,
        nombre_dpto: dept?.nombre_dpto,
        objeto_completo: dept
      });
    });
  }

  // Estado del formulario de sucursal
  const [formData, setFormData] = useState<CreateSucursalDto>({
    idmunicipio: 1,
    nit: '',
    nombre: '',
    direccion: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'idmunicipio' ? parseInt(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      idmunicipio: 1,
      nit: '',
      nombre: '',
      direccion: '',
      email: '',
    });
  };

  const handleCreateSucursal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await branchesService.createBranch(formData);
      setIsCreateDialogOpen(false);
      resetForm();
      refetchSucursales();
      alert('✅ Sucursal creada exitosamente');
    } catch (error) {
      console.error('Error al crear sucursal:', error);
      alert('❌ Error al crear sucursal. Verifica que el endpoint esté disponible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cargar SOLO datos reales del backend
  const { data: salesBySize, loading: loadingSize } = useSalesBySize(filtros);
  const { data: topProducts, loading: loadingTopProducts } = useTopProducts(10, filtros);
  const { data: recommendations, loading: loadingRecommendations } = useRecommendations(filtros);

  // Calcular métricas desde productos más vendidos
  const totalVentas = topProducts.reduce((sum, p) => sum + (p.ventas_totales || 0), 0);
  const totalUnidades = topProducts.reduce((sum, p) => sum + (p.unidades_vendidas || 0), 0);
  const promedioVenta = totalUnidades > 0 ? totalVentas / totalUnidades : 0;

  const handleApplyFilters = () => {
    // Los filtros ya se aplican automáticamente cuando cambia el estado
    console.log('Filtros aplicados:', filtros);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
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
                  <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
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
              className="border-2 hover:text-white"
              onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(to right, #0071BC, #662D91)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </Button>
            </div>

            {/* Botón Crear Sucursal */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-[#0071BC] to-[#662D91] hover:opacity-90">
                  <Building2 className="h-4 w-4" />
                  <Plus className="h-4 w-4" />
                  Nueva Sucursal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleCreateSucursal}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Crear Nueva Sucursal
                    </DialogTitle>
                    <DialogDescription>
                      Completa los datos de la nueva sucursal para tu negocio
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nombre">Nombre de la Sucursal *</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej: Sucursal Centro"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="nit">NIT *</Label>
                      <Input
                        id="nit"
                        name="nit"
                        value={formData.nit}
                        onChange={handleInputChange}
                        placeholder="Ej: 900123456-7"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="direccion">Dirección *</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        placeholder="Ej: Calle 10 #20-30"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email de Contacto *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ej: sucursal@empresa.com"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="departamento">Departamento *</Label>
                      {loadingDepartments ? (
                        <div className="flex items-center justify-center h-10 border rounded-md">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        </div>
                      ) : (
                        <Select
                          value={formData.idmunicipio.toString()}
                          onValueChange={(value) =>
                            setFormData({ ...formData, idmunicipio: parseInt(value) })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un departamento" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {departamentos && departamentos.length > 0 ? (
                              departamentos
                                .filter(dept => dept && dept.iddepartamentos && dept.nombre_dpto)
                                .map((dept) => (
                                  <SelectItem
                                    key={dept.iddepartamentos}
                                    value={dept.iddepartamentos.toString()}
                                  >
                                    {dept.nombre_dpto}
                                  </SelectItem>
                                ))
                            ) : (
                              <SelectItem value="0" disabled>
                                No hay departamentos disponibles
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      )}
                      <p className="text-xs text-gray-500">
                        📍 Selecciona el departamento donde se ubicará la sucursal
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsCreateDialogOpen(false);
                        resetForm();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-[#0071BC] to-[#662D91]"
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Crear Sucursal
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Calculados desde Datos Reales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KPICard
          title="💰 Ventas Totales (Top 10)"
          value={`$${totalVentas.toLocaleString()}`}
          icon={DollarSign}
          change={`${totalUnidades.toLocaleString()} unidades vendidas`}
          changeType="neutral"
          iconBgColor="#0071BC"
        />
        <KPICard
          title="🛍️ Producto Más Vendido"
          value={topProducts[0]?.nombre || 'Sin datos'}
          icon={ShoppingBag}
          change={topProducts[0] ? `${topProducts[0].unidades_vendidas} unidades` : 'N/A'}
          changeType="positive"
          iconBgColor="#662D91"
        />
        <KPICard
          title="📊 Promedio por Venta"
          value={`$${Math.round(promedioVenta).toLocaleString()}`}
          icon={Package}
          change={`Basado en ${topProducts.length} productos`}
          changeType="neutral"
          iconBgColor="#009245"
        />
      </div>

      {/* Gráficas con Datos Reales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top 10 Productos Más Vendidos */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>🏆 Top 10 Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingTopProducts ? (
              <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : topProducts.length > 0 ? (
              <div className="space-y-3">
                {topProducts.map((producto, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#0071BC] to-[#662D91] text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{producto.nombre}</p>
                        <p className="text-sm text-gray-500">{producto.marca} - Talla {producto.talla}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0071BC]">${producto.ventas_totales?.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{producto.unidades_vendidas} unidades</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[400px] flex-col items-center justify-center text-gray-400">
                <ShoppingBag className="h-12 w-12 mb-2" />
                <p>No hay datos de productos vendidos</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Distribución de Tallas */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>📏 Distribución de Tallas Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSize ? (
              <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : salesBySize && salesBySize.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={salesBySize}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ talla, porcentaje }) => `${talla}: ${porcentaje}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="porcentaje"
                  >
                    {salesBySize.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[400px] flex-col items-center justify-center text-gray-400">
                <Package className="h-12 w-12 mb-2" />
                <p>No hay datos de tallas vendidas</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Productos de Baja Rotación */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>⚠️ Productos de Baja Rotación (Requieren Atención)</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingRecommendations ? (
            <div className="flex h-[200px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : recommendations && recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.slice(0, 6).map((rec, index) => (
                <div key={index} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{rec.nombre}</p>
                      <p className="text-sm text-gray-600">{rec.marca} - {rec.talla}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded">
                      Bajo
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">Stock: <span className="font-semibold">{rec.stock_actual}</span></p>
                    <p className="text-gray-600">Vendidos: <span className="font-semibold">{rec.unidades_vendidas || 0}</span></p>
                    {rec.descuento_sugerido && (
                      <p className="text-green-600 font-semibold">💡 Descuento: {rec.descuento_sugerido}%</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] flex-col items-center justify-center text-gray-400">
              <Repeat className="h-12 w-12 mb-2" />
              <p>No hay productos de baja rotación</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
