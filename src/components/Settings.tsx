import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { useAuth } from '../context/AuthContext';

export function Settings() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {user?.nombres} {user?.apellidos}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {user?.email}
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

            <div>
              <p className="text-sm font-medium text-gray-500">Rol</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {user?.rol === 'administrador' ? 'Administrador' : 'Empleado'}
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Alertas de Stock Bajo</p>
              <p className="text-sm text-gray-500">Recibir notificaciones cuando el stock esté bajo</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Recomendaciones Diarias</p>
              <p className="text-sm text-gray-500">Recibir sugerencias automáticas cada mañana</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Reportes Semanales</p>
              <p className="text-sm text-gray-500">Resumen de ventas cada lunes</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Alertas de Tendencias</p>
              <p className="text-sm text-gray-500">Notificar cambios importantes en ventas</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
