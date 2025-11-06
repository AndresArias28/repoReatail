// ============================================
// HOOK PARA SUCURSALES
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { branchesService } from '../services/branches.service';
import type { Sucursal } from '../types/database.types';

export function useBranches() {
  const [data, setData] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🏢 Cargando sucursales...');
      const sucursales = await branchesService.getBranches();
      console.log('✅ Sucursales recibidas:', sucursales);
      
      setData(sucursales);
      setError(null);
    } catch (err) {
      console.error('❌ Error al cargar sucursales:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar sucursales');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return { data, loading, error, refetch: fetchBranches };
}
