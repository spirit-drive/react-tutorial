import { FormProps } from 'src/components/Forms/types';

export type ChangePasswordFormValues = {
  password: string;
  newPassword: string;
  repeatPassword: string;
};

export type ChangePasswordFormErrors = Record<keyof ChangePasswordFormValues, string>;
export type ChangePasswordFormTouched = Record<keyof ChangePasswordFormValues, boolean>;

export type ChangePasswordFormProps = FormProps<ChangePasswordFormValues>;
