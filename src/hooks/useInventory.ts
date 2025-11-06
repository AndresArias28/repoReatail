// ============================================
// HOOK PARA INVENTARIO
// ============================================

import { useState, useEffect } from 'react';
import { inventoryService } from '../services/inventory.service';
import type { Inventario, InventarioConAlerta } from '../types/database.types';

export function useInventory(params?: {
  page?: number;
  per_page?: number;
  idSucursal?: number;
  search?: string;
}) {
  const [data, setData] = useState<Inventario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await inventoryService.getInventory(params);
        setData(response.data);
        setMeta(response.meta);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar inventario');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error, meta };
}

export function useLowStockProducts(idSucursal?: number) {
  const [data, setData] = useState<InventarioConAlerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await inventoryService.getLowStockProducts(idSucursal);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar productos con stock bajo');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idSucursal]);

  return { data, loading, error };
}
