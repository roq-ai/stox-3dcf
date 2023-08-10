import * as yup from 'yup';

export const alertValidationSchema = yup.object().shape({
  settings: yup.string().required(),
  scanner_id: yup.string().nullable(),
});
