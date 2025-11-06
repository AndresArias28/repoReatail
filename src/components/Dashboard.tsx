import { DollarSign, ShoppingBag, Package, Repeat } from 'lucide-react';
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
import { Calendar } from 'lucide-react';

const salesByCategory = [
  { category: 'T-Shirts', ventas: 4500 },
  { category: 'Jeans', ventas: 3200 },
  { category: 'Buzos', ventas: 2800 },
  { category: 'Abrigos', ventas: 1900 },
  { category: 'Vestidos', ventas: 2400 },
  { category: 'Shorts', ventas: 1600 },
];

const salesBySize = [
  { name: 'XS', value: 8 },
  { name: 'S', value: 18 },
  { name: 'M', value: 35 },
  { name: 'L', value: 25 },
  { name: 'XL', value: 14 },
];

const monthlyTrend = [
  { mes: 'Ene', ventas: 12500 },
  { mes: 'Feb', ventas: 13200 },
  { mes: 'Mar', ventas: 14800 },
  { mes: 'Abr', ventas: 13900 },
  { mes: 'May', ventas: 16400 },
  { mes: 'Jun', ventas: 15800 },
  { mes: 'Jul', ventas: 17200 },
  { mes: 'Ago', ventas: 16900 },
  { mes: 'Sep', ventas: 18500 },
  { mes: 'Oct', ventas: 19200 },
];

const COLORS = ['#0071BC', '#009245', '#F7931E', '#ED1E79', '#662D91'];

export function Dashboard() {
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
            
            <Select defaultValue="mujer">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mujer">Mujer</SelectItem>
                <SelectItem value="hombre">Hombre</SelectItem>
                <SelectItem value="nino">Niño</SelectItem>
                <SelectItem value="nina">Niña</SelectItem>
                <SelectItem value="todos">Todos</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="octubre">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="octubre">Octubre 2025</SelectItem>
                <SelectItem value="septiembre">Septiembre 2025</SelectItem>
                <SelectItem value="agosto">Agosto 2025</SelectItem>
                <SelectItem value="custom">Rango personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="todas">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sucursal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las sucursales</SelectItem>
                <SelectItem value="lima">Lima Centro</SelectItem>
                <SelectItem value="arequipa">Arequipa</SelectItem>
                <SelectItem value="cusco">Cusco</SelectItem>
                <SelectItem value="trujillo">Trujillo</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              className="ml-auto border-2 hover:text-white"
              style={{'--hover-bg': 'linear-gradient(to right, #0071BC, #662D91)'} as React.CSSProperties}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0071BC, #662D91)'}
              onMouseLeave={(e) => e.currentTarget.style.background = ''}
            >
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="💰 Ventas Totales del Mes"
          value="$19,200"
          icon={DollarSign}
          change="+12.5% vs mes anterior"
          changeType="positive"
          iconBgColor="#009245"
        />
        <KPICard
          title="👕 Productos Más Vendidos"
          value="T-Shirts"
          icon={ShoppingBag}
          change="4,500 unidades"
          changeType="neutral"
          iconBgColor="#0071BC"
        />
        <KPICard
          title="📦 Stock Promedio"
          value="72%"
          icon={Package}
          change="Normal"
          changeType="positive"
          iconBgColor="#009245"
        />
        <KPICard
          title="🔁 Rotación Mensual"
          value="85%"
          icon={Repeat}
          change="+3.2% vs mes anterior"
          changeType="positive"
          iconBgColor="#F7931E"
        />
      </div>

      {/* Gráficas principales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico de barras - Ventas por categoría */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#0071BC" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico circular - Distribución por tallas */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Distribución de Tallas Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesBySize}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesBySize.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de línea - Evolución temporal */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Evolución de Ventas Mensuales (2025)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyTrend}>
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
        </CardContent>
      </Card>
    </div>
  );
}
