// ============================================
// HOOK PARA ANALYTICS
// ============================================

import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analytics.service';
import type {
  KPIData,
  VentasPorCategoria,
  VentasPorTalla,
  VentasPorMes,
  VentasDiarias,
  ProductoMasVendido,
  Recomendacion,
  FiltrosAnalytics,
} from '../types/database.types';

export function useKPIs(filtros?: FiltrosAnalytics) {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(false); // No loading porque no hace petición
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ruta no implementada en el backend, devolver null para usar mock
    setData(null);
    setLoading(false);
    setError(null);
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
}

export function useSalesByCategory(filtros?: FiltrosAnalytics) {
  const [data, setData] = useState<VentasPorCategoria[]>([]);
  const [loading, setLoading] = useState(false); // No loading porque no hace petición
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ruta no implementada en el backend, devolver array vacío para usar mock
    setData([]);
    setLoading(false);
    setError(null);
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
}

export function useSalesBySize(filtros?: FiltrosAnalytics) {
  const [data, setData] = useState<VentasPorTalla[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await analyticsService.getSalesBySize(filtros);
        setData(response.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar ventas por talla');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
}

export function useSalesByMonth(filtros?: FiltrosAnalytics) {
  const [data, setData] = useState<VentasPorMes[]>([]);
  const [loading, setLoading] = useState(false); // No loading porque no hace petición
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ruta no implementada en el backend, devolver array vacío para usar mock
    setData([]);
    setLoading(false);
    setError(null);
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
}

export function useDailySales(filtros?: FiltrosAnalytics) {
  const [data, setData] = useState<VentasDiarias[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await analyticsService.getDailySales(filtros);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar ventas diarias');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
}

export function useTopProducts(limit: number = 5, filtros?: FiltrosAnalytics) {
  const [data, setData] = useState<ProductoMasVendido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await analyticsService.getTopProducts(filtros);
        setData(response.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar productos más vendidos');
        setData([]); // Mantener array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, JSON.stringify(filtros)]);

  return { data, loading, error };
}

export function useRecommendations(filtros?: FiltrosAnalytics) {
  const [data, setData] = useState<Recomendacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await analyticsService.getRecommendations(filtros);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar recomendaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
}
