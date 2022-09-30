import { useState } from 'react';
import { FormResubmitError } from '../utils/FormResubmitError';
import { useHandler } from './useHandler';

export const useSubmit = () => {
  const { handler } = useHandler();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit =
    <T>(callback: () => Promise<T>) =>
    async () => {
      if (isSubmiting) {
        throw new FormResubmitError('Form resubmit');
      }

      setIsSubmiting(true);

      try {
        const fn = handler(() => callback());

        const values = await fn();

        return values;
      } finally {
        setIsSubmiting(false);
      }
    };

  return { isSubmiting, submit };
};
