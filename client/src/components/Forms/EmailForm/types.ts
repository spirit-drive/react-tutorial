import { FormProps } from 'src/components/Forms/types';

export type EmailFormValues = {
  email: string;
};

export type EmailFormErrors = Record<keyof EmailFormValues, string>;
export type EmailFormTouched = Record<keyof EmailFormValues, boolean>;

export type EmailFormProps = FormProps<EmailFormValues>;
