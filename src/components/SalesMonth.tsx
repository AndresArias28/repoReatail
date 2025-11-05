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
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const dailySales = [
  { dia: '1', ventas: 580 },
  { dia: '2', ventas: 620 },
  { dia: '3', ventas: 590 },
  { dia: '4', ventas: 710 },
  { dia: '5', ventas: 680 },
  { dia: '6', ventas: 750 },
  { dia: '7', ventas: 820 },
  { dia: '8', ventas: 610 },
  { dia: '9', ventas: 640 },
  { dia: '10', ventas: 700 },
  { dia: '11', ventas: 730 },
  { dia: '12', ventas: 690 },
  { dia: '13', ventas: 780 },
  { dia: '14', ventas: 850 },
  { dia: '15', ventas: 720 },
  { dia: '16', ventas: 660 },
  { dia: '17', ventas: 710 },
  { dia: '18', ventas: 740 },
  { dia: '19', ventas: 690 },
  { dia: '20', ventas: 800 },
  { dia: '21', ventas: 870 },
  { dia: '22', ventas: 750 },
  { dia: '23', ventas: 720 },
  { dia: '24', ventas: 780 },
  { dia: '25', ventas: 810 },
  { dia: '26', ventas: 760 },
  { dia: '27', ventas: 830 },
  { dia: '28', ventas: 890 },
  { dia: '29', ventas: 820 },
  { dia: '30', ventas: 850 },
];

const compareData = [
  { mes: 'Jul', actual: 17200, anterior: 16100 },
  { mes: 'Ago', actual: 16900, anterior: 15800 },
  { mes: 'Sep', actual: 18500, anterior: 17200 },
  { mes: 'Oct', actual: 19200, anterior: 17800 },
];

export function SalesMonth() {
  return (
    <div className="flex flex-col gap-6">
      {/* Resumen mensual */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#1E88E5] p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Octubre</p>
                <p className="text-2xl">$19,200</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500 p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Crecimiento</p>
                <p className="text-2xl text-green-600">+7.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#26A69A] p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Promedio Diario</p>
                <p className="text-2xl">$640</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ventas diarias */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Ventas Diarias - Octubre 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#1E88E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comparación con mes anterior */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Comparación con Meses Anteriores</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={compareData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#1E88E5" 
                strokeWidth={3}
                name="Mes Actual"
              />
              <Line 
                type="monotone" 
                dataKey="anterior" 
                stroke="#BDBDBD" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Mes Anterior"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top productos del mes */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Top 5 Productos del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { producto: 'T-Shirt Básica Blanca M', ventas: 450, monto: '$4,500' },
              { producto: 'Jean Skinny Azul L', ventas: 320, monto: '$4,160' },
              { producto: 'Buzo con Capucha Negro', ventas: 280, monto: '$3,920' },
              { producto: 'Vestido Floral S', ventas: 240, monto: '$3,360' },
              { producto: 'T-Shirt Estampada L', ventas: 220, monto: '$2,200' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E88E5] text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm">{item.producto}</p>
                    <p className="text-xs text-gray-500">{item.ventas} unidades</p>
                  </div>
                </div>
                <p className="text-[#1E88E5]">{item.monto}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
