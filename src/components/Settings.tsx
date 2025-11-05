import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">Nombre de la Empresa</Label>
              <Input 
                id="company" 
                defaultValue="Fashion Analytics" 
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email de Contacto</Label>
              <Input 
                id="email" 
                type="email"
                defaultValue="admin@fashionanalytics.com" 
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="sucursales">Número de Sucursales</Label>
              <Input 
                id="sucursales" 
                type="number"
                defaultValue="4" 
                className="mt-2"
              />
            </div>
          </div>

          <Button className="bg-[#1E88E5] hover:bg-[#1976D2]">
            Guardar Cambios
          </Button>
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

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Preferencias de Visualización</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Modo Oscuro</p>
              <p className="text-sm text-gray-500">Cambiar la apariencia del dashboard</p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Gráficas Animadas</p>
              <p className="text-sm text-gray-500">Mostrar animaciones en las gráficas</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Vista Compacta</p>
              <p className="text-sm text-gray-500">Reducir espaciado en las tablas</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-red-600">Zona Peligrosa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm">Resetear todos los datos del sistema</p>
            <Button variant="destructive">Resetear Datos</Button>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-sm">Exportar todos los datos</p>
            <Button variant="outline">Exportar Base de Datos</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
