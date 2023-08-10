import * as yup from 'yup';

export const equityStockValidationSchema = yup.object().shape({
  data: yup.string().required(),
  company_id: yup.string().nullable(),
});
