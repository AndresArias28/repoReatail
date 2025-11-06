// ============================================
// REALTIME MOCK SERVICE (polling -> custom events)
// ============================================

import { inventoryService } from './inventory.service';

export type LowStockEvent = {
  type: 'low_stock';
  idInventario?: number;
  idProducto: number;
  idSucursal?: number;
  producto?: string;
  sucursal?: string;
  stock: number;
  threshold: number;
};

class RealtimeService {
  private timer: number | null = null;
  private lastEmitted: Set<string> = new Set();

  startLowStockWatcher(intervalMs = 20000, threshold = 5, idSucursal?: number) {
    this.stop();
    const tick = async () => {
      try {
        // Usar inventario completo y calcular low stock localmente (evita 404 de rutas no implementadas)
        const resp = await inventoryService.getInventory({ idSucursal });
        const items = Array.isArray(resp?.data) ? resp.data : [];
        for (const it of items) {
          const stock = (it as any)?.stock ?? (it as any)?.cantidad ?? 0;
          const idProducto = (it as any)?.idproducto ?? (it as any)?.idProducto ?? (it as any)?.id;
          if (typeof idProducto !== 'number') continue;
          if (stock <= threshold) {
            const key = `${idProducto}-${(it as any)?.idsucursal ?? (it as any)?.idSucursal ?? ''}`;
            if (this.lastEmitted.has(key)) continue;
            this.lastEmitted.add(key);
            const payload: LowStockEvent = {
              type: 'low_stock',
              idInventario: (it as any)?.idinventario ?? (it as any)?.idInventario,
              idProducto,
              idSucursal: (it as any)?.idsucursal ?? (it as any)?.idSucursal,
              producto: (it as any)?.producto?.nombre ?? (it as any)?.nombre ?? undefined,
              sucursal: (it as any)?.sucursal?.nombre ?? undefined,
              stock: Number(stock) || 0,
              threshold,
            };
            window.dispatchEvent(new CustomEvent('inventory.low_stock', { detail: payload }));
          }
        }
      } catch {
        // silencio: polling best-effort
      }
    };
    // Primer tick inmediato para feedback rápido
    tick();
    // @ts-ignore setInterval returns number in browsers
    this.timer = window.setInterval(tick, intervalMs);
  }

  stop() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.lastEmitted.clear();
  }
}

export const realtimeService = new RealtimeService();
