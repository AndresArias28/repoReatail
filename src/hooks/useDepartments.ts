// ============================================
// HOOK PARA DEPARTAMENTOS
// ============================================

import { useState, useEffect } from 'react';
import { departmentsService, type Departamento } from '../services/departments.service';

export function useDepartments() {
  const [data, setData] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        console.log('🔍 Cargando departamentos...');
        const response = await departmentsService.getDepartments();
        console.log('✅ Departamentos recibidos:', response);
        console.log('📊 Data type:', typeof response.data);
        console.log('📊 Data isArray:', Array.isArray(response.data));
        console.log('📊 Data length:', response.data?.length);
        console.log('📊 Data content:', response.data);
        
        const departamentos = response.data || [];
        console.log('🎯 Departamentos a setear:', departamentos);
        setData(departamentos);
        setError(null);
      } catch (err) {
        console.error('❌ Error al cargar departamentos:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar departamentos');
        setData([]);
      } finally {
        setLoading(false);
        console.log('✅ Loading finalizado');
      }
    };

    fetchDepartments();
  }, []);

  return { data, loading, error };
}
