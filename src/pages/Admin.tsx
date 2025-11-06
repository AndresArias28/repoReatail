import React, { useState } from 'react';
import { Eye, EyeOff, Edit2, Trash2, Plus } from 'lucide-react';

interface Employee {
  id: number;
  nombreCompleto: string;
  ciudad: string;
  sucursal: string;
  usuario: string;
  contrasena: string;
}
function AdminPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      nombreCompleto: 'María García López',
      ciudad: 'Ciudad de México',
      sucursal: 'Sucursal Centro',
      usuario: 'maria.garcia@empresa.com',
      contrasena: 'password123'
    },
    {
      id: 2,
      nombreCompleto: 'Juan Pérez Martínez',
      ciudad: 'Guadalajara',
      sucursal: 'Sucursal Plaza del Sol',
      usuario: 'juan.perez@empresa.com',
      contrasena: 'password456'
    },
    {
      id: 3,
      nombreCompleto: 'Ana Rodríguez Silva',
      ciudad: 'Monterrey',
      sucursal: 'Sucursal Valle Oriente',
      usuario: 'ana.rodriguez@empresa.com',
      contrasena: 'password789'
    },
    {
      id: 4,
      nombreCompleto: 'Carlos Hernández Torres',
      ciudad: 'Ciudad de México',
      sucursal: 'Sucursal Polanco',
      usuario: 'carlos.hernandez@empresa.com',
      contrasena: 'password321'
    }
  ]);

  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    ciudad: '',
    sucursal: '',
    usuario: '',
    contrasena: ''
  });

  const togglePasswordVisibility = (id: number) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      nombreCompleto: employee.nombreCompleto,
      ciudad: employee.ciudad,
      sucursal: employee.sucursal,
      usuario: employee.usuario,
      contrasena: employee.contrasena
    });
    setIsModalOpen(true);
  };

  const handleNewEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      nombreCompleto: '',
      ciudad: '',
      sucursal: '',
      usuario: '',
      contrasena: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id
          ? { ...emp, ...formData }
          : emp
      ));
    } else {
      const newEmployee: Employee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        ...formData
      };
      setEmployees([...employees, newEmployee]);
    }

    setIsModalOpen(false);
    setFormData({
      nombreCompleto: '',
      ciudad: '',
      sucursal: '',
      usuario: '',
      contrasena: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Empleados</h1>
          <p className="text-gray-600 mb-4">Administra y gestiona la información de todos los empleados del sistema</p>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              Total de empleados: <span className="font-semibold">{employees.length}</span>
            </p>
            <button
              onClick={handleNewEmployee}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nuevo empleado
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre completo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ciudad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sucursal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contraseña
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.nombreCompleto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.ciudad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.sucursal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.usuario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">
                          {showPassword[employee.id] ? employee.contrasena : '••••••••'}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(employee.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPassword[employee.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Edit2 size={16} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingEmployee ? 'Editar Empleado' : 'Nuevo Empleado'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombreCompleto}
                    onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sucursal
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sucursal}
                    onChange={(e) => setFormData({ ...formData, sucursal: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usuario (Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.usuario}
                    onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.contrasena}
                    onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingEmployee ? 'Guardar cambios' : 'Crear empleado'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export { AdminPage };