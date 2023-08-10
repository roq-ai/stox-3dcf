import { DashboardInterface } from 'interfaces/dashboard';
import { EquityStockInterface } from 'interfaces/equity-stock';
import { ScannerInterface } from 'interfaces/scanner';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  dashboard?: DashboardInterface[];
  equity_stock?: EquityStockInterface[];
  scanner?: ScannerInterface[];
  user?: UserInterface;
  _count?: {
    dashboard?: number;
    equity_stock?: number;
    scanner?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
