import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Edit2, Trash2, Plus } from "lucide-react";
import axios from "axios";

interface Employee {
  id: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  email: string;
  password: string;
  rol: string;
  idsucursal: number;
}

function AdminPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Omit<Employee, "id">>({
    nombres: "",
    apellidos: "",
    identificacion: "",
    telefono: "",
    email: "",
    password: "",
    rol: "empleado",
    idsucursal: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // 🔹 Cargar empleados desde el backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(
        "https://hackatomventaprendasback.onrender.com/usuarios/obtener"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchEmployees();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando empleados...</p>;

  const togglePasswordVisibility = (id: number) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      nombres: employee.nombres,
      apellidos: employee.apellidos,
      identificacion: employee.identificacion,
      telefono: employee.telefono,
      email: employee.email,
      password: employee.password,
      rol: employee.rol,
      idsucursal: employee.idsucursal,
    });
    setIsModalOpen(true);
  };

  const handleNewEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      nombres: "",
      apellidos: "",
      identificacion: "",
      telefono: "",
      email: "",
      password: "",
      rol: "empleado",
      idsucursal: 0,
    });
    setIsModalOpen(true);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const payload = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      identificacion: formData.identificacion,
      telefono: formData.telefono,
      email: formData.email,
      password: formData.password || formData.password,
      rol: formData.rol,
      idsucursal: formData.idsucursal > 0 ? formData.idsucursal : 1, 
    };

    console.log("📦 Enviando:", payload); // mira en consola qué se manda

    const res = await axios.post(
      "https://hackatomventaprendasback.onrender.com/auth/register",
      payload
    );
    console.log("✅ Respuesta:", res.data);

    await fetchEmployees();
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({
      nombres: "",
      apellidos: "",
      identificacion: "",
      telefono: "",
      email: "",
      password: "",
      rol: "empleado",
      idsucursal: 1,
    });
    alert(res.data.message || "Empleado creado correctamente 🎉");
  } catch (error: any) {
    console.error("❌ Error al guardar empleado:", error.response?.data || error);
    alert(
      error.response?.data?.message ||
        "Error interno del servidor (500). Revisa los logs del backend."
    );
  }
};




  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Gestión de Empleados
          </h1>
          <p className="text-gray-600 mb-4">
            Administra y gestiona la información de todos los empleados del sistema
          </p>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              Total de empleados:{" "}
              <span className="font-semibold">{employees.length}</span>
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

        {/* Tabla de empleados */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apellidos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Identificación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
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
                    <td className="px-6 py-4 text-sm text-gray-900">{employee.nombres}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{employee.apellidos}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{employee.identificacion}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{employee.telefono}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{employee.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">
                          {showPassword[employee.id]
                            ? employee.password
                            : "••••••••"}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(employee.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPassword[employee.id] ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
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

      {/* Modal de creación/edición */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingEmployee ? "Editar Empleado" : "Nuevo Empleado"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombres
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombres}
                    onChange={(e) =>
                      setFormData({ ...formData, nombres: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.apellidos}
                    onChange={(e) =>
                      setFormData({ ...formData, apellidos: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Identificación
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.identificacion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identificacion: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    required
                    value={(formData as any).rol ?? "empleado"}
                    onChange={(e) =>
                      setFormData({ ...(formData as any), rol: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="empleado">Empleado</option>
                    <option value="admin">Administrador</option>
                  </select>

                </div>
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                  <input
                    type="text"
                    required
                    value={(formData as any).sucursal ?? ""}
                    onChange={(e) =>
                      setFormData({ ...(formData as any), sucursal: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingEmployee ? "Guardar cambios" : "Crear empleado"}
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
