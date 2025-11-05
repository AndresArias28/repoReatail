import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, FileSpreadsheet, FileText, Download } from 'lucide-react';

export function UploadData() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Carga de Datos</CardTitle>
          <p className="text-sm text-gray-600">
            Importa archivos CSV o Excel con información de ventas e inventario
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Área de arrastre */}
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 transition-colors hover:border-[#1E88E5] hover:bg-blue-50">
            <Upload className="mb-4 h-12 w-12 text-gray-400" />
            <p className="mb-2 text-center">
              Arrastra y suelta tus archivos aquí
            </p>
            <p className="mb-4 text-center text-sm text-gray-500">
              o haz clic para seleccionar
            </p>
            <Button className="bg-[#1E88E5] hover:bg-[#1976D2]">
              Seleccionar Archivo
            </Button>
            <p className="mt-4 text-xs text-gray-500">
              Formatos soportados: .csv, .xlsx, .xls (Máximo 10MB)
            </p>
          </div>

          {/* Plantillas descargables */}
          <div>
            <h3 className="mb-3">Plantillas Descargables</h3>
            <p className="mb-4 text-sm text-gray-600">
              Descarga nuestras plantillas para facilitar la importación de datos
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Card className="border shadow-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <FileSpreadsheet className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p>Plantilla de Ventas</p>
                    <p className="text-xs text-gray-500">Excel (.xlsx)</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p>Plantilla de Inventario</p>
                    <p className="text-xs text-gray-500">CSV (.csv)</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Historial de cargas */}
          <div>
            <h3 className="mb-3">Historial de Cargas Recientes</h3>
            <div className="space-y-2">
              <Card className="border shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm">ventas_octubre_2025.xlsx</p>
                      <p className="text-xs text-gray-500">Cargado el 3 Nov 2025 - 1,245 registros</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    Exitoso
                  </span>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm">inventario_actualizado.csv</p>
                      <p className="text-xs text-gray-500">Cargado el 1 Nov 2025 - 892 registros</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    Exitoso
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
