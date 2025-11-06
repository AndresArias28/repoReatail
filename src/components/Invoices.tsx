// ============================================
// COMPONENTE DE FACTURAS/TRANSACCIONES
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
import {
  FileText,
  Search,
  Calendar,
  Download,
  Eye,
  Filter,
} from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// Datos mock de facturas
const MOCK_INVOICES = [
  {
    idFactura: 1,
    numero_factura: 'F-2025-001',
    fecha: '2025-11-05',
    cliente: { nombres: 'Juan Pérez' },
    sucursal: { nombre: 'Lima Centro' },
    total: 125.50,
    items: 3,
  },
  {
    idFactura: 2,
    numero_factura: 'F-2025-002',
    fecha: '2025-11-05',
    cliente: { nombres: 'María González' },
    sucursal: { nombre: 'Arequipa' },
    total: 89.99,
    items: 2,
  },
  {
    idFactura: 3,
    numero_factura: 'F-2025-003',
    fecha: '2025-11-04',
    cliente: { nombres: 'Carlos Rodríguez' },
    sucursal: { nombre: 'Lima Centro' },
    total: 245.00,
    items: 5,
  },
  {
    idFactura: 4,
    numero_factura: 'F-2025-004',
    fecha: '2025-11-04',
    cliente: { nombres: 'Ana Torres' },
    sucursal: { nombre: 'Cusco' },
    total: 67.50,
    items: 1,
  },
  {
    idFactura: 5,
    numero_factura: 'F-2025-005',
    fecha: '2025-11-03',
    cliente: { nombres: 'Luis Mendoza' },
    sucursal: { nombre: 'Trujillo' },
    total: 189.99,
    items: 4,
  },
];

export function Invoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSucursal, setSelectedSucursal] = useState('todas');
  const [dateFilter, setDateFilter] = useState('todas');

  // Filtrar facturas
  const filteredInvoices = MOCK_INVOICES.filter(invoice => {
    const matchesSearch = invoice.numero_factura.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.cliente.nombres.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSucursal = selectedSucursal === 'todas' || invoice.sucursal.nombre === selectedSucursal;
    return matchesSearch && matchesSucursal;
  });

  // Calcular totales
  const totalVentas = filteredInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalFacturas = filteredInvoices.length;

  const handleViewInvoice = (id: number) => {
    console.log('Ver factura:', id);
    // TODO: Abrir modal con detalles de la factura
  };

  const handleDownloadInvoice = (id: number) => {
    console.log('Descargar factura:', id);
    // TODO: Descargar PDF de la factura
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" style={{ color: '#0071BC' }} />
                Facturas y Transacciones
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Historial completo de ventas y transacciones
              </p>
            </div>
            <Button
              className="gap-2 hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #009245, #0071BC)' }}
            >
              <Download className="h-4 w-4" />
              Exportar Reporte
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Resumen */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: '#0071BC' }}>
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Facturas</p>
                <p className="text-2xl font-bold">{totalFacturas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: '#009245' }}>
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monto Total</p>
                <p className="text-2xl font-bold">${totalVentas.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: '#F7931E' }}>
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ticket Promedio</p>
                <p className="text-2xl font-bold">
                  ${totalFacturas > 0 ? (totalVentas / totalFacturas).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y tabla */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          {/* Filtros */}
          <div className="mb-6 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Buscar por número de factura o cliente..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedSucursal} onValueChange={setSelectedSucursal}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sucursal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las sucursales</SelectItem>
                <SelectItem value="Lima Centro">Lima Centro</SelectItem>
                <SelectItem value="Arequipa">Arequipa</SelectItem>
                <SelectItem value="Cusco">Cusco</SelectItem>
                <SelectItem value="Trujillo">Trujillo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las fechas</SelectItem>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="semana">Esta semana</SelectItem>
                <SelectItem value="mes">Este mes</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Más filtros
            </Button>
          </div>

          {/* Tabla */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Factura</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Sucursal</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.idFactura}>
                    <TableCell className="font-medium">
                      {invoice.numero_factura}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.fecha).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell>{invoice.cliente.nombres}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{invoice.sucursal.nombre}</Badge>
                    </TableCell>
                    <TableCell>{invoice.items} items</TableCell>
                    <TableCell className="font-bold">
                      ${invoice.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewInvoice(invoice.idFactura)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.idFactura)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
