interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Trader'],
  customerRoles: [],
  tenantRoles: ['Trader'],
  tenantName: 'Company',
  applicationName: 'stox',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
