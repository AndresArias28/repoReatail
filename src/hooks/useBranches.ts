// ============================================
// HOOK PARA SUCURSALES
// ============================================

import { useState, useEffect } from 'react';
import { branchesService } from '../services/branches.service';
import type { Sucursal } from '../types/database.types';

export function useBranches() {
  const [data, setData] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await branchesService.getBranches();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar sucursales');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
