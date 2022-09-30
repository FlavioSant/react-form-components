import _ from 'lodash';
import { useState } from 'react';
import { useFormSubmit } from './useFormSubmit';

export const useForm = <T>(initialFields: T) => {
  const [fields, setFields] = useState<T>(initialFields);

  const { errors, setErrors, isSubmiting, submit } = useFormSubmit(
    fields,
    setFields,
  );

  const resetForm = () => {
    setFields(initialFields);
    setErrors({});
  };

  return {
    fields,
    setFields,
    errors,
    isSubmiting,
    submit,
    resetForm,
  };
};
