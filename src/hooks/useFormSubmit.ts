import _ from 'lodash';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSubmit } from './useSubmit';
import { createValidate, ValidatedFields } from '../functions/createValidate';

export interface UseFormSubmitProps<T> {
  fields: T;
  setFields: (fields: T) => void;
}

export const useFormSubmit = <T>(fields: T, setFields: (fields: T) => void) => {
  const { isSubmiting, submit: createSubmit } = useSubmit();
  const [errors, setErrors] = useState<ValidatedFields<T> | null>(null);

  const submit = <Result>(
    schema: Yup.AnyObjectSchema,
    callback: (fields: T) => Promise<Result>,
  ) =>
    createSubmit(async () => {
      setErrors(null);

      const validate = createValidate(schema);

      const validation = await validate(fields);

      if (validation.errors) {
        setErrors(validation.errors);
        return;
      }

      const result = await callback(validation.fields);

      return result;
    });

  return {
    isSubmiting,
    submit,
    fields,
    setFields,
    errors,
    setErrors,
  };
};
