import axios from 'axios';
import queryString from 'query-string';
import { EquityStockInterface, EquityStockGetQueryInterface } from 'interfaces/equity-stock';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getEquityStocks = async (
  query?: EquityStockGetQueryInterface,
): Promise<PaginatedInterface<EquityStockInterface>> => {
  const response = await axios.get('/api/equity-stocks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createEquityStock = async (equityStock: EquityStockInterface) => {
  const response = await axios.post('/api/equity-stocks', equityStock);
  return response.data;
};

export const updateEquityStockById = async (id: string, equityStock: EquityStockInterface) => {
  const response = await axios.put(`/api/equity-stocks/${id}`, equityStock);
  return response.data;
};

export const getEquityStockById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/equity-stocks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEquityStockById = async (id: string) => {
  const response = await axios.delete(`/api/equity-stocks/${id}`);
  return response.data;
};
