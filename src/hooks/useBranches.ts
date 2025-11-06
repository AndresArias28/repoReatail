// ============================================
// HOOK PARA SUCURSALES
// ============================================

import { useState, useEffect } from 'react';
import { branchesService } from '../services/branches.service';
import type { Sucursal } from '../types/database.types';

export function useBranches() {
  const [data, setData] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState(false); // No loading porque la ruta no existe
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ruta /sucursales/obtener NO implementada en el backend
    // Devolver array vacío para evitar errores
    setData([]);
    setLoading(false);
    setError(null);
    console.warn('⚠️ useBranches: Ruta /sucursales/obtener no implementada en el backend');
  }, []);

  return { data, loading, error };
}
