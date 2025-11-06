// ============================================
// HOOK PARA SUCURSALES
// ============================================

import { useState, useEffect } from 'react';
import { branchesService } from '../services/branches.service';
import type { Sucursal } from '../types/database.types';

export function useBranches() {
  const [data, setData] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await branchesService.getBranches(); // GET /sucursal/obtener
        if (!mounted) return;
        setData(Array.isArray(res) ? res : []);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'No se pudieron cargar las sucursales');
        setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}
