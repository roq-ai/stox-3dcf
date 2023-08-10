import axios from 'axios';
import queryString from 'query-string';
import { AlertInterface, AlertGetQueryInterface } from 'interfaces/alert';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAlerts = async (query?: AlertGetQueryInterface): Promise<PaginatedInterface<AlertInterface>> => {
  const response = await axios.get('/api/alerts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAlert = async (alert: AlertInterface) => {
  const response = await axios.post('/api/alerts', alert);
  return response.data;
};

export const updateAlertById = async (id: string, alert: AlertInterface) => {
  const response = await axios.put(`/api/alerts/${id}`, alert);
  return response.data;
};

export const getAlertById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/alerts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAlertById = async (id: string) => {
  const response = await axios.delete(`/api/alerts/${id}`);
  return response.data;
};
