import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FileDown, FileSpreadsheet, Search } from 'lucide-react';
import { Input } from './ui/input';

const inventoryData = [
  { id: 1, producto: 'T-Shirt Básica Blanca', categoria: 'T-Shirts', talla: 'M', stock: 145, nivel: 'alto' },
  { id: 2, producto: 'Jean Skinny Azul', categoria: 'Jeans', talla: 'L', stock: 23, nivel: 'medio' },
  { id: 3, producto: 'Buzo con Capucha Negro', categoria: 'Buzos', talla: 'XL', stock: 8, nivel: 'bajo' },
  { id: 4, producto: 'Vestido Floral Verano', categoria: 'Vestidos', talla: 'S', stock: 67, nivel: 'alto' },
  { id: 5, producto: 'Abrigo de Lana Gris', categoria: 'Abrigos', talla: 'M', stock: 12, nivel: 'bajo' },
  { id: 6, producto: 'T-Shirt Estampada', categoria: 'T-Shirts', talla: 'L', stock: 89, nivel: 'alto' },
  { id: 7, producto: 'Jean Recto Negro', categoria: 'Jeans', talla: 'M', stock: 34, nivel: 'medio' },
  { id: 8, producto: 'Short Deportivo', categoria: 'Shorts', talla: 'S', stock: 5, nivel: 'bajo' },
  { id: 9, producto: 'Buzo Básico Gris', categoria: 'Buzos', talla: 'M', stock: 78, nivel: 'alto' },
  { id: 10, producto: 'Vestido Coctel Negro', categoria: 'Vestidos', talla: 'M', stock: 15, nivel: 'bajo' },
  { id: 11, producto: 'T-Shirt Rayas Azul', categoria: 'T-Shirts', talla: 'XS', stock: 52, nivel: 'medio' },
  { id: 12, producto: 'Jean Bootcut', categoria: 'Jeans', talla: 'XL', stock: 19, nivel: 'medio' },
];

export function Inventory() {
  const getStockBadge = (nivel: string) => {
    const configs = {
      alto: { label: 'Stock Alto', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' },
      medio: { label: 'Stock Medio', variant: 'secondary' as const, className: 'bg-yellow-500 hover:bg-yellow-600 text-white' },
      bajo: { label: 'Stock Bajo', variant: 'destructive' as const, className: '' },
    };
    
    const config = configs[nivel as keyof typeof configs];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventario Actual</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Exportar Excel
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <FileDown className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder="Buscar producto..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Talla</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.producto}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.talla}</Badge>
                    </TableCell>
                    <TableCell>{item.stock} unidades</TableCell>
                    <TableCell>{getStockBadge(item.nivel)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Productos con Stock Alto</p>
            <p className="mt-1 text-2xl">5 productos</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Productos con Stock Medio</p>
            <p className="mt-1 text-2xl">4 productos</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Productos con Stock Bajo</p>
            <p className="mt-1 text-2xl">3 productos</p>
            <p className="mt-1 text-xs text-red-600">⚠️ Requiere reabastecimiento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
