import _ from 'lodash';
import * as Yup from 'yup';
import dot from 'dot-object';

export type ValidatedFields<T> = {
  [K in keyof T]?: {
    message: string;
  };
};

export interface ValidateResult<T> {
  fields: T;
  errors: ValidatedFields<T> | null;
}

export const createValidate =
  (schema: Yup.AnyObjectSchema) =>
  async <T>(fields: T): Promise<ValidateResult<T>> => {
    try {
      const validFields = await schema.validate(fields, { abortEarly: false });

      return {
        fields: validFields,
        errors: null,
      };
    } catch (err: any) {
      let validationErrors = {};

      for (const error of err.inner) {
        if (error.path) {
          validationErrors = _.merge(
            validationErrors,
            dot.object({
              [error.path]: error,
            }),
          );
        }
      }

      return {
        fields,
        errors: validationErrors,
      };
    }
  };
