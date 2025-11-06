// ============================================
// INVENTARIO CON INTEGRACIÓN API
// ============================================

import { useState } from 'react';
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
import { FileDown, FileSpreadsheet, Search, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useInventory, useLowStockProducts } from '../hooks/useInventory';
import { useBranches } from '../hooks/useBranches';

// Datos mock como fallback
const MOCK_INVENTORY = [
  { idInventario: 1, idproducto: 1, stock: 145, nivel: 'alto', producto: { nombre: 'T-Shirt Básica Blanca', marca: 'Nike', talla: 'M', subcategoria: { categoria: { nombre_categoria: 'T-Shirts' } } } },
  { idInventario: 2, idproducto: 2, stock: 23, nivel: 'medio', producto: { nombre: 'Jean Skinny Azul', marca: 'Levis', talla: 'L', subcategoria: { categoria: { nombre_categoria: 'Jeans' } } } },
  { idInventario: 3, idproducto: 3, stock: 8, nivel: 'bajo', producto: { nombre: 'Buzo con Capucha Negro', marca: 'Adidas', talla: 'XL', subcategoria: { categoria: { nombre_categoria: 'Buzos' } } } },
  { idInventario: 4, idproducto: 4, stock: 67, nivel: 'alto', producto: { nombre: 'Vestido Floral Verano', marca: 'Zara', talla: 'S', subcategoria: { categoria: { nombre_categoria: 'Vestidos' } } } },
  { idInventario: 5, idproducto: 5, stock: 12, nivel: 'bajo', producto: { nombre: 'Abrigo de Lana Gris', marca: 'H&M', talla: 'M', subcategoria: { categoria: { nombre_categoria: 'Abrigos' } } } },
];

export function InventoryNew() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSucursal, setSelectedSucursal] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Cargar datos
  const { data: sucursales } = useBranches();
  const { data: inventoryData, loading, meta } = useInventory({
    page: currentPage,
    per_page: perPage,
    idSucursal: selectedSucursal,
    search: searchTerm,
  });
  const { data: lowStockData } = useLowStockProducts(selectedSucursal);

  // Usar datos de API o fallback a mock
  const displayData = inventoryData.length > 0 ? inventoryData : MOCK_INVENTORY;

  // Calcular estadísticas
  const statsAlto = displayData.filter(item => {
    const stock = item.stock;
    return stock > 50;
  }).length;

  const statsMedio = displayData.filter(item => {
    const stock = item.stock;
    return stock >= 20 && stock <= 50;
  }).length;

  const statsBajo = displayData.filter(item => {
    const stock = item.stock;
    return stock < 20;
  }).length;

  const getStockBadge = (stock: number) => {
    if (stock > 50) {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          Stock Alto
        </Badge>
      );
    } else if (stock >= 20) {
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
          Stock Medio
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          Stock Bajo
        </Badge>
      );
    }
  };

  const handleExportExcel = () => {
    // TODO: Implementar exportación a Excel
    console.log('Exportar a Excel');
  };

  const handleExportPDF = () => {
    // TODO: Implementar exportación a PDF
    console.log('Exportar a PDF');
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventario Actual</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {meta.total > 0 ? `${meta.total} productos en total` : 'Gestiona el stock de tus productos'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleExportExcel}
              >
                <FileSpreadsheet className="h-4 w-4" />
                Exportar Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleExportPDF}
              >
                <FileDown className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Buscar producto..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedSucursal?.toString() || 'todas'}
              onValueChange={(value) =>
                setSelectedSucursal(value === 'todas' ? undefined : parseInt(value))
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

          {/* Tabla */}
          {loading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Talla</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((item) => (
                    <TableRow key={item.idInventario}>
                      <TableCell>{item.idInventario}</TableCell>
                      <TableCell className="font-medium">
                        {item.producto?.nombre || 'N/A'}
                      </TableCell>
                      <TableCell>{item.producto?.marca || 'N/A'}</TableCell>
                      <TableCell>
                        {item.producto?.subcategoria?.categoria?.nombre_categoria || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.producto?.talla || 'N/A'}</Badge>
                      </TableCell>
                      <TableCell>{item.stock} unidades</TableCell>
                      <TableCell>{getStockBadge(item.stock)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Paginación */}
          {meta.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Página {meta.current_page} de {meta.last_page}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === meta.last_page}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Productos con Stock Alto</p>
            <p className="mt-1 text-2xl font-bold">{statsAlto} productos</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Productos con Stock Medio</p>
            <p className="mt-1 text-2xl font-bold">{statsMedio} productos</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Productos con Stock Bajo</p>
            <p className="mt-1 text-2xl font-bold">{statsBajo} productos</p>
            {statsBajo > 0 && (
              <p className="mt-1 text-xs text-red-600">⚠️ Requiere reabastecimiento</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
