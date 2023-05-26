import { FormProps } from 'src/components/Forms/types';

export type AuthFormValues = {
  email: string;
  password: string;
};

export type AuthFormErrors = Record<keyof AuthFormValues, string>;
export type AuthFormTouched = Record<keyof AuthFormValues, boolean>;

export type AuthFormProps = FormProps<AuthFormValues>;
