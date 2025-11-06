import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

export function useBranchScope() {
  const { user } = useAuth();

  const branchId = useMemo(() => {
    if (!user) return undefined;
    const uid = (user as any)?.idSucursal ?? (user as any)?.idsucursal ?? (user as any)?.sucursal?.id;
    return typeof uid === 'number' ? uid : undefined;
  }, [user]);

  const isAdmin = useMemo(() => {
    const role = (user as any)?.rol ?? (user as any)?.role;
    return String(role || '').toLowerCase() === 'administrador';
  }, [user]);

  return { branchId, isAdmin } as const;
}
