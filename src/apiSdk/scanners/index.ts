import axios from 'axios';
import queryString from 'query-string';
import { ScannerInterface, ScannerGetQueryInterface } from 'interfaces/scanner';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getScanners = async (query?: ScannerGetQueryInterface): Promise<PaginatedInterface<ScannerInterface>> => {
  const response = await axios.get('/api/scanners', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createScanner = async (scanner: ScannerInterface) => {
  const response = await axios.post('/api/scanners', scanner);
  return response.data;
};

export const updateScannerById = async (id: string, scanner: ScannerInterface) => {
  const response = await axios.put(`/api/scanners/${id}`, scanner);
  return response.data;
};

export const getScannerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/scanners/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteScannerById = async (id: string) => {
  const response = await axios.delete(`/api/scanners/${id}`);
  return response.data;
};
