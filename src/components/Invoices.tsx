// ============================================
// COMPONENTE DE FACTURAS/TRANSACCIONES
// ============================================

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { FileText, Plus, Trash2, Send } from 'lucide-react';
import { facturacionService, type CreateInvoicePayload } from '../services/facturacion.service';
import { productsService } from '../services/products.service';
import { branchesService } from '../services/branches.service';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import type { Producto, Sucursal } from '../types/database.types';

type AnyObj = Record<string, any>;

export function Invoices() {
  const [cliente, setCliente] = useState({ nombres: '', identificacion: '', email: '' });
  const [factura, setFactura] = useState<{ numeroFactura?: string; fecha?: string; idsucursal: number | '' }>({ idsucursal: '' });
  const [detalles, setDetalles] = useState<Array<{ idproducto: number | ''; cantidad: number | '' }>>([
    { idproducto: '', cantidad: '' },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnyObj | null>(null);
  const [products, setProducts] = useState<Producto[]>([]);
  const [branches, setBranches] = useState<Sucursal[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [listsError, setListsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadLists = async () => {
      try {
        const [prods, branchesRes] = await Promise.all([
          productsService.list(),
          branchesService.getBranches(),
        ]);
        if (!mounted) return;
        setProducts(Array.isArray(prods) ? prods : []);
        const branchesData = (branchesRes as any)?.data || (Array.isArray(branchesRes) ? branchesRes : []);
        setBranches(Array.isArray(branchesData) ? branchesData : []);
      } catch (e: any) {
        console.error('Error cargando listados:', e);
        setListsError(e?.message || 'No se pudieron cargar productos/sucursales');
      } finally {
        if (mounted) setLoadingLists(false);
      }
    };
    loadLists();
    return () => { mounted = false; };
  }, []);

  const totalCalculado = useMemo(() => {
    if (!result) return 0;
    const detallesResp: AnyObj[] = (result.detalles as AnyObj[]) || [];
    const sum = detallesResp.reduce((acc, d) => acc + (Number(d.precioTotal ?? d.precio_total ?? 0)), 0);
    return Number(result.total ?? sum ?? 0);
  }, [result]);

  const onAddDetalle = () => setDetalles((arr) => [...arr, { idproducto: '', cantidad: '' }]);
  const onRemoveDetalle = (idx: number) => setDetalles((arr) => arr.length > 1 ? arr.filter((_, i) => i !== idx) : arr);

  const onChangeDetalle = (idx: number, field: 'idproducto' | 'cantidad', value: string) => {
    setDetalles((arr) => arr.map((d, i) => i === idx ? { ...d, [field]: value === '' ? '' : Number(value) } : d));
  };

  const toISOFromLocal = (localValue?: string) => {
    if (!localValue) return undefined;
    const d = new Date(localValue);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!factura.idsucursal || Number(factura.idsucursal) <= 0) {
      setError('La sucursal (idsucursal) es obligatoria');
      return;
    }
    const detallesValidos = detalles
      .filter((d) => d.idproducto !== '' && d.cantidad !== '')
      .map((d) => ({ idproducto: Number(d.idproducto), cantidad: Number(d.cantidad) }))
      .filter((d) => d.idproducto > 0 && d.cantidad > 0);
    if (detallesValidos.length < 1) {
      setError('Debe incluir al menos un detalle con cantidad > 0');
      return;
    }
    if (!cliente.nombres || !cliente.identificacion || !cliente.email) {
      setError('Complete los datos del cliente');
      return;
    }

    const payload: CreateInvoicePayload = {
      cliente: {
        nombres: cliente.nombres.trim(),
        identificacion: cliente.identificacion.trim(),
        email: cliente.email.trim(),
      },
      factura: {
        idsucursal: Number(factura.idsucursal),
        numeroFactura: factura.numeroFactura?.trim() || undefined,
        fecha: toISOFromLocal(factura.fecha),
      },
      detalles: detallesValidos,
    };

    setSubmitting(true);
    try {
      const resp = await facturacionService.crear(payload);
      setResult(resp);
    } catch (err: any) {
      setError(err?.message || 'Error al crear la factura');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" style={{ color: '#0071BC' }} />
              Crear Factura
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Nombres</label>
                <Input value={cliente.nombres} onChange={(e) => setCliente({ ...cliente, nombres: e.target.value })} placeholder="María López" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Identificación</label>
                <Input value={cliente.identificacion} onChange={(e) => setCliente({ ...cliente, identificacion: e.target.value })} placeholder="CC-555555" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <Input type="email" value={cliente.email} onChange={(e) => setCliente({ ...cliente, email: e.target.value })} placeholder="maria@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Sucursal</label>
                <Select
                  value={factura.idsucursal === '' ? '' : String(factura.idsucursal)}
                  onValueChange={(val: string) => {
                    if (val.startsWith('_')) return;
                    const num = parseInt(val, 10);
                    if (!Number.isNaN(num)) {
                      // Debug: selección de sucursal
                      console.debug('Sucursal seleccionada:', num);
                      setFactura({ ...factura, idsucursal: num });
                    }
                  }}
                  disabled={loadingLists}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={loadingLists ? 'Cargando sucursales...' : 'Seleccione una sucursal'} />
                  </SelectTrigger>
                  <SelectContent className="z-[1000]" position="popper">
                    {loadingLists && (
                      <SelectItem key="branch-loading" value="_loading" disabled>
                        Cargando sucursales...
                      </SelectItem>
                    )}
                    {!loadingLists && branches.length === 0 && (
                      <SelectItem key="branch-empty" value="_empty" disabled>
                        Sin sucursales
                      </SelectItem>
                    )}
                    {!loadingLists && branches.length > 0 && branches
                      .map((b: any) => ({
                        id: (b?.id ?? b?.idSucursal ?? b?.idsucursal) as number | undefined,
                        name: (b?.nombre ?? b?.nombre_sucursal ?? '') as string,
                      }))
                      .filter((b) => typeof b.id === 'number' && !Number.isNaN(b.id))
                      .map((b) => (
                        <SelectItem key={`branch-${b.id}`} value={String(b.id)}>
                          {b.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Número de factura (opcional)</label>
                <Input value={factura.numeroFactura || ''} onChange={(e) => setFactura({ ...factura, numeroFactura: e.target.value })} placeholder="F-00020" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Fecha (opcional)</label>
                <input
                  type="datetime-local"
                  className="w-full h-10 rounded-md border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={factura.fecha || ''}
                  onChange={(e) => setFactura({ ...factura, fecha: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Detalles</h3>
              <Button type="button" variant="outline" className="gap-2" onClick={onAddDetalle}>
                <Plus className="h-4 w-4" /> Agregar ítem
              </Button>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detalles.map((d, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="w-[280px]">
                        <Select
                          value={d.idproducto === '' ? '' : String(d.idproducto)}
                          onValueChange={(val: string) => {
                            if (val.startsWith('_')) return;
                            // Debug: selección de producto
                            console.debug('Producto seleccionado fila', idx, '=>', val);
                            onChangeDetalle(idx, 'idproducto', val);
                          }}
                          disabled={loadingLists}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={loadingLists ? 'Cargando productos...' : 'Seleccione un producto'} />
                          </SelectTrigger>
                          <SelectContent className="z-[1000]" position="popper">
                            {loadingLists && (
                              <SelectItem key={`product-loading-${idx}`} value="_loading" disabled>
                                Cargando productos...
                              </SelectItem>
                            )}
                            {!loadingLists && products.length === 0 && (
                              <SelectItem key={`product-empty-${idx}`} value="_empty" disabled>
                                Sin productos
                              </SelectItem>
                            )}
                            {!loadingLists && products.length > 0 && products
                              .map((p: any) => ({
                                id: (p?.id ?? p?.idproducto ?? p?.idProducto) as number | undefined,
                                name: (p?.nombre ?? p?.nombre_producto ?? '') as string,
                                brand: p?.marca,
                              }))
                              .filter((p) => typeof p.id === 'number' && !Number.isNaN(p.id))
                              .map((p) => (
                                <SelectItem key={`product-${p.id}`} value={String(p.id)}>
                                  {p.name} {p.brand ? `- ${p.brand}` : ''}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="w-[200px]">
                        <Input type="number" value={String(d.cantidad)} onChange={(e) => onChangeDetalle(idx, 'cantidad', e.target.value)} placeholder="3" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button type="button" variant="ghost" onClick={() => onRemoveDetalle(idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {(listsError || error) && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            {listsError && (
              <div className="text-red-600 text-xs">{listsError}</div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={submitting} className="gap-2" style={{ background: 'linear-gradient(to right, #009245, #0071BC)' }}>
                <Send className="h-4 w-4" /> {submitting ? 'Creando...' : 'Crear factura'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" style={{ color: '#009245' }} />
              Factura creada
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Número</div>
                <div className="font-semibold">{String(result.numeroFactura ?? result.numero_factura ?? '')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Fecha</div>
                <div className="font-semibold">{new Date(String(result.fecha)).toLocaleString('es-ES')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Cliente</div>
                <div className="font-semibold">{String(result.cliente?.nombres ?? '')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total</div>
                <div className="font-bold">${totalCalculado.toLocaleString('es-CO')}</div>
              </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(result.detalles as AnyObj[] | undefined)?.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>{d.idproducto}</TableCell>
                      <TableCell>{d.cantidad}</TableCell>
                      <TableCell>${Number(d.precio ?? 0).toLocaleString('es-CO')}</TableCell>
                      <TableCell>${Number(d.precioTotal ?? d.precio_total ?? 0).toLocaleString('es-CO')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
