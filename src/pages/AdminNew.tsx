import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Edit2, Trash2, Plus, Building2, Users, LogOut, Settings, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { branchesService, type CreateSucursalDto } from "../services/branches.service";
import { useBranches } from "../hooks/useBranches";

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

interface Sucursal {
  id: number;
  idmunicipio: number;
  nit: string;
  nombre: string;
  direccion: string;
  email: string;
}

type TabType = "empleados" | "sucursales" | "configuracion";

function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("empleados");

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  // ============================================
  // ESTADO EMPLEADOS
  // ============================================
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>({});
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeFormData, setEmployeeFormData] = useState<Omit<Employee, "id">>({
    nombres: "",
    apellidos: "",
    identificacion: "",
    telefono: "",
    email: "",
    password: "",
    rol: "empleado",
    idsucursal: 1,
  });
  const [loadingEmployees, setLoadingEmployees] = useState<boolean>(true);

  // ============================================
  // ESTADO SUCURSALES
  // ============================================
  const { data: sucursales, loading: loadingSucursales, refetch: refetchSucursales } = useBranches();
  const [isSucursalModalOpen, setIsSucursalModalOpen] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null);
  const [sucursalFormData, setSucursalFormData] = useState<CreateSucursalDto>({
    idmunicipio: 1,
    nit: "",
    nombre: "",
    direccion: "",
    email: "",
  });

  // ============================================
  // FUNCIONES EMPLEADOS
  // ============================================
  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(
        "https://hackatomventaprendasback.onrender.com/usuarios/obtener"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    } finally {
      setLoadingEmployees(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const togglePasswordVisibility = (id: number) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setEmployeeFormData({
      nombres: employee.nombres,
      apellidos: employee.apellidos,
      identificacion: employee.identificacion,
      telefono: employee.telefono,
      email: employee.email,
      password: employee.password,
      rol: employee.rol,
      idsucursal: employee.idsucursal,
    });
    setIsEmployeeModalOpen(true);
  };

  const handleNewEmployee = () => {
    setEditingEmployee(null);
    setEmployeeFormData({
      nombres: "",
      apellidos: "",
      identificacion: "",
      telefono: "",
      email: "",
      password: "",
      rol: "empleado",
      idsucursal: 1,
    });
    setIsEmployeeModalOpen(true);
  };

  const handleSubmitEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        nombres: employeeFormData.nombres,
        apellidos: employeeFormData.apellidos,
        identificacion: employeeFormData.identificacion,
        telefono: employeeFormData.telefono,
        email: employeeFormData.email,
        password: employeeFormData.password,
        rol: employeeFormData.rol,
        idsucursal: employeeFormData.idsucursal > 0 ? employeeFormData.idsucursal : 1,
      };

      const res = await axios.post(
        "https://hackatomventaprendasback.onrender.com/auth/register",
        payload
      );

      await fetchEmployees();
      setIsEmployeeModalOpen(false);
      setEditingEmployee(null);
      setEmployeeFormData({
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
      alert(error.response?.data?.message || "Error al crear empleado");
    }
  };

  // ============================================
  // FUNCIONES SUCURSALES
  // ============================================
  const handleNewSucursal = () => {
    setEditingSucursal(null);
    setSucursalFormData({
      idmunicipio: 1,
      nit: "",
      nombre: "",
      direccion: "",
      email: "",
    });
    setIsSucursalModalOpen(true);
  };

  const handleEditSucursal = (sucursal: Sucursal) => {
    setEditingSucursal(sucursal);
    setSucursalFormData({
      idmunicipio: sucursal.idmunicipio,
      nit: sucursal.nit,
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      email: sucursal.email,
    });
    setIsSucursalModalOpen(true);
  };

  const handleSubmitSucursal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSucursal) {
        await branchesService.updateBranch(editingSucursal.id, sucursalFormData);
        alert("Sucursal actualizada exitosamente");
      } else {
        await branchesService.createBranch(sucursalFormData);
        alert("Sucursal creada exitosamente");
      }
      
      refetchSucursales();
      setIsSucursalModalOpen(false);
      setEditingSucursal(null);
      setSucursalFormData({
        idmunicipio: 1,
        nit: "",
        nombre: "",
        direccion: "",
        email: "",
      });
    } catch (error: any) {
      console.error("Error al guardar sucursal:", error);
      alert(error.response?.data?.message || "Error al guardar sucursal");
    }
  };

  const handleDeleteSucursal = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar la sucursal "${nombre}"?`)) {
      return;
    }

    try {
      await branchesService.deleteBranch(id);
      refetchSucursales();
      alert("Sucursal eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar sucursal:", error);
      alert("Error al eliminar sucursal");
    }
  };

  if (loadingEmployees) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Superior con info del usuario */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-sm text-gray-600">Gestiona empleados y sucursales del sistema</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Info del usuario */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nombres} {user?.apellidos}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Botón cerrar sesión */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Salir</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("empleados")}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === "empleados"
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users size={20} />
                Empleados
              </button>
              <button
                onClick={() => setActiveTab("sucursales")}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === "sucursales"
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Building2 size={20} />
                Sucursales
              </button>
              <button
                onClick={() => setActiveTab("configuracion")}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === "configuracion"
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Settings size={20} />
                Configuración
              </button>
            </div>
          </div>

          {/* Contenido según tab activo */}
          {activeTab === "empleados" ? (
          // ============================================
          // SECCIÓN EMPLEADOS
          // ============================================
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
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
                        <td className="px-6 py-4 text-sm text-gray-700">{employee.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.rol === 'administrador' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {employee.rol}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">
                              {showPassword[employee.id] ? employee.password : "••••••••"}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(employee.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {showPassword[employee.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEditEmployee(employee)}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <Edit2 size={16} />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(employee.id)}
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
          </>
        ) : activeTab === "sucursales" ? (
          // ============================================
          // SECCIÓN SUCURSALES
          // ============================================
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-700">
                  Total de sucursales:{" "}
                  <span className="font-semibold">{sucursales.length}</span>
                </p>
                <button
                  onClick={handleNewSucursal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Nueva sucursal
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {loadingSucursales ? (
                <div className="flex h-64 items-center justify-center">
                  <p className="text-gray-500">Cargando sucursales...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          NIT
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dirección
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sucursales.map((sucursal) => (
                        <tr key={sucursal.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {sucursal.nombre}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{sucursal.nit}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{sucursal.direccion}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{sucursal.email}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleEditSucursal(sucursal)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Edit2 size={16} />
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteSucursal(sucursal.id, sucursal.nombre)}
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
              )}
            </div>
          </>
        ) : activeTab === "configuracion" ? (
          // ============================================
          // SECCIÓN CONFIGURACIÓN
          // ============================================
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Información del Administrador</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b pb-2">
                  Datos Personales
                </h3>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {user?.nombres} {user?.apellidos}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Identificación</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {user?.identificacion}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Teléfono</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {user?.telefono}
                  </p>
                </div>
              </div>

              {/* Información de Cuenta */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b pb-2">
                  Información de Cuenta
                </h3>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Rol</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {user?.rol === 'administrador' ? 'Administrador' : 'Empleado'}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">ID de Usuario</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    #{user?.idUsuario}
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas del Sistema */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                Estadísticas del Sistema
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Empleados</p>
                      <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Sucursales</p>
                      <p className="text-2xl font-bold text-gray-900">{sucursales.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sistema Activo</p>
                      <p className="text-2xl font-bold text-gray-900">✓</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota de seguridad */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Nota de Seguridad:</strong> Para modificar tu información personal, contacta al administrador del sistema.
              </p>
            </div>
          </div>
          ) : null}
        </div>
      </div>

      {/* Modal Empleado */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingEmployee ? "Editar Empleado" : "Nuevo Empleado"}
            </h2>
            <form onSubmit={handleSubmitEmployee}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                  <input
                    type="text"
                    required
                    value={employeeFormData.nombres}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, nombres: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                  <input
                    type="text"
                    required
                    value={employeeFormData.apellidos}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, apellidos: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identificación</label>
                  <input
                    type="text"
                    required
                    value={employeeFormData.identificacion}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, identificacion: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    required
                    value={employeeFormData.telefono}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, telefono: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={employeeFormData.email}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    required
                    value={employeeFormData.password}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    required
                    value={employeeFormData.rol}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, rol: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                  <select
                    required
                    value={employeeFormData.idsucursal}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, idsucursal: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Seleccionar sucursal</option>
                    {sucursales.map((suc) => (
                      <option key={suc.id} value={suc.id}>
                        {suc.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
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

      {/* Modal Sucursal */}
      {isSucursalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingSucursal ? "Editar Sucursal" : "Nueva Sucursal"}
            </h2>
            <form onSubmit={handleSubmitSucursal}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={sucursalFormData.nombre}
                    onChange={(e) => setSucursalFormData({ ...sucursalFormData, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Sucursal Centro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
                  <input
                    type="text"
                    required
                    value={sucursalFormData.nit}
                    onChange={(e) => setSucursalFormData({ ...sucursalFormData, nit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 900123456-7"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    value={sucursalFormData.direccion}
                    onChange={(e) => setSucursalFormData({ ...sucursalFormData, direccion: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Calle 10 #20-30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={sucursalFormData.email}
                    onChange={(e) => setSucursalFormData({ ...sucursalFormData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: sucursal@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Municipio</label>
                  <input
                    type="number"
                    required
                    value={sucursalFormData.idmunicipio}
                    onChange={(e) => setSucursalFormData({ ...sucursalFormData, idmunicipio: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nota: En el futuro esto será un selector de municipios
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsSucursalModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingSucursal ? "Guardar cambios" : "Crear sucursal"}
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
