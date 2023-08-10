import { AlertInterface } from 'interfaces/alert';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ScannerInterface {
  id?: string;
  company_id?: string;
  settings: string;
  created_at?: any;
  updated_at?: any;
  alert?: AlertInterface[];
  company?: CompanyInterface;
  _count?: {
    alert?: number;
  };
}

export interface ScannerGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_id?: string;
  settings?: string;
}
