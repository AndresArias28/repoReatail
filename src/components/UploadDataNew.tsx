// ============================================
// COMPONENTE DE CARGA DE DATOS - COMPLETO
// ============================================

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Upload,
  FileSpreadsheet,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Eye,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { uploadService, type UploadPreview } from '../services/upload.service';
import { useBranches } from '../hooks/useBranches';
import { useAuth } from '../context/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';

type UploadType = 'products' | 'inventory' | 'sales';

interface UploadResult {
  success: boolean;
  message: string;
  processed: number;
  errors: number;
  errorDetails?: Array<{
    row: number;
    error: string;
  }>;
}

export function UploadDataNew() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<UploadType>('products');
  const [selectedSucursal, setSelectedSucursal] = useState<number | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [preview, setPreview] = useState<UploadPreview | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Obtener usuario autenticado
  const { user } = useAuth();
  const isEmpleado = user?.rol === 'empleado';
  const sucursalEmpleado = user?.idSucursal;
  
  // Cargar sucursales (solo para administradores)
  const { data: sucursales, loading: loadingSucursales } = useBranches();

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = async (file: File) => {
    // Validar archivo
    const validation = uploadService.validateFile(file);
    if (!validation.valid) {
      setUploadResult({
        success: false,
        message: validation.error || 'Archivo no válido',
        processed: 0,
        errors: 1,
      });
      return;
    }

    setSelectedFile(file);
    setUploadResult(null);

    // Generar preview para archivos CSV
    if (file.name.endsWith('.csv')) {
      try {
        const previewData = await uploadService.previewFile(file);
        setPreview(previewData);
      } catch (error) {
        console.error('Error al generar preview:', error);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadResult(null);

    try {
      let response;
      
      // Si es empleado, usar su sucursal asignada; si es admin, usar la seleccionada
      const idsucursalFinal = isEmpleado ? sucursalEmpleado : selectedSucursal;
      
      switch (uploadType) {
        case 'products':
          response = await uploadService.uploadProducts(selectedFile, idsucursalFinal);
          break;
        case 'inventory':
          response = await uploadService.uploadInventory(selectedFile);
          break;
        case 'sales':
          response = await uploadService.uploadSales(selectedFile);
          break;
      }

      setUploadResult(response.data);
      
      if (response.data.success) {
        // Limpiar archivo después de carga exitosa
        setTimeout(() => {
          setSelectedFile(null);
          setPreview(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : 'Error al subir archivo',
        processed: 0,
        errors: 1,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async (type: UploadType) => {
    try {
      await uploadService.downloadTemplate(type);
    } catch (error) {
      console.error('Error al descargar plantilla:', error);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Carga Masiva de Productos</CardTitle>
          <p className="text-sm text-gray-600">
            Importa archivos Excel con información de productos y actualiza el inventario de tus sucursales
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selector de tipo de carga */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Tipo de Datos</label>
              <Select value={uploadType} onValueChange={(value) => setUploadType(value as UploadType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="products">Productos con Inventario</SelectItem>
                  {/* <SelectItem value="inventory" disabled>Inventario (Próximamente)</SelectItem>
                  <SelectItem value="sales" disabled>Ventas/Facturas (Próximamente)</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            {/* Selector de sucursal (solo para administradores) */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sucursal {!isEmpleado && <span className="text-xs text-gray-500">(Opcional - para actualizar stock)</span>}
              </label>
              
              {isEmpleado ? (
                // Empleado: Mostrar su sucursal asignada (solo lectura)
                <div className="flex h-10 w-full items-center rounded-md border border-input bg-gray-50 px-3 py-2 text-sm">
                  <span className="font-medium text-gray-900">
                    {sucursales.find(s => s.id === sucursalEmpleado)?.nombre || `Sucursal #${sucursalEmpleado}`}
                  </span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Asignada
                  </Badge>
                </div>
              ) : (
                // Administrador: Selector de sucursal
                <Select 
                  value={selectedSucursal?.toString() || 'ninguna'} 
                  onValueChange={(value) => setSelectedSucursal(value === 'ninguna' ? undefined : parseInt(value))}
                  disabled={loadingSucursales}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sin sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ninguna">Sin sucursal (solo productos)</SelectItem>
                    {sucursales.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id.toString()}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              <p className="mt-1 text-xs text-gray-500">
                {isEmpleado 
                  ? 'Los productos se cargarán automáticamente a tu sucursal asignada con el stock del Excel'
                  : 'Si seleccionas una sucursal, se actualizará el stock según la columna "Stock" del Excel'
                }
              </p>
            </div>
          </div>

          {/* Área de arrastre */}
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all ${
              dragActive
                ? 'border-[#0071BC] bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:border-[#0071BC] hover:bg-blue-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className={`mb-4 h-12 w-12 ${dragActive ? 'text-[#0071BC]' : 'text-gray-400'}`} />
            <p className="mb-2 text-center font-medium">
              {selectedFile ? selectedFile.name : 'Arrastra y suelta tu archivo aquí'}
            </p>
            <p className="mb-4 text-center text-sm text-gray-500">
              o haz clic para seleccionar
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #0071BC, #662D91)' }}
            >
              Seleccionar Archivo
            </Button>
            <p className="mt-4 text-xs text-gray-500">
              Formatos soportados: .xlsx, .xls (Máximo 5MB)
            </p>
          </div>

          {/* Archivo seleccionado */}
          {selectedFile && (
            <Card className="border-2 border-[#0071BC] bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-8 w-8 text-[#0071BC]" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {preview && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        {showPreview ? 'Ocultar' : 'Vista Previa'}
                      </Button>
                    )}
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="gap-2 hover:opacity-90"
                      style={{ background: 'linear-gradient(to right, #009245, #0071BC)' }}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Subiendo...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Subir Archivo
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFile}
                      disabled={uploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vista previa */}
          {showPreview && preview && (
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Vista Previa del Archivo</CardTitle>
                <p className="text-sm text-gray-600">
                  Mostrando las primeras 5 filas de {preview.totalRows} registros totales
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {preview.headers.map((header, index) => (
                          <TableHead key={index}>{header}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {preview.headers.map((header, colIndex) => (
                            <TableCell key={colIndex}>{row[header]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resultado de la carga */}
          {uploadResult && (
            <Card
              className={`border-2 ${
                uploadResult.success
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {uploadResult.success ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{uploadResult.message}</p>
                    <div className="mt-2 flex gap-4 text-sm">
                      <span className="text-green-600">
                        ✓ Procesados: {uploadResult.processed}
                      </span>
                      {uploadResult.errors > 0 && (
                        <span className="text-red-600">
                          ✗ Errores: {uploadResult.errors}
                        </span>
                      )}
                    </div>
                    {uploadResult.errorDetails && uploadResult.errorDetails.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-sm font-medium text-red-700">Detalles de errores:</p>
                        {uploadResult.errorDetails.slice(0, 5).map((error, index) => (
                          <p key={index} className="text-xs text-red-600">
                            Fila {error.row}: {error.error}
                          </p>
                        ))}
                        {uploadResult.errorDetails.length > 5 && (
                          <p className="text-xs text-red-600">
                            ... y {uploadResult.errorDetails.length - 5} errores más
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Plantilla descargable */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Plantilla de Ejemplo</h3>
            <p className="mb-4 text-sm text-gray-600">
              Descarga la plantilla para ver el formato correcto de importación
            </p>
            <Card className="border shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0071BC]/10">
                  <FileSpreadsheet className="h-6 w-6 text-[#0071BC]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Productos con Inventario</p>
                  <p className="text-xs text-gray-500">
                    Columnas: Subcategoría, Nombre, Marca, Precio, Talla, Descripción, Stock
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleDownloadTemplate('products')}
                >
                  <Download className="h-4 w-4" />
                  Descargar CSV
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Instrucciones */}
          <Card className="border-l-4 border-l-[#0071BC] bg-blue-50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-[#0071BC]" />
                <div>
                  <p className="font-medium text-gray-900">Instrucciones de Carga</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li>• El archivo debe ser Excel (.xlsx, .xls) con una hoja llamada "Productos"</li>
                    <li>• <strong>Columnas requeridas:</strong> Subcategoría, Nombre, Precio</li>
                    <li>• <strong>Columnas opcionales:</strong> Marca, Talla, Descripción, Stock</li>
                    <li>• La Subcategoría debe existir previamente en el sistema</li>
                    <li>• Si seleccionas una sucursal, la columna Stock actualizará el inventario</li>
                    <li>• Los productos existentes (mismo nombre) se actualizarán automáticamente</li>
                    <li>• El archivo no debe exceder los 5MB</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
