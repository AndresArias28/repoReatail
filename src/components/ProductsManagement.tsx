import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { productsService } from '../services/products.service';
import type { Producto } from '../types/database.types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

interface ProductFormState {
  id?: number;
  idsubcategoria: number | '';
  nombre: string;
  marca: string;
  precio: number | '';
  talla: string;
  descripcion: string;
}

const emptyForm: ProductFormState = {
  idsubcategoria: '',
  nombre: '',
  marca: '',
  precio: '',
  talla: '',
  descripcion: '',
};

export function ProductsManagement() {
  const [items, setItems] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const isEdit = useMemo(() => typeof form.id === 'number', [form.id]);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await productsService.list();
      setItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (p: Producto) => {
    setForm({
      id: (p as any).id as any,
      idsubcategoria: (p as any).idsubcategoria ?? '',
      nombre: p.nombre || '',
      marca: p.marca || '',
      precio: (p as any).precio ?? '',
      talla: p.talla || '',
      descripcion: p.descripcion || '',
    });
    setOpen(true);
  };

  const submit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        idsubcategoria: typeof form.idsubcategoria === 'string' ? parseInt(form.idsubcategoria as any, 10) : form.idsubcategoria,
        nombre: form.nombre.trim(),
        marca: form.marca.trim(),
        precio: typeof form.precio === 'string' ? parseFloat(form.precio as any) : form.precio,
        talla: form.talla.trim(),
        descripcion: form.descripcion.trim(),
      } as any;

      if (!payload.nombre || !payload.marca || !payload.talla || !payload.descripcion) {
        throw new Error('Completa los campos requeridos');
      }
      if (!payload.idsubcategoria || Number.isNaN(payload.idsubcategoria)) {
        throw new Error('idsubcategoria inválida');
      }
      if (!payload.precio || payload.precio <= 0) {
        throw new Error('precio debe ser mayor a 0');
      }

      if (isEdit && form.id) {
        await productsService.update(form.id, payload);
      } else {
        await productsService.create(payload);
      }
      setOpen(false);
      await load();
    } catch (e: any) {
      setError(e?.message || 'Error al guardar');
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (p: Producto) => {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      await productsService.remove((p as any).id);
      await load();
    } catch (e: any) {
      setError(e?.message || 'Error al eliminar');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Productos</CardTitle>
          <Button onClick={openCreate} className="text-white" style={{ background: 'linear-gradient(to right, #0071BC, #662D91)' }}>
            <Plus className="w-4 h-4 mr-2" /> Crear
          </Button>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
          {loading ? (
            <div className="flex h-[200px] items-center justify-center text-gray-500">Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Subcategoría</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Nombre</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Marca</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Precio</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Talla</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Descripción</th>
                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={(p as any).id} className="border-t">
                      <td className="px-4 py-2 text-sm">{(p as any).id}</td>
                      <td className="px-4 py-2 text-sm">{(p as any).idsubcategoria}</td>
                      <td className="px-4 py-2 text-sm">{p.nombre}</td>
                      <td className="px-4 py-2 text-sm">{p.marca}</td>
                      <td className="px-4 py-2 text-sm">{(p as any).precio?.toLocaleString?.() ?? (p as any).precio}</td>
                      <td className="px-4 py-2 text-sm">{p.talla}</td>
                      <td className="px-4 py-2 text-sm">{p.descripcion}</td>
                      <td className="px-4 py-2 text-right">
                        <button className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800" onClick={() => openEdit(p)}>
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800" onClick={() => remove(p)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Actualizar producto' : 'Crear producto'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">ID Subcategoría</label>
              <input
                value={form.idsubcategoria}
                onChange={(e) => setForm((f) => ({ ...f, idsubcategoria: e.target.value as any }))}
                type="number"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                placeholder="3"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Nombre</label>
              <input
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                placeholder="Camisa Oxford Azul"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Marca</label>
              <input
                value={form.marca}
                onChange={(e) => setForm((f) => ({ ...f, marca: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                placeholder="Oxford"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Precio</label>
              <input
                value={form.precio}
                onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value as any }))}
                type="number"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                placeholder="80000"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Talla</label>
              <input
                value={form.talla}
                onChange={(e) => setForm((f) => ({ ...f, talla: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                placeholder="M"
              />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs text-gray-600">Descripción</label>
              <input
                value={form.descripcion}
                onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                placeholder="Camisa manga larga"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={submit} disabled={submitting} className="text-white" style={{ background: 'linear-gradient(to right, #0071BC, #662D91)' }}>
              {isEdit ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
