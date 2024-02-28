import { FormProps } from 'src/features/forms/types';

export type EmailFormValues = {
  email: string;
};

export type EmailFormErrors = Record<keyof EmailFormValues, string>;
export type EmailFormTouched = Record<keyof EmailFormValues, boolean>;

export type EmailFormProps = FormProps<EmailFormValues>;
