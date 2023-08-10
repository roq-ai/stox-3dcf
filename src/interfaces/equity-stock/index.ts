import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface EquityStockInterface {
  id?: string;
  company_id?: string;
  data: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface EquityStockGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_id?: string;
  data?: string;
}
