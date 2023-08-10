import * as yup from 'yup';

export const dashboardValidationSchema = yup.object().shape({
  settings: yup.string().required(),
  company_id: yup.string().nullable(),
});
