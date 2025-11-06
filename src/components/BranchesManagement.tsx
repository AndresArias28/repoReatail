// ============================================
// GESTIÓN DE SUCURSALES
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
import { Plus, Pencil, Trash2, Building2, Loader2 } from 'lucide-react';
import { useBranches } from '../hooks/useBranches';
import { branchesService, type CreateSucursalDto } from '../services/branches.service';

export function BranchesManagement() {
  const { data: sucursales, loading, refetch } = useBranches();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState<CreateSucursalDto>({
    idmunicipio: 1, // Por defecto, debería venir de un select
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await branchesService.createBranch(formData);
      setIsCreateDialogOpen(false);
      resetForm();
      refetch();
      alert('Sucursal creada exitosamente');
    } catch (error) {
      console.error('Error al crear sucursal:', error);
      alert('Error al crear sucursal. Verifica que el endpoint esté disponible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBranch) return;
    
    setIsSubmitting(true);
    
    try {
      await branchesService.updateBranch(selectedBranch.id, formData);
      setIsEditDialogOpen(false);
      setSelectedBranch(null);
      resetForm();
      refetch();
      alert('Sucursal actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar sucursal:', error);
      alert('Error al actualizar sucursal. Verifica que el endpoint esté disponible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar la sucursal "${nombre}"?`)) {
      return;
    }

    try {
      await branchesService.deleteBranch(id);
      refetch();
      alert('Sucursal eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar sucursal:', error);
      alert('Error al eliminar sucursal. Verifica que el endpoint esté disponible.');
    }
  };

  const openEditDialog = (branch: any) => {
    setSelectedBranch(branch);
    setFormData({
      idmunicipio: branch.idmunicipio || 1,
      nit: branch.nit,
      nombre: branch.nombre,
      direccion: branch.direccion,
      email: branch.email,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Sucursales</h1>
          <p className="text-gray-600 mt-1">
            Administra las sucursales de tu negocio
          </p>
        </div>

        {/* Botón Crear */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Sucursal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleCreate}>
              <DialogHeader>
                <DialogTitle>Crear Nueva Sucursal</DialogTitle>
                <DialogDescription>
                  Completa los datos de la nueva sucursal
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre *</Label>
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
                  <Label htmlFor="email">Email *</Label>
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
                  <Label htmlFor="idmunicipio">ID Municipio *</Label>
                  <Input
                    id="idmunicipio"
                    name="idmunicipio"
                    type="number"
                    value={formData.idmunicipio}
                    onChange={handleInputChange}
                    placeholder="Ej: 1"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Nota: En el futuro esto será un selector de municipios
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Sucursal
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabla de Sucursales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Lista de Sucursales
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : sucursales && sucursales.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>NIT</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sucursales.map((sucursal) => (
                    <TableRow key={sucursal.id}>
                      <TableCell className="font-medium">
                        {sucursal.nombre}
                      </TableCell>
                      <TableCell>{sucursal.nit}</TableCell>
                      <TableCell>{sucursal.direccion}</TableCell>
                      <TableCell>{sucursal.email}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(sucursal)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(sucursal.id, sucursal.nombre)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex h-[400px] flex-col items-center justify-center text-gray-500">
              <Building2 className="h-12 w-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No hay sucursales registradas</p>
              <p className="text-sm">Crea tu primera sucursal para comenzar</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Editar Sucursal</DialogTitle>
              <DialogDescription>
                Modifica los datos de la sucursal
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-nombre">Nombre *</Label>
                <Input
                  id="edit-nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-nit">NIT *</Label>
                <Input
                  id="edit-nit"
                  name="nit"
                  value={formData.nit}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-direccion">Dirección *</Label>
                <Input
                  id="edit-direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-idmunicipio">ID Municipio *</Label>
                <Input
                  id="edit-idmunicipio"
                  name="idmunicipio"
                  type="number"
                  value={formData.idmunicipio}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedBranch(null);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
