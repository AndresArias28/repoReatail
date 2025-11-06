          // ============================================
// INVENTARIO CON INTEGRACIÓN API
// ============================================

import { useMemo, useState } from 'react';
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
import { Search, Loader2, Plus, Check } from 'lucide-react';
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

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { productsService } from '../services/products.service';
import { inventoryService } from '../services/inventory.service';

import { useAuth } from '../context/AuthContext';

// Datos mock como fallback (estructura real del backend)
const MOCK_INVENTORY = [
  { 
    idInventario: 1, 
    idproducto: 1, 
    idSucursal: 1,
    stock: 145, 
    producto: { 
      nombre: 'T-Shirt Básica Blanca', 
      marca: 'Nike', 
      talla: 'M', 
      precio: 29990,
      subcategoria: { 
        categoria: { 
          nombre_categoria: 'Camisetas' 
        } 
      } 
    },
    sucursal: {
      nombre: 'Sucursal Centro'
    }
  },
  { 
    idInventario: 2, 
    idproducto: 2, 
    idSucursal: 1,
    stock: 23, 
    producto: { 
      nombre: 'Jean Skinny Azul', 
      marca: 'Levis', 
      talla: 'L', 
      precio: 89990,
      subcategoria: { 
        categoria: { 
          nombre_categoria: 'Jeans' 
        } 
      } 
    },
    sucursal: {
      nombre: 'Sucursal Centro'
    }
  },
  { 
    idInventario: 3, 
    idproducto: 3, 
    idSucursal: 2,
    stock: 8, 
    producto: { 
      nombre: 'Buzo con Capucha Negro', 
      marca: 'Adidas', 
      talla: 'XL', 
      precio: 79990,
      subcategoria: { 
        categoria: { 
          nombre_categoria: 'Buzos' 
        } 
      } 
    },
    sucursal: {
      nombre: 'Sucursal Norte'
    }
  },
];

export function InventoryNew() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSucursal, setSelectedSucursal] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;
  const { user } = useAuth();

  const [openAdd, setOpenAdd] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [stockById, setStockById] = useState<Record<number, number | ''>>({});

  const itemsPerPage = 10;
  
  // Obtener usuario autenticado
  const { user } = useAuth();
  const isEmpleado = user?.rol === 'empleado';
  const sucursalEmpleado = user?.idSucursal;
  
  // Si es empleado, filtrar automáticamente por su sucursal
  const sucursalFiltro = isEmpleado ? sucursalEmpleado : selectedSucursal;


  // Cargar datos reales
  const { data: inventoryData, loading, meta } = useInventory({
    page: currentPage,
    per_page: itemsPerPage,
    idSucursal: sucursalFiltro,
    search: searchTerm,
  });
  const { data: sucursales } = useBranches();

  // Debug: Ver qué datos llegan del backend
  console.log('📦 Inventory Data:', inventoryData);
  console.log('📊 Meta:', meta);

  // Usar SOLO datos reales del backend (sin mock)
  const displayData = inventoryData || [];

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

  const openAddProducts = async () => {
    setOpenAdd(true);
    setLoadingProducts(true);
    try {
      const list = await productsService.list();
      setProducts(Array.isArray(list) ? list : []);
    } finally {
      setLoadingProducts(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!productSearch) return products;
    const q = productSearch.toLowerCase();
    return products.filter((p: any) =>
      String(p?.nombre || '').toLowerCase().includes(q) ||
      String(p?.marca || '').toLowerCase().includes(q) ||
      String(p?.talla || '').toLowerCase().includes(q)
    );
  }, [products, productSearch]);

  const addInventory = async (idproducto: number) => {
    const stockVal = stockById[idproducto];
    const idsucursal = (user as any)?.idSucursal ?? (user as any)?.idsucursal ?? (user as any)?.sucursal?.id ?? selectedSucursal;
    if (!idsucursal || typeof idsucursal !== 'number') {
      alert('No se pudo determinar la sucursal del usuario. Selecciona una sucursal en el filtro.');
      return;
    }
    const stockNum = typeof stockVal === 'string' ? parseInt(stockVal as any, 10) : stockVal;
    if (!stockNum || stockNum <= 0) {
      alert('Ingrese un stock válido (> 0)');
      return;
    }
    await inventoryService.create({ idproducto, idsucursal, stock: stockNum });
    setStockById((m) => ({ ...m, [idproducto]: '' }));
    setOpenAdd(false);
  };

  // Sin scoping global: la sucursal se puede elegir libremente (o dejar en 'todas')

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
              <Button size="sm" className="gap-2 text-white" style={{ background: 'linear-gradient(to right, #0071BC, #662D91)' }} onClick={openAddProducts}>
                <Plus className="h-4 w-4" /> Agregar productos
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
            
            {/* Selector de sucursal (solo para administradores) */}
            {isEmpleado ? (
              // Empleado: Mostrar su sucursal asignada
              <div className="flex items-center gap-2 rounded-md border border-input bg-gray-50 px-3 py-2">
                <span className="text-sm font-medium">
                  {sucursales.find(s => s.id === sucursalEmpleado)?.nombre || `Sucursal #${sucursalEmpleado}`}
                </span>
                <Badge variant="secondary" className="text-xs">
                  Mi Sucursal
                </Badge>
              </div>
            ) : (
              // Administrador: Selector de sucursales
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
                    <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
                      {sucursal.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
                    <TableHead>Producto</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((item, index) => (
                    <TableRow key={item.idInventario || `inventory-${index}`}>
                      <TableCell className="font-medium">
                        {item.producto?.nombre || `Producto #${item.idproducto}`}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.sucursal?.nombre || `Sucursal #${item.idSucursal}`}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{item.stock} unidades</TableCell>
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

      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Agregar productos al inventario</DialogTitle>
          </DialogHeader>
          <div className="mb-3">
            <Input placeholder="Buscar producto por nombre, marca o talla" value={productSearch} onChange={(e) => setProductSearch(e.target.value)} />
          </div>
          {loadingProducts ? (
            <div className="flex h-[200px] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="rounded-md border max-h-[400px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Talla</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((p: any) => (
                    <TableRow key={p.idproducto || p.id}>
                      <TableCell className="font-medium">{p.nombre}</TableCell>
                      <TableCell>{p.marca}</TableCell>
                      <TableCell>{p.talla}</TableCell>
                      <TableCell>{p.precio?.toLocaleString?.() ?? p.precio}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          className="w-24 ml-auto"
                          value={(stockById[p.idproducto || p.id] as any) ?? ''}
                          onChange={(e) => {
                            const id = (p.idproducto || p.id) as number;
                            const val = e.target.value === '' ? '' : Number(e.target.value);
                            setStockById((m) => ({ ...m, [id]: val }));
                          }}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className="gap-2" onClick={() => addInventory((p.idproducto || p.id) as number)}>
                          <Check className="h-4 w-4" /> Agregar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAdd(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
