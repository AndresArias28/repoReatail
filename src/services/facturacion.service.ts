import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

export interface ClienteInput {
  nombres: string;
  identificacion: string;
  email: string;
}

export interface FacturaInput {
  numeroFactura?: string;
  fecha?: string; // ISO string
  idsucursal: number;
}

export interface DetalleInput {
  idproducto: number;
  cantidad: number;
}

export interface CreateInvoicePayload {
  cliente: ClienteInput;
  factura: FacturaInput;
  detalles: DetalleInput[];
}

export type CreateInvoiceResponse = any;

export const facturacionService = {
  async crear(payload: CreateInvoicePayload): Promise<CreateInvoiceResponse> {
    return apiService.post<CreateInvoiceResponse>(API_ENDPOINTS.INVOICES.CREATE, payload);
  },
};

