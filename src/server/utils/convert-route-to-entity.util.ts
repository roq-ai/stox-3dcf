const mapping: Record<string, string> = {
  alerts: 'alert',
  companies: 'company',
  dashboards: 'dashboard',
  'equity-stocks': 'equity_stock',
  scanners: 'scanner',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
