import { FormProps } from 'src/features/forms/types';

export type RepeatPasswordFormValues = {
  password: string;
  repeatPassword: string;
};

export type RepeatPasswordFormErrors = Record<keyof RepeatPasswordFormValues, string>;
export type RepeatPasswordFormTouched = Record<keyof RepeatPasswordFormValues, boolean>;

export type RepeatPasswordFormProps = FormProps<RepeatPasswordFormValues>;
