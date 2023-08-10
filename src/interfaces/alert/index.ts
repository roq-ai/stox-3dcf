import { ScannerInterface } from 'interfaces/scanner';
import { GetQueryInterface } from 'interfaces';

export interface AlertInterface {
  id?: string;
  scanner_id?: string;
  settings: string;
  created_at?: any;
  updated_at?: any;

  scanner?: ScannerInterface;
  _count?: {};
}

export interface AlertGetQueryInterface extends GetQueryInterface {
  id?: string;
  scanner_id?: string;
  settings?: string;
}
